const assert = require('node:assert');
const { test, after, describe, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);
let token = null;

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);
});

describe('blog tests', () => {
  test('correct amount of blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('id is returned as id and not _id', async () => {
    const response = await api.get('/api/blogs');

    const blog = response.body[0];
    assert.ok(blog.id, 'blog.id should be defined');
    assert.strictEqual(blog._id, undefined, 'blog._id should not be defined');
  });

  describe('post new blog', () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      };

      await api.post('/api/users').send(newUser);

      const loginRespsone = await api.post('/api/login').send(newUser);

      token = loginRespsone.body.token;
    });

    test.only('post functions and blog count is increased to 4 with correct fields', async () => {
      const newBlog = {
        title: 'Test',
        author: 'Matti Luukkainen',
        url: 'https://testing.com',
        likes: 5,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const response = await api.get('/api/blogs');

      const titles = response.body.map((r) => r.title);

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
      assert(titles.includes('Test'));
    });

    test.only('adding blog fails with 401 if token not provided', async () => {
      const newBlog = {
        title: 'No Token',
        author: 'Nobody',
        url: 'https://example.com',
      };

      await api.post('/api/blogs').send(newBlog).expect(401);
    });

    test('if likes property is missing, defaults to 0', async () => {
      const newBlog = {
        title: 'Blog with no likes field',
        author: 'TestAuthor',
        url: 'https://nolikes.com',
      };

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(response.body.likes, 0);
    });

    test('blog without title or url returns 400', async () => {
      const newBlog = {
        author: 'No Title or URL',
        likes: 5,
      };

      await api.post('/api/blogs').send(newBlog).expect(400);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];
      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      const titles = blogsAtEnd.map((b) => b.title);
      assert(!titles.includes(blogToDelete.title));
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    });
  });

  describe('updating of a blog', () => {
    test('update succeeds with new and correct info', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 10,
      };

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(response.body.likes, blogToUpdate.likes + 10);

      const blogsAtEnd = await helper.blogsInDb();
      const updated = blogsAtEnd.find((b) => b.id === blogToUpdate.id);
      assert.strictEqual(updated.likes, blogToUpdate.likes + 10);
    });
  });
});

describe('user tests', () => {
  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash('sekret', 10);
      const user = new User({ username: 'root', passwordHash });

      await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      assert(usernames.includes(newUser.username));
    });
  });

  describe('creating users', () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });
    const baseUser = {
      username: 'validUser',
      name: 'valid user',
      password: 'validPassword',
    };

    test('fails if username is missing and returns 400 status', async () => {
      const newUser = { ...baseUser };
      delete newUser.username;

      await api.post('/api/users').send(newUser).expect(400);
    });

    test('fails if password is missing and returns 400 status', async () => {
      const newUser = { ...baseUser };
      delete newUser.password;

      await api.post('/api/users').send(newUser).expect(400);
    });

    test('fails if username is too short and returns 400 status', async () => {
      const newUser = { ...baseUser };
      newUser.username = 'ab';

      await api.post('/api/users').send(newUser).expect(400);
    });

    test('fails if password is too short and returns 400 status', async () => {
      const newUser = { ...baseUser };
      newUser.password = 'ab';

      await api.post('/api/users').send(newUser).expect(400);
    });

    test('fails if username already exists and returns 400 status', async () => {
      await api.post('/api/users').send(baseUser).expect(201);
      await api.post('/api/users').send(baseUser).expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
