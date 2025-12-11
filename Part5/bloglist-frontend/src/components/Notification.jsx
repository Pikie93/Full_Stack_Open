const Notification = ({ message, type }) => {
  if (!message) return null

  const style = {
    color: type === 'error' ? 'red' : 'green',
    background: type === 'error' ? '#fdd' : '#dfd',
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }

  return <div className={type === 'error' ? 'error' : 'success'} style={style}>{message}</div>
}

export default Notification