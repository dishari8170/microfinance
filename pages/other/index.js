import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
export default () => {


    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),

    });


    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('/api/login', values);
            console.log('Login successful:', response.data.message);
        } catch (error) {
            console.error('Login failed:', error.response.data);

        }
    };


    return <>

        <div className="container-fluid">


            <div className="row vh-100 d-flex">


                <div className="col-12 align-items-center
                 justify-content-center
                col-md-6 d-flex" style={{backgroundColor:"#A4CCFF"}}>


                    <div className="">


                        <img src="/Pratiba%20finance-08.png" height="400"
                             alt=""/>
                    </div>


                </div>
                <div className="col-12 align-items-center
             justify-content-center
            col-md-6 d-flex text-center text-white ropew2" >


                    <div className="w-100  p-5 mx-md-5" style={{fontFamily:"roboto"}}>


                        <div className="h1  mb-3 
               ">Welcome
                        </div>

                        <div className="h2 mb-5 "> PRATIBA MICROFINANCE

                        </div>


                        <Formik
                            initialValues={{username: '', password: ''}}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({isSubmitting}) => (
                                <Form className="">
                                    <div className="text-start mt-3   fw-bold ">
                                        Username
                                        <Field

                                            type="text"
                                            name="username"
                                            placeholder=""
                                            className="form-control mt-2"
                                        />
                                        <ErrorMessage name="username" component="div" className="text-center mt-2"/>

                                        <div className="text-start mt-3 fw-bold ">
                                            Password
                                            <Field
                                                Password
                                                type="password"
                                                name="password"
                                                placeholder=""
                                                className="form-control mt-2"
                                            />
                                            <ErrorMessage name="password" component="div" className="mb-4 text-center mt-2"/>
                                        </div>
                                        <div className="d-flex justify-content-between mt-3">
                                            <div className="">
                                                <Field type="checkbox" name="keepLoggedIn"/>
                                                <label>Keep me logged in</label>

                                            </div>
                                           <a className="text-white" href="/forgot-password">
                                                Forgot Password?
                                            </a>


                                        </div>
                                    </div>
                                    <button type="submit" className="w-100 btn btn-primary
                                     mt-4 form-control" style={{backgroundColor:"#003399"}}
                                          >
                                        {isSubmitting ? 'Logging in...' : 'Login'}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>


    </>


}