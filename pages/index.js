import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default () => {
    const [loginError, setLoginError] = useState('');
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values) => {
        const { username, password } = values;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem('userRole', data.role);

                Swal.fire({
                    title: 'Success!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Okay'
                }).then(() => {
                    router.push(`/dashboard?role=${data.role}`);
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    };







    const handleForgotPassword = () => {
        Swal.fire({
            title: 'Forgot Password',
            text: 'Enter your email address to receive a reset link:',
            input: 'email',
            inputPlaceholder: 'Your email address',
            showCancelButton: true,
            confirmButtonText: 'Send',
            cancelButtonText: 'Cancel',
            icon:'info',
            preConfirm: (email) => {

                if (!email) {
                    Swal.showValidationMessage('Please enter a valid email address');
                }

                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Success!',
                    text: 'A password reset link has been sent to your email.',
                    icon: 'success'
                });
            }
        });
    };

    return (
        <div className="container-fluid">
            <div className="row vh-100 d-flex">
                <div className="col-12 align-items-center justify-content-center col-md-6 d-flex" style={{ backgroundColor: '#A4CCFF' }}>
                    <div>
                        <img src="/logoog.png" height="400" alt="Logo" />
                    </div>
                </div>
                <div className="col-12 align-items-center justify-content-center col-md-6 d-flex text-center text-white ropew2">
                    <div className="w-100 p-5 mx-md-5" style={{fontFamily: 'roboto'}}>
                        <div className="h1 mb-3">Welcome</div>
                        <div className="h2 mb-5">PRATIBA MICROFINANCE</div>


                        <Formik
                            initialValues={{username: '', password: ''}}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <div className="text-start mt-3 fw-bold">
                                        Username
                                        <Field
                                            type="text"
                                            name="username"
                                            placeholder=""
                                            className="form-control mt-2"
                                        />
                                        <ErrorMessage name="username" component="div" className="text-danger mt-2"/>
                                    </div>
                                    <div className="text-start mt-3 fw-bold">
                                        Password
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder=""
                                            className="form-control mt-2"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger mt-2"/>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <div>
                                            <Field type="checkbox" name="keepLoggedIn"/>
                                            <label>Keep me logged in</label>
                                        </div>
                                        <a className="text-white" href="#" onClick={handleForgotPassword}>
                                            Forgot Password?
                                        </a>
                                    </div>
                                    <button type="submit" className="w-100 btn btn-primary mt-4"
                                            style={{backgroundColor: '#003399'}}>
                                        Login
                                    </button>
                                    {loginError && <div className="text-danger mt-2">{loginError}</div>}
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};
