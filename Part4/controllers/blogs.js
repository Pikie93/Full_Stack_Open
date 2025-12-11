const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = new Blog({ ...request.body, user: user.id });

  let savedBlog = await blog.save();

  savedBlog = await savedBlog.populate('user', { username: 1, name: 1 });

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: 'unauthorized user, only the creator can delete blogs' });
  }

  await Blog.findByIdAndDelete(request.params.id);
  user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString());
  await user.save();
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  // eslint-disable-next-line no-unused-vars
  const { _id, id, user: userField, ...updatedableFields } = request.body;

  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedableFields,
    {
      new: true,
      runValidators: true,
    }
  ).populate('user', { username: 1, name: 1 });
  if (updated) response.json(updated);
  else response.status(404).end();
});

module.exports = blogsRouter;
