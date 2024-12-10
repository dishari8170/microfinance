import React, {useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import axios from "axios";
import UploadX from "@/Comp/UploadX"
import {useRouter} from "next/router";
import {dh} from "@/lib/Dh";


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    fatherName: Yup.string().required('Father name is required'),
    motherName: Yup.string().required('Mother name is required'),
    guardianName: Yup.string().required('Guardian name is required'),
    phone: Yup.string()
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
    identityProof: Yup.string().required('Identity proof is required'),
    identityProofNumber: Yup.string().required('Identity proof number is required'),
    addressProof: Yup.string().required('Address proof is required'),
    addressProofNumber: Yup.string().required('Address proof number is required'),
    address_font: Yup.string()
        .required('Address proof image is required'),

    address_back: Yup.mixed()
        .required('Address proof image is required'),

    identity_font: Yup.mixed()
        .required('Identity proof image is required'),
    identity_back: Yup.mixed()
        .required('Identity proof image is required'),
    photo: Yup.mixed()
        .required('Your Photo is required'),
    signature: Yup.mixed()
        .required('Signature image is required')

});

export default () => {

    const [agentCode, setUserCode] = useState('User Id');

    const fetchUserCode = async () => {
        try {
            const response = await axios.get("/api/user?dia=4");



            setValuesx({...valuesx,code: response.data});
        } catch (error) {
            console.error('Error fetching agent code:', error);
        }
    };

    const fetchData = async (id) => {
        try {
            const response = await axios.get(`/api/user?_id=${id}`);

            setValuesx( response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleSubmit = async (values, {resetForm}) => {


        await axios.post(`/api/user`, values).then(vl => {

            if (vl.data.stat === "ok") {
                Swal.fire("Done", vl.data.msg, "success").then(() => {


                    router.back();
                });
            } else {
                Swal.fire("Errors", "Data submit Errors", "error").then(() => {

                    resetForm();
                });
            }


        })


    };


    const router = useRouter();

    const [role, setRole] = useState("");
const [readOnly, setReadOnly] = useState(false);
    const [valuesx, setValuesx] = useState({
        role:"",
        code:"",
        parent:"",
        name: '',
        fatherName: '',
        motherName: '',
        guardianName: '',
        phone: '',
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
        address_back: "dp.png",
        address_font: "dp.png",
        identity_font: "dp.png",
        identity_back: "dp.png",
        photo: "dp.png",
        signature: "dp.png",


    });

    useEffect(() => {

        if (router.query.role) {

            console.log(valuesx)
            setRole(router.query.role);
            const ty=valuesx;
            ty.role=router.query.role;
            setValuesx(ty);
            if (router.query.view) {
                setReadOnly(true)
            }

        }else {
            return;
        }

        if (router.query._id) {



            fetchData(router.query._id)

        } else {

            fetchUserCode()
        }


    }, [router.query.role]);


    return (
        <div className="container">



            <Formik

                enableReinitialize={true}
                initialValues={valuesx}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({resetForm, values, setValues, errors}) => (
                    <Form className=" ">
                        <div className="row fw-bold mt-4">

                            <div className="col-md-3 mb-2">
                                <div>{values.role} ID</div>
                                <Field  className="form-control mt-2" name="code" disabled/>

                            </div>
                            <div className="col-md-3 mb-2">
                                <div>Name</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="name" placeholder="Enter your name"/>
                                <ErrorMessage name="name" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Father Name</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="fatherName"
                                       placeholder="Enter father's name"/>
                                <ErrorMessage name="fatherName" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div>Mother Name</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="motherName"
                                       placeholder="Enter mothers's name"/>
                                <ErrorMessage name="motherName" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Guardian Name</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="guardianName"
                                       placeholder="Enter guardian's name"/>
                                <ErrorMessage name="guardianName" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Mobile No</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="phone" placeholder="Enter mobile number"/>
                                <ErrorMessage name="phone" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Date of Birth</div>
                                <Field disabled={readOnly} type="date" className="form-control mt-2" name="dateOfBirth"/>
                                <ErrorMessage name="dateOfBirth" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Email</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="email" placeholder="Enter email"/>
                                <ErrorMessage name="email" component="div" className="text-danger mt-2"/>
                            </div>

                            <h3 className="w-100 mt-4">Present Address</h3>

                            <div className="col-md-3 mb-2">
                                <div>Village</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="presentAddress.village"
                                       placeholder="Enter village"/>
                                <ErrorMessage name="presentAddress.village" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Post</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="presentAddress.post"
                                       placeholder="Enter post"/>
                                <ErrorMessage name="presentAddress.post" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Block</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="presentAddress.block"
                                       placeholder="Enter block"/>
                                <ErrorMessage name="presentAddress.block" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>City</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="presentAddress.city"
                                       placeholder="Enter city"/>
                                <ErrorMessage name="presentAddress.city" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>District</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="presentAddress.dist"
                                       placeholder="Enter district"/>
                                <ErrorMessage name="presentAddress.dist" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>State</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="presentAddress.state"
                                       placeholder="Enter state"/>
                                <ErrorMessage name="presentAddress.state" component="div" className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Pincode</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="presentAddress.pincode"
                                       placeholder="Enter pincode"/>
                                <ErrorMessage name="presentAddress.pincode" component="div"
                                              className="text-danger mt-2"/>
                            </div>


                            <div className="col-12 d-inline-flex justify-content-between">
                                <h3>Permanent Address </h3>
                                {readOnly?<div></div>:<div className=""> <input type="checkbox" name="" className="form-check-input border-danger ms-2  mt-2"
                                       style={{height: "30px", width: "30px",}}  onChange={async u => {


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
                                }}/><div className="">Same..?</div> </div>}

                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Village</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="permanentAddress.village"
                                       placeholder="Enter village"/>
                                <ErrorMessage name="permanentAddress.village" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Post</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="permanentAddress.post"
                                       placeholder="Enter post"/>
                                <ErrorMessage name="permanentAddress.post" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Block</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="permanentAddress.block"
                                       placeholder="Enter block"/>
                                <ErrorMessage name="permanentAddress.block" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>City</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="permanentAddress.city"
                                       placeholder="Enter city"/>
                                <ErrorMessage name="permanentAddress.city" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>District</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="permanentAddress.dist"
                                       placeholder="Enter district"/>
                                <ErrorMessage name="permanentAddress.dist" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3  mb-2">
                                <div>State</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="permanentAddress.state"
                                       placeholder="Enter state"/>
                                <ErrorMessage name="permanentAddress.state" component="div"
                                              className="text-danger mt-2"/>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Pincode</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="permanentAddress.pincode"
                                       placeholder="Enter pincode"/>
                                <ErrorMessage name="permanentAddress.pincode" component="div"
                                              className="text-danger mt-2"/>
                            </div>


                            <div className="col-12 py-3"><h3>Documents</h3></div>
                            <div className="col-md-3 mb-2">
                                <div>Identity Proof</div>
                                <Field disabled={readOnly} as="select" name="identityProof" className="form-control mt-2">
                                    <option value="">Select Identity Proof</option>
                                    <option value="Aadhar Card">Aadhar Card</option>
                                    <option value="PAN">PAN</option>
                                    <option value="Voter Card">Voter Card</option>
                                </Field>
                                <ErrorMessage name="identityProof" component="div" className="text-danger mt-2"/>

                            </div>

                            <div className="col-md-3 mb-2">
                                <div>Identity Proof Number</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="identityProofNumber"
                                       placeholder="Enter Identity Proof Number"/>
                                <ErrorMessage name="identityProofNumber" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div>Address Proof</div>
                                <Field disabled={readOnly} as="select" name="addressProof" className="form-control mt-2">
                                    <option value="">Select Address Proof</option>
                                    <option value="Voter Card">Voter Card</option>
                                    <option value="Aadhar Card">Aadhar Card</option>
                                    <option value="Driving Licence">Driving Licence</option>

                                </Field>
                                <ErrorMessage name="addressProof" component="div" className="text-danger mt-2"/>


                            </div>
                            <div className="col-md-3 mb-2">
                                <div>Address Proof Number</div>
                                <Field disabled={readOnly} className="form-control mt-2" name="addressProofNumber"
                                       placeholder="Enter Address Proof Number"/>
                                <ErrorMessage name="addressProofNumber" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6  col-lg-4">Identity Proof Font Page
                                    {readOnly?<a href={dh.ImUrl+values.identity_font}>
                                            <div className="d-flex justify-content-center bg-primary p-3 mt-2">
                                                <img className="w-100" src={dh.ImUrl+values.identity_font}
                                                     style={{objectFit: "scale-down"}} height={"200px"}
                                                     alt={dh.ImUrl+values.identity_font}/></div></a>:<UploadX
                                                cb={(im) => setValues({...values, identity_font: im})}
                                                df={values.identity_font}
                                                height={"200px"}
                                                className="bg-primary mt-3"/>}


                                            </div>
                                            <div className="col-md-6 col-lg-4"> Identity Proof Back Page
                                                {readOnly?<a href={dh.ImUrl+values.identity_back}>
                                                        <div className="d-flex justify-content-center bg-primary p-3 mt-2">
                                                            <img className="w-100" src={dh.ImUrl+values.identity_back}
                                                                 style={{objectFit: "scale-down"}} height={"200px"}
                                                                 alt={dh.ImUrl+values.identity_back}/></div></a>:<UploadX
                                                            cb={(im) => setValues({...values, identity_back: im})}
                                                            df={values.identity_back}
                                                            height={"200px"}
                                                            className="bg-primary mt-3 "/>}</div>
                                                        <div className="col-md-6 col-lg-4">Address Proof Font
                                                            {readOnly?<a href={dh.ImUrl+values.address_font}>
                                                                    <div className="d-flex justify-content-center bg-primary p-3 mt-2">
                                                                        <img className="w-100" src={dh.ImUrl+values.address_font}
                                                                             style={{objectFit: "scale-down"}} height={"200px"}
                                                                             alt={dh.ImUrl+values.address_font}/></div></a>:<UploadX
                                                                cb={(im) => setValues({...values, address_font: im})}
                                                                df={values.address_font}
                                                                height={"200px"}
                                                                className="bg-primary mt-3"/>}</div>
                                                        <div className="d-lg-block col-12   d-none" style={{minHeight: "25px"}}></div>
                                <div className="col-md-6 col-lg-4"> Address Proof Back
                                    {readOnly?<a href={dh.ImUrl+values.address_back}>
                                        <div className="d-flex justify-content-center bg-primary p-3 mt-2">
                                            <img className="w-100" src={dh.ImUrl+values.address_back}
                                                 style={{objectFit: "scale-down"}} height={"200px"}
                                                 alt={dh.ImUrl+values.address_back}/>

                                        </div>
                                    </a>:<UploadX cb={(im) => setValues({...values, address_back: im})}
                                                 df={values.address_back}
                                                 height={"200px"}
                                                 className="bg-primary mt-3 "/>}

                                </div>
                                <div className="col-md-6 col-lg-4">Profile Photo
                                    {readOnly?<a href={dh.ImUrl+values.photo}>
                                            <div className="d-flex justify-content-center bg-primary p-3 mt-2">
                                                <img className="w-100" src={dh.ImUrl+values.photo}
                                                     style={{objectFit: "scale-down"}} height={"200px"}
                                                     alt={dh.ImUrl+values.photo}/></div></a>:<UploadX cb={(im) => setValues({...values, photo: im})} df={values.photo}
                                              height={"200px"}
                                              className="bg-primary mt-3"/>}</div>
                                <div className="col-md-6 col-lg-4"> Signature
                                    {readOnly?<a href={dh.ImUrl+values.signature}>
                                            <div className="d-flex justify-content-center bg-primary p-3 mt-2">
                                                <img className="w-100" src={dh.ImUrl+values.signature}
                                                     style={{objectFit: "scale-down"}} height={"200px"}
                                                     alt={dh.ImUrl+values.signature}/></div></a>:<UploadX cb={(im) => setValues({...values, signature: im})} df={values.signature}
                                              height={"200px"}
                                              className="bg-primary  mt-3"/>}</div>

                            </div>

                            {Object.entries(errors).map(entry => <div
                                className="mt-1 text-danger">{entry[0] === "presentAddress" ? Object.entries(entry[1]).map((entryx) =>
                                <div className="mt-1">*{entryx[1]}</div>) : "*" + entry[1]}</div>)}

                            <div className="text-end mt-3">


                                {readOnly ? "" : <input className="btn px-5 btn-success" type="submit" value="submit"/>}
                                {readOnly?<button className="btn px-5 ms-2 btn-warning text-white" type="button"
                                         onClick={(l)=>{

                                             router.back()
                                         }}>Back
                                </button>:
                                <button className="btn px-5 ms-2 btn-warning text-white" type="button"
                                        onClick={resetForm}>Clear
                                </button>}
                            </div>

                        </div>
                    </Form>

                )}

            </Formik>


        </div>

    )


};