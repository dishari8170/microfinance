import React, {useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import axios from "axios";
import UploadX from "@/Comp/UploadX";


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    fatherName: Yup.string().required('Father name is required'),
    motherName:Yup.string().required('Mother name is required'),
    guardianName: Yup.string().required('Guardian name is required'),
    mobileNo: Yup.string()
        .required('Mobile number is required')
        .matches(/^\d{10}$/, 'Mobile number must be 10 digits'),
    dateOfBirth: Yup.date()
        .required('Date of birth is required')
        .max(new Date(), 'Date of birth cannot be in the future'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    presentAddress: Yup.object().shape({
        village: Yup.string().required('Village is required'),
        post: Yup.string().required('Post is required'),
        block: Yup.string().required('Block is required'),
        city: Yup.string().required('City is required'),
        dist: Yup.string().required('District is required'),
        state: Yup.string().required('State is required'),
        pincode: Yup.string()
            .required('Pincode is required')
            .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
    }),
    permanentAddress: Yup.boolean().oneOf([true], 'Permanent address must be the same'),
    identityProof: Yup.string().required('Identity proof is required'),
    identityProofNumber: Yup.string().required('Identity proof number is required'),
    addressProof: Yup.string().required('Address proof is required'),
    addressProofNumber: Yup.string().required('Address proof number is required'),
    identityProofImage: Yup.string()
        .required('Identity proof image is required'),

    addressProofImage: Yup.mixed()
        .required('Address proof image is required')

});

export default () => {
    const [submittedData, setSubmittedData] = useState([]);
    const [agentCode, setUserCode] = useState('User Id');

    const fetchUserCode = async () => {
        try {
            const response = await axios.get("/api/user?dia=4");




            console.log(response.data)

            setUserCode(response.data);
        } catch (error) {
            console.error('Error fetching agent code:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/user");
            setSubmittedData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (values, {resetForm}) => {

        await axios.post(`/api/user`,values).then(vl=>{

            if (vl.data.stat=="ok"){
                Swal.fire("Done", vl.data.msg, "success").then(() => {

                    resetForm();
                });
            }else {
                Swal.fire("Done", "Data submitted", "error").then(() => {

                    resetForm();
                });
            }


        })


    };



    useEffect(() => {

        fetchUserCode();

    }, []);





    return (
        <div className="container">


            <Formik

                enableReinitialize={true}
                initialValues={{
                    agent_code: agentCode,
                    name: '',
                    fatherName: '',
                    motherName:'',
                    guardianName: '',
                    mobileNo: '',
                    dateOfBirth: '',
                    email: '',
                    dp: "",
                    role:"age",
                    presentAddress: {
                        village: '',
                        post: '',
                        block: '',
                        city: '',
                        dist: '',
                        state: '',
                        pincode: '',
                    },
                    permanentAddress: {
                        village: '',
                        post: '',
                        block: '',
                        city: '',
                        dist: '',
                        state: '',
                        pincode: '',
                    },
                    identityProof: '',
                    identityProofNumber: '',
                    addressProof: '',
                    addressProofNumber: '',
                    identityProofImage: null,
                    addressProofImage: null,
                }}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({resetForm, values, setValues}) => (
                    <Form className=" ">
                        <div className="row fw-bold mt-4">

                            <div className="col-md-3 mb-2">
                                <div>Agent</div>
                                <Field className="form-control mt-2" name="agent_code"/>

                            </div>
                            <div className="col-md-3 mb-2">
                                <div>Name</div>
                                <Field className="form-control mt-2" name="name" placeholder="Enter your name"/>
                                <ErrorMessage name="name" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Father Name</div>
                                <Field className="form-control mt-2" name="fatherName"
                                       placeholder="Enter father's name"/>
                                <ErrorMessage name="fatherName" component="div" className="text-danger mt-2"/>
                            </div>
<div className="col-md-3 mb-2">
                                <div>Mother Name</div>
                                <Field className="form-control mt-2" name="motherName"
                                       placeholder="Enter mothers's name"/>
                                <ErrorMessage name="motherName" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Guardian Name</div>
                                <Field className="form-control mt-2" name="guardianName"
                                       placeholder="Enter guardian's name"/>
                                <ErrorMessage name="guardianName" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Mobile No</div>
                                <Field className="form-control mt-2" name="mobileNo" placeholder="Enter mobile number"/>
                                <ErrorMessage name="mobileNo" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Date of Birth</div>
                                <Field type="date" className="form-control mt-2" name="dateOfBirth"/>
                                <ErrorMessage name="dateOfBirth" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Email</div>
                                <Field className="form-control mt-2" name="email" placeholder="Enter email"/>
                                <ErrorMessage name="email" component="div" className="text-danger mt-2"/>
                            </div>

                            <h3 className="w-100 mt-4">Present Address</h3>

                            <div className="col-md-3 mb-2">
                                <div>Village</div>
                                <Field className="form-control mt-2" name="presentAddress.village"
                                       placeholder="Enter village"/>
                                <ErrorMessage name="presentAddress.village" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Post</div>
                                <Field className="form-control mt-2" name="presentAddress.post"
                                       placeholder="Enter post"/>
                                <ErrorMessage name="presentAddress.post" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Block</div>
                                <Field className="form-control mt-2" name="presentAddress.block"
                                       placeholder="Enter block"/>
                                <ErrorMessage name="presentAddress.block" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>City</div>
                                <Field className="form-control mt-2" name="presentAddress.city"
                                       placeholder="Enter city"/>
                                <ErrorMessage name="presentAddress.city" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>District</div>
                                <Field className="form-control mt-2" name="presentAddress.dist"
                                       placeholder="Enter district"/>
                                <ErrorMessage name="presentAddress.dist" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>State</div>
                                <Field className="form-control mt-2" name="presentAddress.state"
                                       placeholder="Enter state"/>
                                <ErrorMessage name="presentAddress.state" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Pincode</div>
                                <Field className="form-control mt-2" name="presentAddress.pincode"
                                       placeholder="Enter pincode"/>
                                <ErrorMessage name="presentAddress.pincode" component="div"
                                              className="text-danger mt-2"/>
                            </div>


                            <div className="col-12 d-inline-flex justify-content-between">
                                <h3>Permanent Address Same</h3>
                                <input type="checkbox" name="" className="form-check-input border-danger mt-2" style={{height:"30px",width:"30px",}} onChange={async u => {


                                    if (u.target.checked) {

                                        await setValues({...values, permanentAddress: values.presentAddress})

                                    } else {

                                        await setValues({
                                            ...values,
                                            dp: "dp.png",
                                            permanentAddress: {
                                                village: '',
                                                post: '',
                                                block: '',
                                                city: '',
                                                dist: '',
                                                state: '',
                                                pincode: ''
                                            }
                                        })


                                    }
                                }}/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Village</div>
                                <Field className="form-control mt-2" name="permanentAddress.village"
                                       placeholder="Enter village"/>
                                <ErrorMessage name="permanentAddress.village" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Post</div>
                                <Field className="form-control mt-2" name="permanentAddress.post"
                                       placeholder="Enter post"/>
                                <ErrorMessage name="permanentAddress.post" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Block</div>
                                <Field className="form-control mt-2" name="permanentAddress.block"
                                       placeholder="Enter block"/>
                                <ErrorMessage name="permanentAddress.block" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>City</div>
                                <Field className="form-control mt-2" name="permanentAddress.city"
                                       placeholder="Enter city"/>
                                <ErrorMessage name="permanentAddress.city" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>District</div>
                                <Field className="form-control mt-2" name="permanentAddress.dist"
                                       placeholder="Enter district"/>
                                <ErrorMessage name="permanentAddress.dist" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3  mb-2">
                                <div>State</div>
                                <Field className="form-control mt-2" name="permanentAddress.state"
                                       placeholder="Enter state"/>
                                <ErrorMessage name="permanentAddress.state" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Pincode</div>
                                <Field className="form-control mt-2" name="permanentAddress.pincode"
                                       placeholder="Enter pincode"/>
                                <ErrorMessage name="permanentAddress.pincode" component="div"
                                              className="text-danger mt-2"/>
                            </div>


                            <div className="col-md-3 mb-2">
                                <div>Identity Proof</div>
                                <Field as="select" name="identityProof" className="form-control mt-2">
                                    <option value="">Select Identity Proof</option>
                                    <option value="Aadhar Card">Aadhar Card</option>
                                    <option value="PAN">PAN</option>
                                    <option value="Voter Card">Voter Card</option>
                                </Field>
                                <ErrorMessage name="identityProof" component="div" className="text-danger mt-2"/>

                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Identity Proof Number</div>
                                <Field className="form-control mt-2" name="identityProofNumber"
                                       placeholder="Enter Identity Proof Number"/>
                                <ErrorMessage name="identityProofNumber" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div>Address Proof</div>
                                <Field as="select" name="addressProof" className="form-control mt-2">
                                    <option value="">Select Address Proof</option>
                                    <option value="Voter Card">Voter Card</option>
                                    <option value="Aadhar Card">Aadhar Card</option>
                                    <option value="Driving Licence">Driving Licence</option>

                                </Field>
                                <ErrorMessage name="addressProof" component="div" className="text-danger mt-2"/>


                            </div>
                            <div className="col-md-3 mb-2">
                                <div>Address Proof Number</div>
                                <Field className="form-control mt-2" name="addressProofNumber"
                                       placeholder="Enter Address Proof Number"/>
                                <ErrorMessage name="addressProofNumber" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6  col-lg-4">Identity Proof Font Page
                                    <UploadX cb={(im) => setValues({...values, identity_font: im})} df={values.dp}
                                             height={"200px"}
                                             className="bg-primary mt-3"/></div>
                                <div className="col-md-6 col-lg-4"> Identity Proof Back Page
                                    <UploadX cb={(im) => setValues({...values, identity_back: im})} df={values.dp}
                                             height={"200px"}
                                             className="bg-primary mt-3 "/></div>
                                <div className="col-md-6 col-lg-4">Address Proof Font
                                    <UploadX cb={(im) => setValues({...values, address_font: im})} df={values.dp}
                                             height={"200px"}
                                             className="bg-primary mt-3"/></div>
                                <div className="d-lg-block col-12   d-none" style={{minHeight: "25px"}}></div>
                                <div className="col-md-6 col-lg-4"> Address Proof Back
                                    <UploadX cb={(im) => setValues({...values, address_back: im})} df={values.dp}
                                             height={"200px"}
                                             className="bg-primary mt-3 "/></div>
                                <div className="col-md-6 col-lg-4">Profile Photo
                                    <UploadX cb={(im) => setValues({...values, photo: im})} df={values.dp}
                                             height={"200px"}
                                             className="bg-primary mt-3"/></div>
                                <div className="col-md-6 col-lg-4"> Signature
                                    <UploadX cb={(im) => setValues({...values, signature: im})} df={values.dp}
                                             height={"200px"}
                                             className="bg-primary  mt-3"/></div>

                            </div>


                            <div className="text-end mt-3">
                                <input className="btn px-5 btn-success" type="submit" value="submit"/>
                                <button className="btn px-5 ms-2 btn-warning text-white" type="button"
                                        onClick={resetForm}>Clear
                                </button>
                            </div>

                        </div>
                    </Form>

                )}

            </Formik>

            
        </div>

    )


};