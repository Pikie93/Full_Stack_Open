const Blog = require('../models/blog');

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
