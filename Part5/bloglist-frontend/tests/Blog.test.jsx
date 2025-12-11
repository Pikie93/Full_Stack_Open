import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing is fun xD',
    author: 'Tester',
    url: 'http://example.com',
    likes: 5,
    user: { user: 'tester' }
  }

  test('renders only title and author by default', () => {
    render(
      <Blog
        blog={blog}
        handleLike={() => {}}
        handleDelete={() => {}}
      />
    )

    expect(screen.getByText('Testing is fun xD Tester')).toBeInTheDocument()

    expect(screen.queryByText('http://example.com')).toBeNull()
    expect(screen.queryByText('likes')).toBeNull()
  })

  test('clicking "view" button shows URL and likes of blog', async () => {

    render(
      <Blog
        blog={blog}
        handleLike={() => {}}
        handleDelete={() => {}}
      />
    )

    const user = userEvent.setup()

    expect(screen.getByText('Testing is fun xD Tester')).toBeInTheDocument()
    expect(screen.queryByText('http://example.com')).toBeNull()
    expect(screen.queryByText('likes 5')).toBeNull()

    await user.click(screen.getByText('view'))

    expect(screen.getByText('http://example.com')).toBeInTheDocument()
    expect(screen.getByText('likes 5')).toBeInTheDocument()
  })

  test('clicking like buttong twice calls event handler twice', async () => {

    const mockLikeHandler = vi.fn()

    render(
      <Blog
        blog={blog}
        handleLike={mockLikeHandler}
        handleDelete={() => {}}
      />
    )

    const user = userEvent.setup()
    await user.click(screen.getByText('view'))

    for (let i = 0; i < 2; i++) {
      await user.click(screen.getByText('like'))
    }

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })


})