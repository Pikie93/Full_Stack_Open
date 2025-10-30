const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author');
  const authors = _.map(counts, (count, author) => ({
    author,
    blogs: Number(count),
  }));
  return _.maxBy(authors, 'blogs');
};

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author');
  const authors = _.map(grouped, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes'),
  }));
  return _.maxBy(authors, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes,
};
