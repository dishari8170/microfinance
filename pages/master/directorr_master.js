import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaTrash } from "react-icons/fa";
import * as Yup from "yup";
import { dh } from "@/lib/Dh";
import SideZ from "@/Comp/SideZ";

const validationSchema = Yup.object().shape({
    director_name: Yup.string().required("Director Name is required"),
    appointment_date: Yup.string().required("Appointment Date is required"),
    din_no: Yup.string().required("DIN No is required"),
    registration_date: Yup.string().required("Registration Date is required"),
    share_amount: Yup.number().required("Share Amount is required"),
    pay_mode: Yup.string().required("Pay Mode is required"),
    cheque_no: Yup.string().required("Cheque No is required"),
    cheque_bank: Yup.string().required("Cheque Bank is required"),
    no_of_share: Yup.number().required("Number of Shares is required"),
    pay_date: Yup.string().required("Pay Date is required"),
    cheque_date: Yup.string().required("Cheque Date is required"),
    abx: Yup.string().required("ABX is required").default("dp.png"),
    to_account: Yup.string().required("To Account is required"),
});

export default() => {
    const [submittedData, setSubmittedData] = useState([]);

    const fetchData = async () => {
        const response = await axios.get("/api/directorrss");
        setSubmittedData(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        dh.loadx(true);
        try {
            const response = await fetch('/api/directorrss', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                Swal.fire("Done", "Data submitted", "success").then(() => {
                    fetchData();
                    resetForm();
                });
            } else {
                const errorMessage = await response.text();
                Swal.fire("Error", errorMessage || "Failed to submit data", "error");
            }
        } catch (error) {
            Swal.fire("Error", "An error occurred: " + error.message, "error");
        } finally {
            dh.loadx(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/directorrss?id=${id}`);
            fetchData();
        } catch (error) {
            Swal.fire("Error", "Failed to delete the record", "error");
        }
    };

    return (
        <>
            <>
                <div className="container">
                    <div className="h5">Director Master</div>
                    <Formik
                        initialValues={{
                            director_name: "",
                            appointment_date: "",
                            din_no: "",
                            registration_date: "",
                            share_amount: "",
                            pay_mode: "",
                            cheque_no: "",
                            cheque_bank: "",
                            no_of_share: "",
                            pay_date: "",
                            cheque_date: "",
                            abx: "dp.png",
                            to_account: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <div>Director Name</div>
                                        <Field className="form-control mt-2" name="director_name" />
                                        <ErrorMessage name="director_name" component="div" className="text-danger mt-2" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div>Appointment Date</div>
                                        <Field className="form-control mt-2" name="appointment_date" />
                                        <ErrorMessage name="appointment_date" component="div" className="text-danger mt-2" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div>DIN NO</div>
                                        <Field className="form-control mt-2" name="din_no" />
                                        <ErrorMessage name="din_no" component="div" className="text-danger mt-2" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div>Registration Date</div>
                                        <Field className="form-control mt-2" name="registration_date" />
                                        <ErrorMessage name="registration_date" component="div" className="text-danger mt-2" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="h5">Share Details</div>
                                    <div className="col-md-6 mb-2">
                                        <div>Share Amount</div>
                                        <Field className="form-control mt-2" name="share_amount" />
                                        <ErrorMessage name="share_amount" component="div" className="text-danger mt-2" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div>Pay Mode</div>
                                        <Field className="form-control mt-2" name="pay_mode" />
                                        <ErrorMessage name="pay_mode" component="div" className="text-danger mt-2" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div>Cheque No</div>
                                        <Field className="form-control mt-2" name="cheque_no" />
                                        <ErrorMessage name="cheque_no" component="div" className="text-danger mt-2" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div>Cheque Bank</div>
                                        <Field className="form-control mt-2" name="cheque_bank" />
                                        <ErrorMessage name="cheque_bank" component="div" className="text-danger mt-2" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div>No Of Shares</div>
                                        <Field className="form-control mt-2" name="no_of_share" />
                                        <ErrorMessage name="no_of_share" component="div" className="text-danger mt-2" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div>Pay Date</div>
                                        <Field className="form-control mt-2" name="pay_date" />
                                        <ErrorMessage name="pay_date" component="div" className="text-danger mt-2" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div>Cheque Date</div>
                                        <Field className="form-control mt-2" name="cheque_date" />
                                        <ErrorMessage name="cheque_date" component="div" className="text-danger mt-2" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div>To A/C</div>
                                        <Field className="form-control mt-2" name="to_account" />
                                        <ErrorMessage name="to_account" component="div" className="text-danger mt-2" />
                                    </div>
                                    <div className="text-end mt-3">
                                        <button className="btn px-5 btn-success" type="submit">Save</button>
                                        <button className="btn px-5 ms-2 btn-warning text-white" type="button" onClick={resetForm}>Clear</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <div className="mb-3 mt-3 fw-bold">Director List</div>
                    <table className="table align-middle table-bordered border-black text-center">
                        <thead>
                        <tr>
                            <th>Director Name</th>
                            <th>DIN No</th>
                            <th>App Date</th>
                            <th>Pay Date</th>
                            <th>Share Amount</th>
                            <th>No Of Shares</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {submittedData.map((data) => (
                            <tr key={data._id}>
                                <td>{data.director_name}</td>
                                <td>{data.din_no}</td>
                                <td>{data.appointment_date}</td>
                                <td>{data.pay_date}</td>
                                <td>{data.share_amount}</td>
                                <td>{data.no_of_share}</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <div className="btn btn-success" onClick={() => {
                                            Swal.fire("Viewing Director", `Details for ID: ${data._id}`, "info");
                                        }}>
                                            <FaEye className="me-2" style={{ fontSize: "25px" }} />View
                                        </div>
                                        <div className="btn btn-danger ms-3" onClick={() => handleDelete(data._id)}>
                                            <FaTrash className="me-2" style={{ fontSize: "25px" }} />Delete
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </>
        </>
    );
};



