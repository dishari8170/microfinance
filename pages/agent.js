import React, {useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import axios from "axios";
import UploadX from "@/Comp/UploadX";


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    fatherName: Yup.string().required('Father name is required'),
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
    identityProofImage: Yup.mixed()
        .required('Identity proof image is required')
        .test('fileSize', 'File size is too large, maximum size is 2MB', value => {
            return value && value.size <= 2 * 1024 * 1024; // 2MB
        }),
    addressProofImage: Yup.mixed()
        .required('Address proof image is required')
        .test('fileSize', 'File size is too large, maximum size is 2MB', value => {
            return value && value.size <= 2 * 1024 * 1024; // 2MB
        }),
});

export default () => {
    const [submittedData, setSubmittedData] = useState([]);
    const [agentCode, setAgentCode] = useState('Agent Id');

    const fetchAgentCode = async () => {
        try {
            const response = await axios.get("/api/agent?dia=true");

            console.log(response.data)

            setAgentCode(response.data);
        } catch (error) {
            console.error('Error fetching agent code:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/pratiba");
            setSubmittedData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (values, {resetForm}) => {
        try {
            const formData = new FormData();
            formData.append('agent_code', agentCode);
            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });

            const response = await fetch('/api/pratiba', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                Swal.fire("Done", "Data submitted", "success").then(() => {
                    fetchData();
                    resetForm();
                });
            } else {
                console.error('Error submitting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };



    useEffect(() => {
        fetchAgentCode();
        fetchData();
    }, []);





    return (
        <div className="container">

            <UploadX height={"100"}/>


            <div className="bg-primary"><UploadX />
            </div>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    agent_code: agentCode,
                    name: '',
                    fatherName: '',
                    guardianName: '',
                    mobileNo: '',
                    dateOfBirth: '',
                    email: '',
                    presentAddress: {
                        village: '',
                        post: '',
                        block: '',
                        city: '',
                        dist: '',
                        state: '',
                        pincode: '',
                    },
                    permanentAddress:  {
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
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({resetForm, setFieldValue}) => (
                    <Form className="abborder shadow-sm bg-white p-3">
                        <div className="row fw-bold mt-4">

                            <div className="col-md-4 mb-2">
                                <div>Agent</div>
                                <Field className="form-control mt-2" name="agent_code"/>

                            </div>
                            <div className="col-md-4 mb-2">
                                <div>Name</div>
                                <Field className="form-control mt-2" name="name" placeholder="Enter your name"/>
                                <ErrorMessage name="name" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>Father Name</div>
                                <Field className="form-control mt-2" name="fatherName"
                                       placeholder="Enter father's name"/>
                                <ErrorMessage name="fatherName" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>Guardian Name</div>
                                <Field className="form-control mt-2" name="guardianName"
                                       placeholder="Enter guardian's name"/>
                                <ErrorMessage name="guardianName" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>Mobile No</div>
                                <Field className="form-control mt-2" name="mobileNo" placeholder="Enter mobile number"/>
                                <ErrorMessage name="mobileNo" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>Date of Birth</div>
                                <Field type="date" className="form-control mt-2" name="dateOfBirth"/>
                                <ErrorMessage name="dateOfBirth" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>Email</div>
                                <Field className="form-control mt-2" name="email" placeholder="Enter email"/>
                                <ErrorMessage name="email" component="div" className="text-danger mt-2"/>
                            </div>

                            <h3 className="w-100 mt-4">Present Address</h3>

                            <div className="col-md-4 mb-2">
                                <div>Village</div>
                                <Field className="form-control mt-2" name="presentAddress.village"
                                       placeholder="Enter village"/>
                                <ErrorMessage name="presentAddress.village" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>Post</div>
                                <Field className="form-control mt-2" name="presentAddress.post"
                                       placeholder="Enter post"/>
                                <ErrorMessage name="presentAddress.post" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>Block</div>
                                <Field className="form-control mt-2" name="presentAddress.block"
                                       placeholder="Enter block"/>
                                <ErrorMessage name="presentAddress.block" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>City</div>
                                <Field className="form-control mt-2" name="presentAddress.city"
                                       placeholder="Enter city"/>
                                <ErrorMessage name="presentAddress.city" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>District</div>
                                <Field className="form-control mt-2" name="presentAddress.dist"
                                       placeholder="Enter district"/>
                                <ErrorMessage name="presentAddress.dist" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>State</div>
                                <Field className="form-control mt-2" name="presentAddress.state"
                                       placeholder="Enter state"/>
                                <ErrorMessage name="presentAddress.state" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>Pincode</div>
                                <Field className="form-control mt-2" name="presentAddress.pincode"
                                       placeholder="Enter pincode"/>
                                <ErrorMessage name="presentAddress.pincode" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <label className="form-check-label">Permanent Address Same</label>
                                <Field type="checkbox" name="permanentAddress" className="form-check-input mt-2"/>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>Identity Proof</div>
                                <Field as="select" name="identityProof" className="form-control mt-2">
                                    <option value="">Select Identity Proof</option>
                                    <option value="Aadhar Card">Aadhar Card</option>
                                    <option value="PAN">PAN</option>
                                    <option value="Voter Card">Voter Card</option>
                                </Field>
                                <ErrorMessage name="identityProof" component="div" className="text-danger mt-2"/>

                                <div className="mt-2">
                                    <label htmlFor="identityProofUpload" className="form-label">Upload Identity Proof
                                        (Max
                                        2MB)</label>
                                    <input
                                        id="identityProofUpload"
                                        type="file"
                                        name="identityProofFile"
                                        accept="image/*"
                                        className="form-control"
                                        onChange={(event) => {

                                            const file = event.currentTarget.files[0];
                                            if (file && file.size > 2 * 1024 * 1024) {
                                                alert("File size should not exceed 2MB.");
                                                event.currentTarget.value = null; // Clear the input
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div>Identity Proof Number</div>
                                <Field className="form-control mt-2" name="identityProofNumber"
                                       placeholder="Enter Identity Proof Number"/>
                                <ErrorMessage name="identityProofNumber" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div>Address Proof</div>
                                <Field as="select" name="addressProof" className="form-control mt-2">
                                    <option value="">Select Address Proof</option>
                                    <option value="Voter Card">Voter Card</option>
                                    <option value="Aadhar Card">Aadhar Card</option>
                                    <option value="Driving Licence">Driving Licence</option>
                                </Field>
                                <ErrorMessage name="addressProof" component="div" className="text-danger mt-2"/>


                                <div className="mt-2">
                                    <label htmlFor="addressProofUpload" className="form-label">Upload Address Proof (Max
                                        2MB)</label>
                                    <input
                                        id="addressProofUpload"
                                        type="file"
                                        name="addressProofFile"
                                        accept="image/*"
                                        className="form-control"
                                        onChange={(event) => {

                                            const file = event.currentTarget.files[0];
                                            if (file && file.size > 2 * 1024 * 1024) {
                                                alert("File size should not exceed 2MB.");
                                                event.currentTarget.value = null;
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div>Address Proof Number</div>
                                <Field className="form-control mt-2" name="addressProofNumber"
                                       placeholder="Enter Address Proof Number"/>
                                <ErrorMessage name="addressProofNumber" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="text-end mt-3">
                                <button className="btn px-5 btn-success" type="submit">Save</button>
                                <button className="btn px-5 ms-2 btn-warning text-white" type="button"
                                        onClick={(o)=>{

                                            setAgentCode("chang")
                                        }}>Clear
                                </button>
                            </div>

                        </div>
                    </Form>

                )}

            </Formik>
        </div>

    )


};