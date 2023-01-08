import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleValue = event => {
    this.setState({titleInput: event.target.value})
  }

  addBtnClicked = () => {
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      titleInput,
      dateInput: formattedDate,
      isStarred: false,
    }

    this.setState(previousValue => ({
      appointmentList: [...previousValue.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  filterStarredSchedules = () => {
    this.setState(previousValue => ({
      isFilterActive: !previousValue.isFilterActive,
    }))
  }

  isStarClicked = clickedId => {
    this.setState(previousValue => ({
      appointmentList: previousValue.appointmentList.map(
        eachAppointmentItem => {
          if (eachAppointmentItem.id === clickedId) {
            return {
              ...eachAppointmentItem,
              isStarred: !eachAppointmentItem.isStarred,
            }
          }
          return eachAppointmentItem
        },
      ),
    }))
  }

  getScheduledAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointmentItem => eachAppointmentItem.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const scheduledAppointmentList = this.getScheduledAppointmentList()
    const starBtnBackground = isFilterActive
      ? 'active-background'
      : 'inactive-background'

    return (
      <div className="bg-container">
        <div className="appointment-card">
          <div className="top-container">
            <div className="add-appointment-conainer">
              <h1 className="appointment-heading">Add Appointment</h1>
              <form className="form-control">
                <label htmlFor="inputText" className="title-label">
                  TITLE
                </label>
                <input
                  id="inputText"
                  type="text"
                  className="title-input"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onChangeTitleValue}
                />
                <label htmlFor="calenderInput" className="date-label">
                  DATE
                </label>
                <input
                  id="calenderInput"
                  type="date"
                  className="date-input"
                  placeholder="dd/mm/yyyy"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />
              </form>
              <button
                type="button"
                className="add-btn"
                onClick={this.addBtnClicked}
              >
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="hr-line" />
          <div className="bottom-container">
            <div className="about-container">
              <h1 className="appointment-counter-heading">Appointments</h1>
              <button
                type="button"
                className={`starred-btn ${starBtnBackground}`}
                onClick={this.filterStarredSchedules}
              >
                Starred
              </button>
            </div>
            <ul className="schedule-unordered-list">
              {scheduledAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  eachAppointmentItem={eachAppointment}
                  isStarClicked={this.isStarClicked}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
