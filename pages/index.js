import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import axios from "axios";


export default () => {
    const [loginError, setLoginError] = useState('');
    const router = useRouter();
    const [getOtp, setOtp] = useState(121);

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

            if (data.role) {

                // localStorage.setItem('userRole', data.role);

                Swal.fire({
                    title: 'Success!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Okay'
                }).then(() => {

                    if (data.role==="Agent"){
                        router.push(`/agent`);
                    }
                    if (data.role==="Employee"){
                        router.push(`/employee`);
                    }   if (data.role==="Admin"){
                        router.push(`/master`);
                    }

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
            await Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    };

    const handleForgotPassword = () => {

        const phone=document.getElementById("otpx");
        const phonex=document.getElementById("phone");

        if (phone.disabled){
            Swal.fire({icon:"warning",title:"please wait",text:"Otp Already sent please Wait to resend.."});
            return;
        }
        phone.disabled=true;

        const otptime = (intx)=> setTimeout(() => {

            console.log("dfghj" + intx);

            if (intx >1) {

                phone.innerText = "Resend OTP in "+(intx-1)+"s";
                otptime(intx-1)
            }else {
                phone.disabled=false;
                phone.innerText="Send OTP"

            }


        }, 1000);



        // otptime(10)

        axios.get('/api/send_otp?phone='+phonex.value).then(O=>{

            Swal.fire({icon:"success",text:"Otp Sent Successfully! ",title:"Sent"});

        });





            // if (getOtp<1){
            //
            //     setOtp(121);
            //     clearInterval(otptime);
            //
            //
            //
            //
            //
            // }else {
            //
            //     setOtp((getOtp-1));
            // }

        // },1000)

        // axios.get("/api/getotp?phone=" + phone)

        //
        //
        // Swal.fire({
        //     title: 'Forgot Password',
        //     text: 'Enter your email address to receive a reset link:',
        //     input: 'email',
        //     inputPlaceholder: 'Your email address',
        //     showCancelButton: true,
        //     confirmButtonText: 'Send',
        //     cancelButtonText: 'Cancel',
        //     icon:'info',
        //     preConfirm: (email) => {
        //
        //         if (!email) {
        //             Swal.showValidationMessage('Please enter a valid email address');
        //         }
        //
        //         return new Promise((resolve) => {
        //             setTimeout(() => {
        //                 resolve();
        //             }, 1000);
        //         });
        //     }
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         Swal.fire({
        //             title: 'Success!',
        //             text: 'A password reset link has been sent to your email.',
        //             icon: 'success'
        //         });
        //     }
        // });


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
                                        Phone Number
                                        <Field
                                            type="text"
                                            name="username"
                                            id="phone"
                                            placeholder=""
                                            className="form-control mt-2"
                                        />
                                        <ErrorMessage name="username" component="div" className="text-danger mt-2"/>
                                    </div>
                                    <div className="text-start mt-3 fw-bold">
                                        OTP
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
                                            <Field type="checkbox" name="keepLoggedIn" />
                                            <label>Keep me logged in</label>
                                        </div>
                                         <a className="btn btn-sm btn-primary" href="#" id={"otpx"}
                                                             onClick={handleForgotPassword}>


                                            Send OTP

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
