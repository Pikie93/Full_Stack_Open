const assert = require('node:assert');
const { test, after, describe, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);
});

describe('blog returns', () => {
  test('correct amount of blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  test('id is returned as id and not _id', async () => {
    const response = await api.get('/api/blogs');

    const blog = response.body[0];
    assert.ok(blog.id, 'blog.id should be defined');
    assert.strictEqual(blog._id, undefined, 'blog._id should not be defined');
  });

  describe('post new blog', () => {
    test('post functions and blog count is increased to 4 with correct fields', async () => {
      const newBlog = {
        title: 'Test',
        author: 'TestAuthor',
        url: 'https://testing.com',
        likes: 5,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const response = await api.get('/api/blogs');

      const titles = response.body.map((r) => r.title);

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
      assert(titles.includes('Test'));
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

  describe('deletion of a note', () => {
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

  describe('updating of a note', () => {
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
