import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default class AddEmployee extends Component {
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

    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      firstname: "",
      middlename: "",
      familyname: "",
      gender: "",
      contactinfo: "",
      birthday: new Date(),
      salary: 0,
      position: "",

      submitted: false,

      currentUser: AuthService.getCurrentUser(),
    };
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }

  onChangeMiddlename(e) {
    this.setState({
      middlename: e.target.value,
    });
  }

  onChangeFamilyname(e) {
    this.setState({
      familyname: e.target.value,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangeContactinfo(e) {
    this.setState({
      contactinfo: e.target.value,
    });
  }

  onChangeBirthday(e) {
    this.setState({
      birthday: e.target.value,
    });
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value,
    });
  }

  onChangePosition(e) {
    this.setState({
      position: e.target.value,
    });
  }

  saveEmployee() {
    var data = {
      firstname: this.state.firstname,
      middlename: this.state.middlename,
      familyname: this.state.familyname,
      gender: this.state.gender,
      contactinfo: this.state.contactinfo,
      birthday: this.state.birthday,
      salary: this.state.salary,
      position: this.state.position,
    };

    UserService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          firstname: response.data.firstname,
          middlename: response.data.middlename,
          familyname: response.data.familyname,
          gender: response.data.gender,
          contactinfo: response.data.contactinfo,
          birthday: response.data.birthday,
          salary: response.data.salary,
          position: response.data.position,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      firstname: "",
      middlename: "",
      familyname: "",
      gender: "",
      contactinfo: "",
      birthday: new Date(),
      salary: 0,
      position: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newEmployee}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                required
                value={this.state.firstname}
                onChange={this.onChangeFirstname}
                name="firstname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="middlename">Middlename</label>
              <input
                type="text"
                className="form-control"
                id="middlename"
                required
                value={this.state.middlename}
                onChange={this.onChangeMiddlename}
                name="middlename"
              />
            </div>

            <div className="form-group">
              <label htmlFor="familyname">Familyname</label>
              <input
                type="text"
                className="form-control"
                id="familyname"
                required
                value={this.state.familyname}
                onChange={this.onChangeFamilyname}
                name="familyname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                required
                value={this.state.gender}
                onChange={this.onChangeGender}
                name="gender"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactinfo">Contact Info</label>
              <input
                type="text"
                className="form-control"
                id="contactinfo"
                required
                value={this.state.contactinfo}
                onChange={this.onChangeContactinfo}
                name="contactinfo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                required
                value={this.state.birthday}
                onChange={this.onChangeBirthday}
                name="birthday"
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                className="form-control"
                id="salary"
                required
                value={this.state.salary}
                onChange={this.onChangeSalary}
                name="salary"
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                className="form-control"
                id="position"
                required
                value={this.state.position}
                onChange={this.onChangePosition}
                name="position"
              />
            </div>

            <button onClick={this.saveEmployee} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
