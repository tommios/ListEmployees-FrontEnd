import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeMiddlename = this.onChangeMiddlename.bind(this);
    this.onChangeFamilyname = this.onChangeFamilyname.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeContactinfo = this.onChangeContactinfo.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);

    this.getEmployee = this.getEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = {
      currentEmployee: {
        id: null,
        firstname: "",
        middlename: "",
        familyname: "",
        gender: "",
        contactinfo: "",
        birthday: "",
        salary: 0,
        position: "",
      },
      message: "",
      currentUser: AuthService.getCurrentUser(),
    };
  }

  componentDidMount() {
    this.getEmployee(this.props.match.params.id);
  }

  onChangeFirstname(e) {
    const firstname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          firstname: firstname,
        },
      };
    });
  }

  onChangeMiddlename(e) {
    const middlename = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        middlename: middlename,
      },
    }));
  }

  onChangeFamilyname(e) {
    const familyname = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        familyname: familyname,
      },
    }));
  }

  onChangeGender(e) {
    const gender = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        gender: gender,
      },
    }));
  }

  onChangeContactinfo(e) {
    const contactinfo = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        contactinfo: contactinfo,
      },
    }));
  }

  onChangeBirthday(e) {
    const birthday = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        birthday: birthday,
      },
    }));
  }

  onChangeSalary(e) {
    const salary = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        salary: salary,
      },
    }));
  }

  onChangePosition(e) {
    const position = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        position: position,
      },
    }));
  }

  getEmployee(id) {
    UserService.get(id)
      .then((response) => {
        this.setState({
          currentEmployee: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateEmployee() {
    UserService.update(
      this.state.currentEmployee.id,
      this.state.currentEmployee
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The employee was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteEmployee() {
    UserService.delete(this.state.currentEmployee.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/employees");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentEmployee } = this.state;

    return (
      <div>
        {currentEmployee ? (
          <div className="edit-form">
            <h4>Employee</h4>

            <form action="/employees" method="get">
              <div className="form-group">
                <label htmlFor="firstname">Firstname</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={currentEmployee.firstname}
                  onChange={this.onChangeFirstname}
                />
              </div>

              <div className="form-group">
                <label htmlFor="middlename">Middlename</label>
                <input
                  type="text"
                  className="form-control"
                  id="middlename"
                  value={currentEmployee.middlename}
                  onChange={this.onChangeMiddlename}
                />
              </div>

              <div className="form-group">
                <label htmlFor="familyname">Familyname</label>
                <input
                  type="text"
                  className="form-control"
                  id="familyname"
                  value={currentEmployee.familyname}
                  onChange={this.onChangeFamilyname}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  value={currentEmployee.gender}
                  onChange={this.onChangeGender}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactinfo">Contact Info</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactinfo"
                  value={currentEmployee.contactinfo}
                  onChange={this.onChangeContactinfo}
                />
              </div>

              <div className="form-group">
                <label htmlFor="birthday">Birthday</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  value={currentEmployee.birthday}
                  onChange={this.onChangeBirthday}
                />
              </div>

              <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input
                  type="text"
                  className="form-control"
                  id="salary"
                  value={currentEmployee.salary}
                  onChange={this.onChangeSalary}
                />
              </div>

              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  value={currentEmployee.position}
                  onChange={this.onChangePosition}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteEmployee}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateEmployee}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Employee...</p>
          </div>
        )}
      </div>
    );
  }
}
