const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a42333aa71b54a676234d17f8',
      title: 'Go nananana Harmful',
      author: 'Edsger Wwadawdaw. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teachadadadaing/reader/Dijkstra68.pdf',
      likes: 6,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 11);
  });
});

describe('author with most blogs', () => {
  const blogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a42333aa71b54a676234d17f8',
      title: 'Go nananana Harmful',
      author: 'Edsger Wwadawdaw. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teachadadadaing/reader/Dijkstra68.pdf',
      likes: 6,
      __v: 0,
    },
    {
      _id: '5a422aaaa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful1',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa123171b54a676234d17f8',
      title: 'Go To Statement Considered Harmful2',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aadwa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aadwa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger123',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aadwa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger123',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aadwa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger123',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aadwa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger123',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ];
  test('which author has the most blogs, if more than one are equal, only one is selected', () => {
    const result = listHelper.mostBlogs(blogList);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 4,
    });
  });
});

describe('author with most likes', () => {
  const blogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 6,
      __v: 0,
    },
    {
      _id: '5a42333aa71b54a676234d17f8',
      title: 'Go nananana Harmful',
      author: 'Edsger Wwadawdaw. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teachadadadaing/reader/Dijkstra68.pdf',
      likes: 6,
      __v: 0,
    },
    {
      _id: '5a422aaaa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful1',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa123171b54a676234d17f8',
      title: 'Go To Statement Considered Harmful2',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aadwa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aadwa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger123',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aadwa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger123',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aadwa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger123',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aadwa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger123',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ];
  test('which author has the most likes, if more than one are equal, only one is selected', () => {
    const result = listHelper.mostLikes(blogList);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 21,
    });
  });
});
