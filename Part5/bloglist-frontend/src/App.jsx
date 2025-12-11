import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch {
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleAddLike = async blog => {
    try {
      const updatedBlog = await blogService.addLike(blog.id, { likes: blog.likes + 1 })
      setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog: b))
    } catch (error) {
      console.error('Failed to add like:', error)

      setNotification({ message: 'Failed to add like', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleDelete = async blog => {
    const ok = window.confirm(`Delete blog "${blog.title}"?`)
    if (!ok) return

    try {
      await blogService.remove(blog.id)

      setBlogs(blogs.filter(b => b.id !== blog.id))

      setNotification({ message: `Deleted "${blog.title}"`, type: 'success' })
      setTimeout(() => setNotification(null), 5000)

    } catch (error) {
      console.error('Failed to delete:', error)

      setNotification({ message: 'Failed to delete, only the creator may delete a blog', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addBlog = async blogObject => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification({ message:`${returnedBlog.title} added`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch {
      setNotification({ message: 'Failed to add blog', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification?.message} type={notification?.type}/>

      {!user && loginForm()}
      {user && (
        <div>

          <p>{user.name} logged in<button onClick={handleLogout}>Logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>

          {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} user={user} blog={blog} handleLike={handleAddLike} handleDelete={handleDelete}/>
          )}
        </div>
      )}
    </div>)
}

export default App