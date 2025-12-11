import { useState } from 'react'



const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({ ...newBlog })

    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog(prev => ({
      ...prev,
      [name]: value
    }))}


  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <label style={{ display: "block", margin: "5px"}}>
          title:
          <input
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </label>

        <label style={{ display: "block", margin: "5px"}}>
          author:
          <input
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </label>

        <label style={{ display: "block", margin: "5px"}}>
          url:
          <input
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </label>

        <button style={{ marginBottom: "5px" }} type="submit">Save New Blog</button>
      </form>
    </div>

  )}

export default BlogForm