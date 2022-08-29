import React, { Component } from 'react'
import Addmodel from './Addmodel.js';
import { Modal, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm1 from './components/RegisterForm1';
import { deleteEmployee,addEmployee,fetchEmployee,updateEmployee } from './utils/api/employee';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      selecteduser: null,
      detailuser: false,
      showModel: false,
      totalUsers: null,
      indexid: null

    }


  }

  passemployee = async (e) => {
   const empass= await addEmployee(e);
  //  console.log(empass)
    this.state.users.push(empass);
    this.setState({ users: this.state.users });
    console.log("add")
    
  }

  updateForm = async (e) => {
     const empupd=await updateEmployee(e);

    //  console.log(empupd)
    this.setState({ showModel: !this.state.showModel });
    this.state.users.splice(this.state.indexid, 1, empupd);
    console.log("Updated");
    
  }

  DeleteRow = async (index, name) => {
    if (window.confirm('Do you want to delete EmployeeName : ' + name)) {
      const empdel =this.state.users[index]
      // console.log(empdel)
      await deleteEmployee(empdel.id);
      this.state.users.splice(index, 1);
      this.setState({ users: this.state.users });
      console.log("Delete");

    }

  }


  Details = (index, users) => {
    this.setState({ detailuser: true });
    this.setState({ selecteduser: users, indexid: index });

  };

  Update = (index, users) => {
    this.setState({ indexid: index, showModel: true });
    this.setState({ selecteduser: users });
  };


  componentDidMount = async () => {
    const empdata = await fetchEmployee();
    console.log("fetch")
    this.setState({ users: empdata })

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
              onClick={() => { this.DeleteRow(index, users.employeename); }}>
              Delete
            </button>
            <button className="btn btn-info m-1" onClick={() => this.Update(index, users)}>
              Update
            </button>

            <button className="btn btn-info m-1" onClick={() => this.Details(index, users)}>
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
            
            <RegisterForm1
              data={this.state.selecteduser}
              updateForm={(e) => this.updateForm(e)}
              cancelForm={(e) => this.setState({ showModel: !this.state.showModel })} />
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.detailuser}>
          <h3 style={{ marginTop: '25px' }}>Employee Details</h3>
          <ModalBody>
            <div className="container">
              <div className="text-center">
                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '150px', marginTop: '35px', }}>
                  <div className="col-md-4"></div>
                  <div
                    className="col-md-4"
                    style={{ border: 'solid 2px', borderRadius: '100px', width: '150px', overflow: "hidden" }}>
                    <img src={this.state.selecteduser ? this.state.selecteduser.file : ''} alt="logo" style={{ height: '120px', zIndex: '1' }}></img>
                  </div>
                  <div className="col-md-4"></div>
                </div>

                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }} >
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
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }}
                >
                  <div className="col-md-4">
                    <label>EmployeeName</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {this.state.selecteduser ? this.state.selecteduser.employeename : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }}>
                  <div className="col-md-4">
                    <label>EmployeeSalary</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {this.state.selecteduser ? this.state.selecteduser.employeesalary : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }}>
                  <div className="col-md-4">
                    <label>EmployeeAge</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {this.state.selecteduser ? this.state.selecteduser.employeeage : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }}
                >
                  <div className="col-md-4">
                    <label>Email</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {this.state.selecteduser ? this.state.selecteduser.email : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }} >
                  <div className="col-md-4">
                    <label>Designation</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {this.state.selecteduser ? this.state.selecteduser.designation : ''}
                  </div>
                </div>

                <div className="row">
                  <div className="col text-center">
                    <button
                      type="button"
                      className="btn btn-danger text-center m-1"
                      onClick={() => this.setState({ detailuser: !this.state.detailuser })} >
                      CLOSE
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary text-center m-1" onClick={() => {
                        this.setState({ detailuser: !this.state.detailuser })
                        this.updateForm(this.state.indexid, 1, this.state.users)


                      }} >
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
