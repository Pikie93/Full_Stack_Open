import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => setDetailsVisible(!detailsVisible)

  const isCreator = blog.user?.username === user?.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    marginLeft: 10
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <div>{blog.title} {blog.author}</div>
        <button onClick={toggleDetails} style={buttonStyle}>
          {detailsVisible ? 'hide' : 'view'}
        </button>

        {isCreator && (
        <button onClick={() => handleDelete(blog)} style={buttonStyle}>Delete</button>
      )}
        </div>
      
      {detailsVisible && (
        <div>
          <div>{blog.url}</div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <div data-testid="likes-count">likes {blog.likes}</div> 
            <button style={buttonStyle} onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user?.name || 'unknown user'}</div>
        </div>
      )}
    </div>
  )
}

export default Blog