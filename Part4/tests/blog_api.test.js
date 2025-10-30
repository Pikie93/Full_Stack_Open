const assert = require('node:assert');
const { test, after, describe, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  },
  {
    title: 'Go nananana Harmful',
    author: 'Edsger Wwadawdaw. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teachadadadaing/reader/Dijkstra68.pdf',
    likes: 6,
  },
  {
    title: 'Go To Statement Considered Harmful1',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Rijkstra68.pdf',
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(initialBlogs);
});

describe('api tests', () => {
  test('correct amount of blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, initialBlogs.length);
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

  test('post functions and blog count is increased to 4', async () => {
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

    assert.strictEqual(response.body.length, initialBlogs.length + 1);
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

  test.only('blog without title or url returns 400', async () => {
    const newBlog = {
      author: 'No Title or URL',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});
