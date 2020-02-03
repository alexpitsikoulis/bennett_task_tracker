import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as dateFns from "date-fns";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    tasks: [],
    errors: {}
  };

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    axios
      .get(`/api/users/${this.props.auth.user.id}/tasks`)
      .then(res => {
        this.setState({
          tasks: res.data.filter(task => task.status !== "Finished")
        });
      })
      .catch(err => {
        this.setState({ errors: err.data });
      });
  };

  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end">
          <div className="icon" onClick={this.nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "iiii";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(currentMonth);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const tasksForDay = this.state.tasks
          .filter(task => {
            console.log(task.dueDate + "\n" + day);
            return (
              new Date(task.dueDate).getMonth() == new Date(day).getMonth() &&
              new Date(task.dueDate).getDate() == new Date(day).getDate() &&
              new Date(task.dueDate).getFullYear() ==
                new Date(day).getFullYear()
            );
          })
          .map(task => (
            <li className="calendar-task">
              <Link to={`/${this.props.auth.user.id}/tasks/${task._id}`}>
                {task.title}
              </Link>
            </li>
          ));
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              this.onDateClick(cloneDay);
            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            {tasksForDay}
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({ selectedDate: day });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    const tasksForDay = this.state.tasks
      .filter(task => {
        const day = this.state.selectedDate;
        return (
          new Date(task.dueDate).getMonth() == new Date(day).getMonth() &&
          new Date(task.dueDate).getDate() == new Date(day).getDate() &&
          new Date(task.dueDate).getFullYear() == new Date(day).getFullYear()
        );
      })
      .map(task => (
        <li>
          <Link to={`/${this.props.auth.user.id}/tasks/${task._id}`}>
            {task.title}
          </Link>
        </li>
      ));
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        {tasksForDay.length ? (
          <div>
            <h2>
              Tasks Due For{" "}
              {`${this.state.selectedDate.getMonth() +
                1}/${this.state.selectedDate.getDate()}/${this.state.selectedDate.getFullYear()}`}
            </h2>
            {tasksForDay}
          </div>
        ) : (
          <div>
            <h2>
              No Tasks Due For{" "}
              {`${this.state.selectedDate.getMonth() +
                1}/${this.state.selectedDate.getDate()}/${this.state.selectedDate.getFullYear()}`}
            </h2>
          </div>
        )}
      </div>
    );
  }
}

Calendar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Calendar);
