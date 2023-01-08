import './index.css'

const AppointmentItem = props => {
  const {eachAppointmentItem, isStarClicked} = props
  const {id, titleInput, dateInput, isStarred} = eachAppointmentItem

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starButtonClicked = () => {
    isStarClicked(id)
  }

  return (
    <li className="schedule-item">
      <div className="schedule-name-container">
        <h1 className="title">{titleInput}</h1>
        <p className="date-item">{dateInput}</p>
      </div>
      <button type="button" className="star-button" onClick={starButtonClicked}>
        <img src={starImageUrl} alt="star" className="star-image" />
      </button>
    </li>
  )
}

export default AppointmentItem
