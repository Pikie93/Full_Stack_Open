import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../src/components/BlogForm'

describe('<BlogForm />', () => {
  test('create blogform passes correct params to newBlog event handler',  async ()  => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')

    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'James')
    await user.type(urlInput, 'http://example.com')

    const submitButton = screen.getByText('Save New Blog')
    await user.click(submitButton)

    expect(createBlog).toHaveBeenCalledTimes(1)

    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Test Title',
      author: 'James',
      url: 'http://example.com'
    })
  })
})