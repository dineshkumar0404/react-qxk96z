import React, { Component } from 'react';
import data from './pages/data.json';
import Addmodel from './Addmodel.js';
import { Modal, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './components/RegisterForm.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: data,
      selecteduser: null,
      detailuser: false,
      showModel: false,
      totalUsers: null,
    };
  }
  passemployee(e) {
    this.state.users.push(e);
    this.setState({ users: this.state.users });
  }

  updateForm(e) {
    this.setState({ showModel: !this.state.showModel });
    this.state.users.splice(e.index, e);
  }

  DeleteRow = (index, name) => {
    this.state.users.splice(index, 1);
    this.setState({ users: this.state.users });

    alert('Do you want to delete EmployeeName : ' + name);
  };

  Details = (users) => {
    this.setState({ detailuser: true });
    this.setState({ selecteduser: users });
  };

  Update = (users) => {
    this.setState({ showModel: true });
    this.setState({ selecteduser: users });
  };

  render() {
    let DisplayData = this.state.users.map((users, index) => {
      return (
        <tr key={index} style={{ textAlign: 'center' }}>
          <td>{users.id}</td>
          <td>{users.employeename}</td>
          <td>{users.employeesalary}</td>
          <td>{users.employeeage}</td>
          <td>{users.email}</td>
          <td>{users.designation}</td>
          {/* <td><img src={users.file} style={{ height: "50px" }} alt="logo" /></td> */}

          <td>
            <button
              className="btn btn-danger m-1"
              onClick={() => {
                this.DeleteRow(index, users.employeename);
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-info m-1"
              onClick={() => this.Update(users, index)}
            >
              Update
            </button>

            <button
              className="btn btn-info m-1"
              onClick={() => this.Details(users)}
            >
              Details
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Addmodel
          passemployee={(e) => this.passemployee(e)}
          totalUsers={this.state.users.length}
        />

        <table className="table table-striped ">
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th>EmployeeId</th>
              <th>EmployeeName</th>
              <th>EmployeeSalary</th>
              <th>EmployeeAge</th>
              <th>Email ID</th>
              <th>Designation</th>
              {/* <th>ProfileImage</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>

        <Modal isOpen={this.state.showModel}>
          <ModalBody>
            <RegisterForm
              data={this.state.selecteduser}
              updateForm={(e) => this.updateForm(e)}
              cancelForm={(e) =>
                this.setState({ showModel: !this.state.showModel })
              }
            />
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.detailuser}>
          <h3 style={{ marginTop: '25px' }}>Employee Details</h3>
          <ModalBody>
            <div className="container">
              <div className="text-center">
                <div
                  className="row mt-1"
                  style={{
                    padding: '0px 0px 0px 0px',
                    height: '150px',
                    marginTop: '35px',
                  }}
                >
                  <div className="col-md-4"></div>
                  <div
                    className="col-md-4"
                    style={{
                      border: 'solid 2px',
                      borderRadius: '100px',
                      width: '150px',
                    }}
                  >
                    <img
                      src={
                        this.state.selecteduser
                          ? this.state.selecteduser.file
                          : ''
                      }
                      alt="logo"
                      style={{ height: '120px', zIndex: '1' }}
                    ></img>
                  </div>
                  <div className="col-md-4"></div>
                </div>

                <div
                  className="row mt-1"
                  style={{
                    padding: '0px 0px 0px 0px',
                    height: '50px',
                    marginTop: '35px',
                  }}
                >
                  <div className="col-md-4">
                    <label>EmployeeID</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {this.state.selecteduser ? this.state.selecteduser.id : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{
                    padding: '0px 0px 0px 0px',
                    height: '50px',
                    marginTop: '35px',
                  }}
                >
                  <div className="col-md-4">
                    <label>EmployeeName</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {this.state.selecteduser
                      ? this.state.selecteduser.employeename
                      : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{
                    padding: '0px 0px 0px 0px',
                    height: '50px',
                    marginTop: '35px',
                  }}
                >
                  <div className="col-md-4">
                    <label>EmployeeSalary</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {this.state.selecteduser
                      ? this.state.selecteduser.employeesalary
                      : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{
                    padding: '0px 0px 0px 0px',
                    height: '50px',
                    marginTop: '35px',
                  }}
                >
                  <div className="col-md-4">
                    <label>EmployeeAge</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {this.state.selecteduser
                      ? this.state.selecteduser.employeeage
                      : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{
                    padding: '0px 0px 0px 0px',
                    height: '50px',
                    marginTop: '35px',
                  }}
                >
                  <div className="col-md-4">
                    <label>Email</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {this.state.selecteduser
                      ? this.state.selecteduser.email
                      : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{
                    padding: '0px 0px 0px 0px',
                    height: '50px',
                    marginTop: '35px',
                  }}
                >
                  <div className="col-md-4">
                    <label>Designation</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {this.state.selecteduser
                      ? this.state.selecteduser.designation
                      : ''}
                  </div>
                </div>

                <div class="row">
                  <div class="col text-center">
                    <button
                      type="button"
                      className="btn btn-danger text-center m-1"
                      onClick={() =>
                        this.setState({ detailuser: !this.state.detailuser })
                      }
                    >
                      CLOSE
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary text-center m-1"
                      onClick={() => this.updateForm(this.data)}
                    >
                      EDIT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default App;
