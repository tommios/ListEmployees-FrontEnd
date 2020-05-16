import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFirstname = this.onChangeSearchFirstname.bind(this);
    this.retrieveEmployees = this.retrieveEmployees.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);
    this.removeAllEmployees = this.removeAllEmployees.bind(this);
    this.searchFirstname = this.searchFirstname.bind(this);

    this.state = {
      employees: [],
      currentEmployee: null,
      currentIndex: -1,
      searchFirstname: "",
    };
  }

  componentDidMount() {
    this.retrieveEmployees();
  }

  onChangeSearchFirstname(e) {
    const searchFirstname = e.target.value;
    console.log(searchFirstname);

    this.setState({
      searchFirstname: searchFirstname,
    });
  }

  retrieveEmployees() {
    EmployeeDataService.getAll()
      .then((response) => {
        this.setState({
          employees: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEmployees();
    this.setState({
      currentEmployee: null,
      currentIndex: -1,
    });
  }

  setActiveEmployee(employee, index) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index,
    });
  }

  removeAllEmployees() {
    EmployeeDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchFirstname() {
    EmployeeDataService.findByFirstName(this.state.searchFirstname)
      .then((response) => {
        this.setState({
          employees: response.data,
        });
        console.log(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      searchFirstname,
      employees,
      currentEmployee,
      currentIndex,
    } = this.state;

    return (
      <div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Firstname"
              value={searchFirstname}
              onChange={this.onChangeSearchFirstname}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFirstname}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Firstname</th>
                <th scope="col">Middlename</th>
                <th scope="col">Familyname</th>
                <th scope="col">Gender</th>
                <th scope="col">Contact Info</th>
                <th scope="col">Birthday</th>
                <th scope="col">Salary</th>
                <th scope="col">Position</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees &&
                employees.map((employee, index) => (
                  <tr
                    className={index === currentIndex ? "table-primary" : ""}
                    onClick={() => this.setActiveEmployee(employee, index)}
                    key={index}
                  >
                    <th scope="row">{index + 1}</th>
                    <td>{employee.firstname}</td>
                    <td>{employee.middlename}</td>
                    <td>{employee.familyname}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.contactinfo}</td>
                    <td>{dateFormat(employee.birthday, "dd.mm.yyyy")}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.position}</td>
                    <td>
                      {currentEmployee && index === currentIndex ? (
                        <Link
                          to={"/employees/" + currentEmployee.id}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </Link>
                      ) : (
                        <div></div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEmployees}
          >
            Remove All
          </button>
        </div>
      </div>
    );
  }
}
