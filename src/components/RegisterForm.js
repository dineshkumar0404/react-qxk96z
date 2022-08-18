import React from 'react';
import './RegisterForm.css';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: props.data || {},
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm =
      this.submituserRegistrationForm.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      // let fields = {};
      // this.setState({ fields: fields });

      if (this.props.data) {
        this.props.updateForm(this.state.fields);
        this.fields['id'] = `SPC000${this.props.totalUsers + 1}`;
      } else {
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
        errors['employeeage'] = '*Please enter EmployeeAge between 18 to 60.';
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
    this.props.cancelForm();
  }

  render() {
    return (
      <div className="container">
        <h3 style={{ textAlign: 'center' }}>Registration page</h3>

        <form
          method="post"
          name="userRegistrationForm"
          onSubmit={(e) => this.submituserRegistrationForm(e)}
        >
          <div className="row mt-1">
            <div className="col-md-6">
              <label>EmployeeID</label>
              <input
                type="text"
                name="id"
                autoComplete="off"
                disabled={this.props.data ? true : false}
                style={{ marginTop: '10px' }}
                defaultValue={
                  this.props.data
                    ? this.props.data.id
                    : `SPC000${this.props.totalUsers + 1}`
                }
                onChange={this.handleChange}
              />

              <div className="errorMsg">{this.state.errors.id}</div>
            </div>
            {/* <div className="col-md-6"  >
            </div> */}

            <div
              className="col-md-6"
              style={{ padding: '0px', border: '1px rgb(15, 15, 15) solid' }}
            >
              <div
                className="short-div"
                style={{
                  backgroundColor: 'white',
                  position: 'relative',
                  height: '500px',
                  zIndex: '1',
                }}
              >
                <img
                  src=""
                  className="card-img-top"
                  alt="logo"
                  style={{ height: '200px' }}
                />
              </div>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-md-6">
              <label>EmployeeName:</label>
              <input
                type="text"
                name="employeename"
                minLength="4"
                maxLength="24"
                autoComplete="off"
                style={{ marginTop: '10px' }}
                defaultValue={
                  this.props.data
                    ? this.props.data.employeename
                    : this.state.fields.employeename
                }
                onChange={this.handleChange}
              />
              {/* <small>Note:Please enter the alphabet only</small> */}
              <div className="errorMsg">{this.state.errors.employeename}</div>
            </div>
            <div className="col-md-6"></div>
          </div>

          <div className="row mt-1">
            <div className="col-md-6">
              <label>EmployeeSalary:</label>
              <input
                type="number"
                name="employeesalary"
                style={{ marginTop: '10px' }}
                autoComplete="off"
                defaultValue={
                  this.props.data
                    ? this.props.data.employeesalary
                    : this.state.fields.employeesalary
                }
                onChange={this.handleChange}
              />
              <div className="errorMsg">{this.state.errors.employeesalary}</div>
            </div>
            <div className="col-md-6"></div>
          </div>

          <div className="row mt-1">
            <div className="col-md-6">
              <label>EmployeeAge:</label>
              <input
                type="number"
                name="employeeage"
                style={{ marginTop: '10px' }}
                autoComplete="off"
                defaultValue={
                  this.props.data
                    ? this.props.data.employeeage
                    : this.state.fields.employeeage
                }
                onChange={this.handleChange}
              />
              <div className="errorMsg">{this.state.errors.employeeage}</div>
            </div>
            <div className="col-md-6"></div>
          </div>

          <div className="row mt-1">
            <div className="col-md-6">
              <label>Email ID:</label>
              <input
                type="text"
                name="email"
                style={{ marginTop: '10px' }}
                autoComplete="off"
                defaultValue={
                  this.props.data
                    ? this.props.data.email
                    : this.state.fields.email
                }
                onChange={this.handleChange}
              />
              <div className="errorMsg">{this.state.errors.email}</div>
            </div>
            <div className="col-md-6"></div>
          </div>

          <div className="row mt-1">
            <div className="col-md-6">
              <label>Designation:</label>
              <input
                type="text"
                name="designation"
                style={{ marginTop: '10px' }}
                minLength="2"
                maxLength="24"
                autoComplete="off"
                defaultValue={
                  this.props.data
                    ? this.props.data.designation
                    : this.state.fields.designation
                }
                onChange={this.handleChange}
              />
              <div className="errorMsg">{this.state.errors.designation}</div>
            </div>

            <div className="col-md-6">
              <label>ProfileImage:</label>
              {/* <img src={this.props.data.file} alt="logo" style={{width:"50px",heigth:"50px"}}></img> */}
              <input
                type="file"
                name="file"
                style={{ marginTop: '10px' }}
                defaultValue={this.props.data ? '' : this.state.fields.file}
                onChange={(e) => this.handleFileRead(e)}
              />
              <div className="errorMsg">{this.state.errors.file}</div>
            </div>
          </div>

          <div className="row mb-3 mt-3">
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <input
                type="submit"
                className="button"
                value={this.props.data ? 'Update' : 'Submit'}
              />
            </div>

            <div className="col-md-3">
              <input
                type="button"
                className="button"
                value="Close"
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
