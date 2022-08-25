import React from 'react';
import './RegisterForm.css';
import { addEmployee, updateEmployee } from '../utils/api/employee';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: this.props.data ? this.props.data : {},
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm =
      this.submituserRegistrationForm.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;

    if (!this.props.data) {
      fields['id'] = `SPC000${this.props.totalUsers + 1}`;
    }
    this.setState({ fields });
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      if (this.props.data) {
        updateEmployee();
        this.props.updateForm(this.state.fields);
      } else {
        addEmployee();
        this.props.saveEmpDetail(this.state.fields);
      }
    }
  }

  handleFileRead = async (event) => {
    const filee = event.target.files[0];
    const file = await this.convertBase64(filee);
    // console.log(file)
    this.setState({ fields: { ...this.state.fields, file: file } });
  };

  convertBase64 = (filee) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(filee);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields['id'] === '') {
      formIsValid = false;
      errors['id'] = '*Please enter  ID.';
    }

    if (!fields['employeename']) {
      formIsValid = false;
      errors['employeename'] = '*Please enter EmployeeName.';
    }
    if (typeof fields['employeename'] !== 'undefined') {
      if (!fields['employeename'].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors['employeename'] = '*Please enter alphabet characters only.';
      }
    }

    if (!fields['employeesalary']) {
      formIsValid = false;
      errors['employeesalary'] = '*Please enter EmployeeSalary';
    }

    if (!fields['employeeage']) {
      formIsValid = false;
      errors['employeeage'] = '*Please enter EmployeeAge.';
    }
    if (typeof fields['employeeage'] !== 'undefined') {
      //regular expression for employeeage validation
      var pattern = new RegExp(/^(?:1[8-9]|[2-5][0-9]|60)$$/);
      if (fields['employeeage'] === '') {
        formIsValid = false;
        errors['employeeage'] = '*Please enter EmployeeAge .';
      } else if (!pattern.test(fields['employeeage'])) {
        formIsValid = false;
        errors['employeeage'] = '*Please enter Age between 18 to 60.';
      }
    }

    if (!fields['email']) {
      formIsValid = false;
      errors['email'] = '*Please enter Email.';
    }

    if (typeof fields['email'] !== 'undefined') {
      //regular expression for email validation
      pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (fields['email'] === '') {
        formIsValid = false;
        errors['email'] = '*Please enter your Email.';
      } else if (!pattern.test(fields['email'])) {
        formIsValid = false;
        errors['email'] = '*Please enter valid Email.';
      }
    }

    if (!fields['designation']) {
      formIsValid = false;
      errors['designation'] = '*Please enter Designation.';
    }
    if (typeof fields['designation'] !== 'undefined') {
      if (!fields['designation'].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors['designation'] = '*Please enter alphabet characters only.';
      }
    }

    if (!fields['file']) {
      formIsValid = false;
      errors['file'] = '*Please choose ProfileImage.';
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  }

  cancelForm(e) {
    this.props.cancelForm(e);
  }

  render() {
    return (
      <div className="container">
        {!this.props.data && (
          <h3 style={{ textAlign: 'center' }}>Registration page</h3>
        )}
        {this.props.data && (
          <h3 style={{ textAlign: 'center' }}>Update page</h3>
        )}
        <form
          method="post"
          name="userRegistrationForm"
          onSubmit={(e) => this.submituserRegistrationForm(e)}
        >
          <div className="container-1" id="form">
            <div
              className="row mt-5"
              style={{ height: '50px', padding: '5px', marginTop: '35px' }}
            >
              <div className="col-md-2">
                <label>EmployeeID</label>
              </div>
              <div className="col-md-1">
                <label>-</label>
              </div>
              <div className="col-md-4">
                {!this.props.data && (
                  <input
                    type="text"
                    name="id"
                    autoComplete="off"
                    disabled={true}
                    defaultValue={`SPC000${this.props.totalUsers + 1}`}
                    onChange={this.handleChange}
                  />
                )}
                {this.props.data && (
                  <input
                    type="text"
                    name="id"
                    autoComplete="off"
                    disabled={true}
                    defaultValue={this.props.data.id}
                    onChange={this.handleChange}
                  />
                )}

                <div className="errorMsg">{this.state.errors.id}</div>
              </div>

              <div
                className="col-md-4"
                style={{ padding: '0px ', border: '1px rgb(15, 15, 15) solid' }}
              >
                <div
                  className="short-div"
                  style={{ position: 'relative', zIndex: '1' }}
                >
                  {this.props.data && (
                    <img
                      src={this.state.fields.file}
                      alt=""
                      style={{
                        height: '300px',
                        width: '360px',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${this.props.data.file})`,
                      }}
                    />
                  )}
                  {!this.props.data && (
                    <img
                      src={this.state.fields.file}
                      alt=""
                      style={{ height: '300px', width: '370px' }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{
              padding: '0px 0px 0px 0px',
              height: '50px',
              marginTop: '35px',
            }}
          >
            <div className="col-md-2">
              <label>EmployeeName</label>
            </div>
            <div className="col-md-1">
              <label>-</label>
            </div>
            <div className="col-md-4">
              {!this.props.data && (
                <input
                  type="text"
                  name="employeename"
                  minLength="4"
                  maxLength="24"
                  autoComplete="off"
                  defaultValue={this.state.fields.employeename}
                  onChange={this.handleChange}
                />
              )}

              {this.props.data && (
                <input
                  type="text"
                  name="employeename"
                  autoComplete="off"
                  defaultValue={this.props.data.employeename}
                  onChange={this.handleChange}
                />
              )}

              <div className="errorMsg">{this.state.errors.employeename}</div>
            </div>

            <div className="col-md-4"></div>
          </div>

          <div
            className="row"
            style={{
              padding: '0px 0px 0px 0px',
              height: '50px',
              marginTop: '35px',
            }}
          >
            <div className="col-md-2">
              <label>EmployeeSalary</label>
            </div>
            <div className="col-md-1">
              <label>-</label>
            </div>
            <div className="col-md-4">
              {!this.props.data && (
                <input
                  type="number"
                  name="employeesalary"
                  style={{ marginTop: '10px' }}
                  autoComplete="off"
                  defaultValue={this.state.fields.employeesalary}
                  onChange={this.handleChange}
                />
              )}
              {this.props.data && (
                <input
                  type="number"
                  name="employeesalary"
                  style={{ marginTop: '10px' }}
                  autoComplete="off"
                  defaultValue={this.props.data.employeesalary}
                  onChange={this.handleChange}
                />
              )}
              <div className="errorMsg">{this.state.errors.employeesalary}</div>
            </div>

            <div className="col-md-4"></div>
          </div>

          <div
            className="row"
            style={{
              padding: '0px 0px 0px 0px',
              height: '50px',
              marginTop: '35px',
            }}
          >
            <div className="col-md-2">
              <label>EmployeeAge</label>
            </div>
            <div className="col-md-1">
              <label>-</label>
            </div>
            <div className="col-md-4">
              {!this.props.data && (
                <input
                  type="number"
                  name="employeeage"
                  autoComplete="off"
                  defaultValue={this.state.fields.employeeage}
                  onChange={this.handleChange}
                />
              )}
              {this.props.data && (
                <input
                  type="number"
                  name="employeeage"
                  autoComplete="off"
                  defaultValue={this.props.data.employeeage}
                  onChange={this.handleChange}
                />
              )}

              <div className="errorMsg">{this.state.errors.employeeage}</div>
            </div>

            <div className="col-md-4"></div>
          </div>

          <div
            className="row"
            style={{
              padding: '0px 0px 0px 0px',
              height: '50px',
              marginTop: '35px',
            }}
          >
            <div className="col-md-2">
              <label>Email ID</label>
            </div>
            <div className="col-md-1">
              <label>-</label>
            </div>
            <div className="col-md-4">
              {!this.props.data && (
                <input
                  type="text"
                  name="email"
                  autoComplete="off"
                  defaultValue={this.state.fields.email}
                  onChange={this.handleChange}
                />
              )}

              {this.props.data && (
                <input
                  type="text"
                  name="email"
                  autoComplete="off"
                  defaultValue={this.props.data.email}
                  onChange={this.handleChange}
                />
              )}
              <div className="errorMsg">{this.state.errors.email}</div>
            </div>

            <div className="col-md-1 mt-1">
              <label style={{ marginLeft: '10px', marginTop: '12px' }}>
                ProfileImage
              </label>
            </div>
            <div className="col-md-3 mt-1">
              {!this.props.data && (
                <input
                  type="file"
                  name="file"
                  defaultValue={this.state.fields.file}
                  onChange={(e) => this.handleFileRead(e)}
                />
              )}
              {this.props.data && (
                <input
                  type="file"
                  name="file"
                  defaultValue={''}
                  onChange={(e) => this.handleFileRead(e)}
                />
              )}

              <div className="errorMsg">{this.state.errors.file}</div>
            </div>
          </div>

          <div
            className="row"
            style={{
              padding: '0px 0px 0px 0px',
              height: '50px',
              marginTop: '35px',
            }}
          >
            <div className="col-md-2">
              <label>Designation</label>
            </div>
            <div className="col-md-1">
              <label>-</label>
            </div>
            <div className="col-md-4">
              {!this.props.data && (
                <input
                  type="text"
                  name="designation"
                  minLength="2"
                  maxLength="24"
                  autoComplete="off"
                  defaultValue={this.state.fields.designation}
                  onChange={this.handleChange}
                />
              )}
              {this.props.data && (
                <input
                  type="text"
                  name="designation"
                  minLength="2"
                  maxLength="24"
                  autoComplete="off"
                  defaultValue={this.props.data.designation}
                  onChange={this.handleChange}
                />
              )}
              <div className="errorMsg">{this.state.errors.designation}</div>
            </div>
            <div className="col-md-4"></div>
          </div>

          <div className="row mb-3 mt-4">
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <input
                type="submit"
                className="button"
                value={this.props.data ? 'UPDATE' : 'SUBMIT'}
              />
            </div>

            <div className="col-md-3">
              <input
                type="button"
                className="button"
                value="CLOSE"
                onClick={(e) => this.cancelForm(e)}
              />
            </div>
            <div className="col-md-3"></div>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
