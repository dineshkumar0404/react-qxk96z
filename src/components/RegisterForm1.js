import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegisterForm.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: props.data ? props.data : {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validationSchema() {
    return Yup.object().shape({
      // id: Yup.number()
      //     .required('Employee ID is required'),
      employeename: Yup.string()
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
        .required('EmployeeName is required')
        .min(4, 'Minimum 4 Character required'),

      employeesalary: Yup.number().required('EmployeeSalary is required'),

      employeeage: Yup.number()
        .min(18, 'You must be at least 18 years')
        .max(60, 'You must be at most 60 years')
        .required('EmployeeAge is required'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      designation: Yup.string()
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
        .required('EmployeeDesignation is required'),

      // file: Yup.mixed()
      //   .required('File required')
    });
  }
  handleChange(e) {
    if (!this.props.data) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;

      if (!this.props.data) {
        fields['id'] = `SPC000${this.props.totalUsers + 1}`;
      }
      this.setState({ fields });
    }

    if (this.props.data) {
      this.setState({ upname: e.target.value });
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

  handleSubmit(fields) {
    // console.log(this.state.fields);
    // fields["id"] = `SPC000${this.props.totalUsers + 1}`
    const save = {
      ...this.state.fields,
      id: fields.id,
      employeename: fields.employeename,
      employeesalary: fields.employeesalary,
      employeeage: fields.employeeage,
      email: fields.email,
      designation: fields.designation,
    };
    console.log(save);

    if (this.props.data) {
      this.props.updateForm(save);
    } else {
      save['id'] = `SPC000${this.props.totalUsers + 1}`;
      this.props.saveEmpDetail(save);
    }
  }

  cancelForm(e) {
    this.props.cancelForm(e);
  }

  render() {
    const initialValues = {
      id: this.props.data ? this.props.data.id : '',

      employeename: this.props.data ? this.props.data.employeename : '',

      employeesalary: this.props.data ? this.props.data.employeesalary : '',

      employeeage: this.props.data ? this.props.data.employeeage : '',

      email: this.props.data ? this.props.data.email : '',

      designation: this.props.data ? this.props.data.designation : '',

      file: this.props.data ? this.props.data.file : '',
    };

    return (
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema}
          onSubmit={this.handleSubmit}
        >
          <Form>
            <div className="container-1" id="form">
              {!this.props.data && (
                <h3 style={{ textAlign: 'center' }}>Registration page</h3>
              )}
              {this.props.data && (
                <h3 style={{ textAlign: 'center' }}>Update page</h3>
              )}

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
                    <Field
                      type="text"
                      name="id"
                      autoComplete="off"
                      disable="true"
                      value={`SPC000${this.props.totalUsers + 1}`}
                    />
                  )}

                  {this.props.data && (
                    <Field
                      type="text"
                      name="id"
                      autoComplete="off"
                      disable="true"
                      value={this.props.data.id}
                      // onChange={this.handleChange}
                    />
                  )}

                  <ErrorMessage
                    name="id"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div
                  className="col-md-4"
                  style={{
                    padding: '0px ',
                    border: '1px rgb(15, 15, 15) solid',
                    marginLeft: '20px',
                  }}
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
                  <Field
                    type="text"
                    name="employeename"
                    minLength="4"
                    maxLength="24"
                    autoComplete="off"
                  />
                )}

                {this.props.data && (
                  <Field
                    type="text"
                    name="employeename"
                    minLength="4"
                    maxLength="24"
                    autoComplete="off"
                    value={
                      this.props.data ? this.state.fields.employeename : ''
                    }
                    onChange={this.handleChange}
                  />
                )}

                <ErrorMessage
                  name="employeename"
                  component="div"
                  className="text-danger"
                />
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
                  <Field
                    type="number"
                    name="employeesalary"
                    style={{ marginTop: '10px' }}
                    autoComplete="off"
                  />
                )}

                {this.props.data && (
                  <Field
                    type="number"
                    name="employeesalary"
                    style={{ marginTop: '10px' }}
                    autoComplete="off"
                    value={
                      this.props.data ? this.state.fields.employeesalary : ''
                    }
                    onChange={this.handleChange}
                  />
                )}

                <ErrorMessage
                  name="employeesalary"
                  component="div"
                  className="text-danger"
                />
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
                  <Field type="number" name="employeeage" autoComplete="off" />
                )}

                {this.props.data && (
                  <Field
                    type="number"
                    name="employeeage"
                    autoComplete="off"
                    value={this.props.data ? this.state.fields.employeeage : ''}
                    onChange={this.handleChange}
                  />
                )}

                <ErrorMessage
                  name="employeeage"
                  component="div"
                  className="text-danger"
                />
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
                  <Field type="text" name="email" autoComplete="off" />
                )}
                {this.props.data && (
                  <Field
                    type="text"
                    name="email"
                    autoComplete="off"
                    value={this.props.data ? this.state.fields.email : ''}
                    onChange={this.handleChange}
                  />
                )}

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-md-1 mt-1">
                <label style={{ marginLeft: '10px', marginTop: '12px' }}>
                  ProfileImage
                </label>
              </div>
              <div className="col-md-3 mt-1">
                {!this.props.data && (
                  <Field
                    type="file"
                    name="file"
                    onChange={(e) => this.handleFileRead(e)}
                  />
                )}

                {this.props.data && (
                  <Field
                    type="file"
                    name="file"
                    onChange={(e) => this.handleFileRead(e)}
                    value=""
                  />
                )}

                <ErrorMessage
                  name="file"
                  component="div"
                  className="text-danger"
                />
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
                  <Field type="text" name="designation" autoComplete="off" />
                )}

                {this.props.data && (
                  <Field
                    type="text"
                    name="designation"
                    autoComplete="off"
                    value={this.props.data ? this.state.fields.designation : ''}
                    onChange={this.handleChange}
                  />
                )}

                <ErrorMessage
                  name="designation"
                  component="div"
                  className="text-danger"
                />
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
          </Form>
        </Formik>
      </div>
    );
  }
}

export default Register;
