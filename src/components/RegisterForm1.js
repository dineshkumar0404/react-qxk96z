
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegisterForm.css';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
          empimage:"",

        }
    }




    validationSchema() {
        return Yup.object().shape({

            employeename: Yup.string()
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
                .required('EmployeeName is required')
                .min(4, "Minimum 4 Character required"),

            employeesalary: Yup.number()
                .required('EmployeeSalary is required'),

            employeeage: Yup.number()
                .min(18, "You must be at least 18 years")
                .max(60, "You must be at most 60 years")
                .required('EmployeeAge is required'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            designation: Yup.string()
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
                .required('EmployeeDesignation is required'),

            file: Yup.mixed()
                .required('File required')


        })
    }
    cancelForm(e) {
        this.props.cancelForm(e);
    }

    render() {
        console.log(this.state.empimage);
        return (
            <Formik
                initialValues={{
                id: this.props.data?this.props.data.id:`SPC000${this.props.totalUsers + 1}`,

                employeename: this.props.data?this.props.data.employeename:"",

                employeesalary: this.props.data?this.props.data.employeesalary:"",

                employeeage: this.props.data?this.props.data.employeeage:"",

                email: this.props.data?this.props.data.email:"",

                designation: this.props.data?this.props.data.designation:"",

                file: ""

                }}
                validationSchema={this.validationSchema}
                onSubmit={(fields) => {
                  
                    if(this.props.data){
                        this.props.updateForm(fields);
                        console.log(fields);
                    }
                    else{
                    
                    this.props.saveEmpDetail(fields);

                    console.log(fields);
                    }
                }
                }
            >
                {({ handleSubmit, setFieldValue, handleChange, handleBlur, values, errors }) => (
                    <Form >

                        < div className="container-1" id="form">
                            <h3 style={{ textAlign: "center" }}>Registration page</h3>
                            {/* {this.props.data && <h3 style={{ textAlign: "center" }}>Update page</h3>}  */}

                            <div className="row mt-5" style={{ height: "50px", padding: "5px", marginTop: "35px" }}>
                                <div className="col-md-2" >
                                    <label >
                                        EmployeeID
                                    </label>
                                </div>
                                <div className="col-md-1">
                                    <label>
                                        -
                                    </label>
                                </div>
                                <div className="col-md-4">


                                    <Field type="text" name="id" id="id" autoComplete="off" disable="true" onChange={handleChange}
                                        onBlur={handleBlur}
                                        // value={`SPC000${this.props.totalUsers + 1}`}
                                                 
                                    />



                                    <ErrorMessage name="id" component="div" className="text-danger" />


                                </div>

                                <div className="col-md-4" style={{ padding: "0px ", border: "1px rgb(15, 15, 15) solid", marginLeft: "20px" }}>
                                    <div className="short-div" style={{ position: "relative", zIndex: "1", }}>
                                      {this.props.data && <img src={this.state.empimage} alt="" style={{ height: "300px", width: "370px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundImage: `url(${this.props.data.file})` }} />}
                                      {!this.props.data && <img src={this.state.empimage}  alt="" style={{ height: "300px", width: "370px" }} />  }

                                    </div>
                                </div>
                            </div>
                        </div>






                        <div className="row"
                            style={{ padding: "0px 0px 0px 0px", height: "50px", marginTop: "35px" }}>
                            <div className="col-md-2">
                                <label>
                                    EmployeeName
                                </label>
                            </div>
                            <div className="col-md-1">
                                <label>
                                    -
                                </label>
                            </div>
                            <div className="col-md-4">

                                <Field type="text" name="employeename" id="employeename" autoComplete="off" 
                                onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.employeename} />

                               

                                <ErrorMessage name="employeename" component="div" className="text-danger" />
                            </div>
                            <div className="col-md-4">
                            </div>
                        </div>



                        <div className="row"
                            style={{ padding: "0px 0px 0px 0px", height: "50px", marginTop: "35px" }}>
                            <div className="col-md-2">
                                <label>
                                    EmployeeSalary
                                </label>
                            </div>
                            <div className="col-md-1">
                                <label>
                                    -
                                </label>
                            </div>
                            <div className="col-md-4">


                                <Field type="number" onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.employeesalary} 
                                    name="employeesalary" id="employeesalary" style={{ marginTop: '10px' }} autoComplete="off" />

                               


                                <ErrorMessage name="employeesalary" component="div" className="text-danger" />

                            </div>

                            <div className="col-md-4">
                            </div>
                        </div>




                        <div className="row"
                            style={{ padding: "0px 0px 0px 0px", height: "50px", marginTop: "35px" }}>
                            <div className="col-md-2">
                                <label>
                                    EmployeeAge
                                </label>
                            </div>
                            <div className="col-md-1">
                                <label>
                                    -
                                </label>
                            </div>
                            <div className="col-md-4">


                                <Field type="number" onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.employeeage} 
                                    name="employeeage" id="employeeage" autoComplete="off" />

                              

                                <ErrorMessage name="employeeage" component="div" className="text-danger" />

                            </div>

                            <div className="col-md-4">
                            </div>
                        </div>





                        <div className="row"
                            style={{ padding: "0px 0px 0px 0px", height: "50px", marginTop: "35px" }}>
                            <div className="col-md-2">
                                <label>
                                    Email ID
                                </label>
                            </div>
                            <div className="col-md-1">
                                <label>
                                    -
                                </label>
                            </div>
                            <div className="col-md-4">


                                <Field type="text" onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                     name="email" id="email" autoComplete="off" />
                              
                                <ErrorMessage name="email" component="div" className="text-danger" />


                            </div>







                            <div className="col-md-1 mt-1" >
                                <label style={{ marginLeft: "10px", marginTop: "12px" }}>
                                    ProfileImage
                                </label>
                            </div>
                            <div className="col-md-3 mt-1">

                                <input type="file" name="file"
                                    onChange={(event) => {
                                        let reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFieldValue("file", reader.result);
                                            this.setState({empimage:reader.result})
                                            
                                        };
                                        reader.readAsDataURL(event.target.files[0]);
                                    }
                                    }
                                
                                />

                               


                                <ErrorMessage name="file" component="div" className="text-danger" />



                            </div>
                        </div>



                        <div className="row"
                            style={{ padding: "0px 0px 0px 0px", height: "50px", marginTop: "35px" }}>
                            <div className="col-md-2">
                                <label>
                                    Designation
                                </label>
                            </div>
                            <div className="col-md-1">
                                <label>
                                    -
                                </label>
                            </div>
                            <div className="col-md-4">

                                <Field type="text" onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.designation}
                                     name="designation" id="designation" autoComplete="off" />

                               

                                <ErrorMessage name="designation" component="div" className="text-danger" />
                            </div>
                            <div className="col-md-4">

                            </div>
                        </div>




                        <div className="row mb-3 mt-4" >
                            <div className="col-md-3" >
                            </div>
                            <div className="col-md-3"  >

                                <input type="submit" className="button" value={this.props.data?'UPDATE':'SUBMIT'} />
                            </div>

                            <div className="col-md-3" >
                                <input type="button" className="button" value="CLOSE" onClick={(e) => this.cancelForm(e)} />

                            </div>
                            <div className="col-md-3" >
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        )
    }


}

export default Register;
