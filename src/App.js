import React, { Component } from 'react';
import axios from 'axios';
import Addmodel from './Addmodel.js';
import { Modal, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './components/RegisterForm.js';
import { fetchEmployee } from './utils/api/employee.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selecteduser: null,
      detailuser: false,
      showModel: false,
      totalUsers: null,
      indexid: null,
    };
  }

  passemployee(e) {
    this.state.users.push(e.data);
    this.setState({ users: this.state.users });
    console.log(e.data);
  }

  updateForm(e) {
    this.setState({ showModel: !this.state.showModel });

    this.state.users.splice(this.state.indexid, 1, e.data);

    console.log(e.data);
  }

  DeleteRow = (index, name) => {
    if (window.confirm('Do you want to delete EmployeeName : ' + name)) {
      axios
        .delete('/data/SPC0001')
        .then((response) => {
          console.log(response);
          console.log('Delete');
          this.state.users.splice(index, 1);
          this.setState({ users: this.state.users });
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  Details = (index, users) => {
    this.setState({ detailuser: true });
    this.setState({ selecteduser: users, indexid: index });
  };

  Update = (index, users) => {
    this.setState({ indexid: index, showModel: true });
    this.setState({ selecteduser: users });
  };

  fetchEmployeeData = async () => {
    try {
      const empdata = await fetchEmployee();

      console.log(empdata);

      this.setState({ users: empdata });
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.fetchEmployeeData();

    //   axios.get('/data')
    //     .then(response => {
    //       console.log("fetch");
    //       this.setState({ users: response.data })
    //       //  console.log(response.data);

    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
  }

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
              onClick={() => this.Update(index, users)}
            >
              Update
            </button>

            <button
              className="btn btn-info m-1"
              onClick={() => this.Details(index, users)}
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

        <Modal size="xl" isOpen={this.state.showModel}>
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
                      overflow: 'hidden',
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

                <div className="row">
                  <div className="col text-center">
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
                      onClick={() => {
                        this.setState({ detailuser: !this.state.detailuser });
                        this.updateForm(this.props.selecteduser);
                      }}
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
