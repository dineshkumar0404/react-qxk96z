import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegisterForm.css';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: this.props.data ? this.props.data : {},
    };
  }

  handleFileRead = async (event) => {
    const filee = event.target.files[0];
    const file = await this.convertBase64(filee);
    console.log(file);
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

  cancelForm(e) {
    this.props.cancelForm(e);
  }

  render() {
    return (
      <Formik
        initialValues={{
          id: '',

          employeename: '',

          employeesalary: '',

          employeeage: '',

          email: '',

          designation: '',

          file: '',
        }}
        validationSchema={Yup.object().shape({
          // id: Yup.number()
          //     .required('Employee ID is required'),
          employeename: Yup.string()
            .matches(
              /^[aA-zZ\s]+$/,
              'Only alphabets are allowed for this field '
            )
            .required('EmployeeName is required')
            .min(4, 'Minimum 4 Character required'),

          employeesalary: Yup.number().required('EmployeeSalary is required'),
          // .matches(/^[0-9\s]+$/, "Only numbers are allowed for this field "),

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

          // file: Yup.mixed()
          //   .required('File required')
        })}
        onSubmit={(fields) => {
          // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))

          fields['id'] = `SPC000${this.props.totalUsers + 1}`;
          this.props.saveEmpDetail(fields);

          console.log(fields.name);
        }}
        render={({ errors, status, touched }) => (
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
                  <Field
                    type="text"
                    name="id"
                    autoComplete="off"
                    disable={true}
                    className={
                      'form-control' +
                      (errors.id && touched.id ? ' is-invalid' : '')
                    }
                    value={`SPC000${this.props.totalUsers + 1}`}
                  />
                  <ErrorMessage
                    name="id"
                    component="div"
                    className="invalid-feedback"
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
                    <img
                      src={this.state.fields.file}
                      alt=""
                      style={{
                        height: '300px',
                        width: '360px',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${''})`,
                      }}
                    />
                    {/* {!this.props.data && <img src={this.state.fields.file} alt="" style={{ height: "300px", width: "370px" }} />} */}
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
                <Field
                  type="text"
                  name="employeename"
                  minLength="4"
                  maxLength="24"
                  autoComplete="off"
                  className={
                    'form-control' +
                    (errors.employeename && touched.employeename
                      ? ' is-invalid'
                      : '')
                  }
                  // value={this.state.fields.employeename}
                />
                <ErrorMessage
                  name="employeename"
                  component="div"
                  className="invalid-feedback"
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
                  name="employeesalary"
                  style={{ marginTop: '10px' }}
                  autoComplete="off"
                  className={
                    'form-control' +
                    (errors.employeesalary && touched.employeesalary
                      ? ' is-invalid'
                      : '')
                  }
                  // value={this.state.fields.employeesalary}
                />
                <ErrorMessage
                  name="employeesalary"
                  component="div"
                  className="invalid-feedback"
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
                  name="employeeage"
                  autoComplete="off"
                  className={
                    'form-control' +
                    (errors.employeeage && touched.employeeage
                      ? ' is-invalid'
                      : '')
                  }
                  //  value={this.state.fields.employeeage}
                />
                <ErrorMessage
                  name="employeeage"
                  component="div"
                  className="invalid-feedback"
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
                  name="email"
                  autoComplete="off"
                  className={
                    'form-control' +
                    (errors.email && touched.email ? ' is-invalid' : '')
                  }
                  //    value={this.state.fields.email}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
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
                  className={
                    'form-control' +
                    (errors.file && touched.file ? ' is-invalid' : '')
                  }
                  onChange={(e) => this.handleFileRead(e)}
                />
                <ErrorMessage
                  name="file"
                  component="div"
                  className="invalid-feedback"
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
                  name="designation"
                  autoComplete="off"
                  className={
                    'form-control' +
                    (errors.designation && touched.designation
                      ? ' is-invalid'
                      : '')
                  }
                  //   value={this.state.fields.designation}
                />
                <ErrorMessage
                  name="designation"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="col-md-4"></div>
            </div>

            <div className="row mb-3 mt-4">
              <div className="col-md-3"></div>
              <div className="col-md-3">
                <input type="submit" className="button" value="SUBMIT" />
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
      />
    );
  }
}

export default Register;
