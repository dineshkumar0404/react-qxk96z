import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegisterForm.css';
// import { PureComponent } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  cancelForm(e) {
    this.props.cancelForm(e);
  }

  render() {
    return (
      <Formik
        initialValues={{
          id: this.props.data
            ? this.props.data.id
            : `SPC000${this.props.totalUsers + 1}`,

          employeename: this.props.data ? this.props.data.employeename : '',

          employeesalary: this.props.data ? this.props.data.employeesalary : '',

          employeeage: this.props.data ? this.props.data.employeeage : '',

          email: this.props.data ? this.props.data.email : '',

          designation: this.props.data ? this.props.data.designation : '',

          file: this.props.data ? this.props.data.file : '',
        }}
        validationSchema={Yup.object().shape({
          employeename: Yup.string()
            .matches(
              /^[aA-zZ\s]+$/,
              'Only alphabets are allowed for this field '
            )
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
            .matches(
              /^[aA-zZ\s]+$/,
              'Only alphabets are allowed for this field '
            )
            .required('EmployeeDesignation is required'),

          file: Yup.mixed()

            .required('You need to provide a file')
            .nullable()
            .test('fileSize', 'The file size is below 1 MB', (file) => {
              if (file) {
                return (file.length / 4) * 3 <= 1000000;
              }
            })

            .test('fileType', 'Suppoted file format .png and .jpg', (file) => {
              if (file) {
                // console.log(this.props.data)

                if (this.props.data) {
                  const url = this.getBase64FromUrl(file).then((data) => {
                    let result = data;
                    // console.log(result);
                    const jpg =
                      result.substring(
                        'data:image'.length,
                        result.indexOf(';base64')
                      ) === '/jpg';
                    const png =
                      result.substring(
                        'data:image'.length,
                        result.indexOf(';base64')
                      ) === '/png';
                    return jpg || png;
                  });
                  return url;
                }

                if (!this.props.data) {
                  if (file) {
                    const jpg =
                      file.substring(
                        'data:image'.length,
                        file.indexOf(';base64')
                      ) === '/jpg';
                    const png =
                      file.substring(
                        'data:image'.length,
                        file.indexOf(';base64')
                      ) === '/png';
                    return jpg || png;
                  }
                }
              }
            }),
        })}
        onSubmit={(fields) => {
          if (this.props.data) {
            this.props.updateForm(fields);
            // console.log(fields);
          } else {
            this.props.saveEmpDetail(fields);

            // console.log(fields);
          }
        }}
      >
        {({ setFieldValue, handleChange, handleBlur, values }) => (
          <Form>
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
                <Field
                  type="text"
                  name="id"
                  id="id"
                  autoComplete="off"
                  disabled={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // value={`SPC000${this.props.totalUsers + 1}`}
                />

                <ErrorMessage
                  name="id"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div
                className="col-md-4"
                style={{ padding: '0px ', border: '1px rgb(15, 15, 15) solid' }}
              >
                <div
                  className="short-div"
                  style={{ position: 'relative', zIndex: '1' }}
                >
                  <img
                    src={values.file}
                    alt=""
                    style={{ height: '300px', width: '375px' }}
                  />
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
                <Field
                  type="text"
                  name="employeename"
                  id="employeename"
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.employeename}
                />

                <ErrorMessage
                  name="employeename"
                  component="div"
                  className="text-danger"
                  style={{ marginLeft: '20px' }}
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
                <Field
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.employeesalary}
                  name="employeesalary"
                  id="employeesalary"
                  style={{ marginTop: '10px' }}
                  autoComplete="off"
                />

                <ErrorMessage
                  name="employeesalary"
                  component="div"
                  className="text-danger"
                  style={{ marginLeft: '20px' }}
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
                <Field
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.employeeage}
                  name="employeeage"
                  id="employeeage"
                  autoComplete="off"
                />

                <ErrorMessage
                  name="employeeage"
                  component="div"
                  className="text-danger"
                  style={{ marginLeft: '20px' }}
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
                <Field
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name="email"
                  id="email"
                  autoComplete="off"
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                  style={{ marginLeft: '20px' }}
                />
              </div>

              <div className="col-md-1 mt-1">
                <label style={{ marginLeft: '10px', marginTop: '12px' }}>
                  ProfileImage
                </label>
              </div>
              <div className="col-md-3 mt-1">
                <input
                  type="file"
                  name="file"
                  onChange={(event) => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                      setFieldValue('file', reader.result);
                      console.log(reader.result);
                    };
                    reader.readAsDataURL(event.target.files[0]);
                    console.log(event.target.files[0].type);
                  }}
                />

                <ErrorMessage
                  name="file"
                  component="div"
                  className="text-danger"
                  style={{ marginLeft: '20px' }}
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
                <Field
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.designation}
                  name="designation"
                  id="designation"
                  autoComplete="off"
                />

                <ErrorMessage
                  name="designation"
                  component="div"
                  className="text-danger"
                  style={{ marginLeft: '20px' }}
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
        )}
      </Formik>
    );
  }
}

export default Register;
