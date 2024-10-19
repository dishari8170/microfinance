import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";


import {FaBandcamp, FaEye, FaTrash} from "react-icons/fa";
import Sidex from "@/Comp/Sidex";
import * as Yup from "yup";
import {dh} from "@/lib/Dh";


const validationSchema = Yup.object().shape({
    branchName: Yup.string().required("Branch Name is required"),
    managerName: Yup.string().required("Manager Name is required"),
    branchCode: Yup.string().required("Branch Code is required"),
    prefix: Yup.string().required("Prefix is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    openingDate: Yup.date().required("Opening Date is required"),
});

export default () => {
    const [submittedData, setSubmittedData] = useState([]);

    const featchdata = async () => {
        let dat = await axios.get("/api/branches")

        setSubmittedData(dat.data)
    }

    const [eye, seteye] = useState(false);


    useEffect(() => {

        featchdata()
    }, [])


    const handleSubmit = async (values, {resetForm}) => {

        dh.loadx(true)
        try {
            const response = await fetch('/api/branches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {


                Swal.fire("Done", "Data submited", "success").then(o => {


                    featchdata()
                })
            } else {
                console.error('Error submitting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }


        dh.loadx(false)
    };
    return <>
        {/*<div className="btn btn-warning" onClick={()=>dh.loadx(true)}>cccc</div>*/}
        {/*<div className="btn btn-warning" onClick={()=>dh.loadx()}>cccc</div>*/}
        <Sidex>
            <div className="container">
                <div className="h1
           ">Branch Information
                </div>
                <Formik
                    initialValues={{
                        branchName: "",
                        managerName: "",
                        branchCode: "",
                        prefix: "",
                        address: "",
                        phoneNumber: "",
                        openingDate: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({resetForm}) => (
                        <Form className="border border-dark p-3">
                            <div className="row fw-bold mt-4">
                                <div className="col-md-3 mb-2">
                                    <div>Branch Name</div>
                                    <Field className="form-control mt-2" name="branchName"/>
                                    <ErrorMessage name="branchName" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Manager Name</div>
                                    <Field className="form-control mt-2" name="managerName"/>
                                    <ErrorMessage name="managerName" component="div" className="mt-2 text-danger"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Branch Code</div>
                                    <Field className="form-control mt-2" name="branchCode"/>
                                    <ErrorMessage name="branchCode" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Prefix</div>
                                    <Field className="form-control mt-2" name="prefix"/>
                                    <ErrorMessage name="prefix" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Address</div>
                                    <Field className="form-control mt-2" name="address"/>
                                    <ErrorMessage name="address" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Phone Number</div>
                                    <Field className="form-control mt-2" name="phoneNumber"/>
                                    <ErrorMessage name="phoneNumber" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Opening Date</div>
                                    <Field type={"date"} className="form-control mt-2" name="openingDate"/>
                                    <ErrorMessage name="openingDate" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="text-end mt-3">
                                    <button className="btn px-5 btn-success" type="submit">Save</button>
                                    <button className="btn px-5 ms-2 btn-warning text-white" type="button"
                                            onClick={resetForm}>Clear
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="mb-3 mt-3 fw-bold">Branch List</div>
                <table className="table align-middle table-bordered border-black text-center">
                    <thead>
                    <tr>
                        <th>Code</th>
                        <th>Branch Name</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {submittedData.map((data, index) => (

                        <tr key={index}>
                            <td>{data.phoneNumber}</td>
                            <td>{data.branchName}</td>
                            <td>

                                <div className="d-flex justify-content-center  ">

                                    <div className={" btn btn-success "} onClick={(t) => {


                                        axios.delete(`/api/branches?id=${data._id}`).then(t => {

                                            featchdata()
                                        })


                                    }}><FaEye className="me-2" style={{fontSize: "25px",}}></FaEye>View
                                    </div>


                                    <div className={" btn btn-danger ms-3"} onClick={(t) => {


                                        axios.delete(`/api/branches?id=${data._id}`).then(t => {

                                            featchdata()
                                        })


                                    }}><FaTrash className="me-2" style={{fontSize: "25px",}}></FaTrash>Delete
                                    </div>


                                </div>
                            </td>


                        </tr>
                    ))}
                    </tbody>
                </table>


            </div>
        </Sidex>
    </>


}