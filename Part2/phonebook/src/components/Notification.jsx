const Notification = ({ message, colorChoice }) => {
  const notificationStyle = {
    color: colorChoice,
    fontStyle: "italic",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (!message) {
    return null;
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
