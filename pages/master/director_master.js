import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";

import * as Yup from "yup";
import { dh } from "@/lib/Dh";
import SideZ from "@/Comp/SideZ";

const validationSchema = Yup.object().shape({
    director_name: Yup.string().required("Director Name is required"),

    din_no: Yup.string().required("DIN No is required"),
    appointment_date: Yup.string().required("Appointment Date is required"),
    registration_date: Yup.string().required("Registration Date is required"),
    share_amount: Yup.number().required("Share Amount is required"),
    no_of_share: Yup.number().required("Number of Shares is required"),
    pay_mode: Yup.string().required("Pay Mode is required"),
    pay_date: Yup.string().required("Pay Date is required"),
    cheque_no: Yup.string().required("Cheque No is required"),
    cheque_date: Yup.string().required("Cheque Date is required"),
    cheque_bank: Yup.string().required("Cheque Bank is required"),



    to_account: Yup.string().required("To Account is required"),
});

const ITEMS_PER_PAGE = 5;

export default () => {
    const [submittedData, setSubmittedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/director");
            setSubmittedData(response.data);
            setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        dh.loadx(true);
        try {
            const response = await fetch('/api/director', {
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
                console.error('Error submitting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            dh.loadx(false);
        }
    };



    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const currentData = submittedData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <>
            <div className="container">

                <Formik
                    initialValues={{
                        director_name: "",

                        din_no: "",
                        appointment_date: "",
                        registration_date: "",
                        share_amount: "",
                        no_of_share: "",
                        pay_mode: "",
                        pay_date: "",
                        cheque_no: "",
                        cheque_date: "",
                        cheque_bank: "",



                        to_account:"",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ resetForm }) => (
                        <Form>
                            <div className="row fw-medium border border-black">
                                <div>Director Master</div>
                                <div className="col-md-6 mb-2">
                                    <div>Director Name</div>
                                    <Field className="form-control mt-2" name="director_name"/>
                                    <ErrorMessage name="director_name" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-6 mb-2">
                                    <div>DIN NO</div>
                                    <Field className="form-control mt-2" name="din_no"/>
                                    <ErrorMessage name="din_no" component="div" className="text-danger mt-2"/>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div>Appointment Date</div>
                                    <Field className="form-control mt-2" name="appointment_date"/>
                                    <ErrorMessage name="appointment_date" component="div" className="text-danger mt-2"/>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div>Registration Date</div>
                                    <Field className="form-control mt-2" name="registration_date"/>
                                    <ErrorMessage name="registration_date" component="div"
                                                  className="text-danger mt-2"/>
                                </div>
                            </div>
                            <div className="row mt-3 fw-medium border border-black ">
                                <div className="">Share Details</div>
                                <div className="col-md-6 mb-2">
                                    <div>Share Amount</div>
                                    <Field className="form-control mt-2" name="share_amount"/>
                                    <ErrorMessage name="share_amount" component="div" className="text-danger mt-2"/>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div>No Of Shares</div>
                                    <Field className="form-control mt-2" name="no_of_share"/>
                                    <ErrorMessage name="no_of_share" component="div" className="text-danger mt-2"/>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div>Pay Mode</div>
                                    <Field className="form-control mt-2" name="pay_mode"/>
                                    <ErrorMessage name="pay_mode" component="div" className="text-danger mt-2"/>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div>Pay Date</div>
                                    <Field className="form-control mt-2" name="pay_date"/>
                                    <ErrorMessage name="pay_date" component="div" className="text-danger mt-2"/>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div>Cheque No</div>
                                    <Field className="form-control mt-2" name="cheque_no"/>
                                    <ErrorMessage name="cheque_no" component="div" className="text-danger mt-2"/>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div>Cheque Date</div>
                                    <Field className="form-control mt-2" name="cheque_date"/>
                                    <ErrorMessage name="cheque_date" component="div" className="text-danger mt-2"/>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div>Cheque Bank</div>
                                    <Field className="form-control mt-2" name="cheque_bank"/>
                                    <ErrorMessage name="cheque_bank" component="div" className="text-danger mt-2"/>
                                </div>


                                <div className="col-md-6 mb-2">
                                    <div>To A/C</div>
                                    <Field className="form-control mt-2" name="to_account"/>
                                    <ErrorMessage name="to_account" component="div" className="text-danger mt-2"/>
                                </div>
                            </div>
                            <div className="text-end mt-3">
                                <button className="btn px-5 btn-success" type="submit">Save</button>
                                <button className="btn px-5 ms-2 btn-warning text-white" type="button"
                                        onClick={resetForm}>Clear
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>

                <div className="mb-3 mt-3 fw-bold">Director List</div>
                <table className="table align-middle table-bordered  border-black text-center">
                    <thead>
                    <tr>
                        <th>Director Name</th>
                        <th>DIN No</th>
                        <th>App Date</th>
                        <th>Reg Date</th>

                        <th>Pay Mode</th>
                        <th>Pay Date</th>
                        <th>Share Amount</th>
                        <th>No Of Share</th>

                        <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((data) => (
                        <tr key={data._id}>
                            <td>{data.director_name}</td>
                            <td>{data.din_no}</td>
                            <td>{data.appointment_date}</td>
                            <td>{data.registration_date}</td>

                            <td>{data.pay_mode}</td>
                            <td>{data.pay_date}</td>
                            <td>{data.share_amount}</td>
                            <td>{data.no_of_share}</td>


                            <td>
                                <div className="d-flex justify-content-center">
                                    <div className="btn btn-success" onClick={() => {
                                        const {
                                            director_name,

                                            din_no,
                                            appointment_date,
                                            registration_date,
                                            share_amount,
                                            no_of_share,

                                            pay_mode,
                                            pay_date,
                                            cheque_no,
                                            cheque_date,
                                            cheque_bank,


                                            to_account,
                                        } = data;
                                        Swal.fire({
                                            title: 'Director Details',
                                            html: `
                                                   
                                                    <p><strong>Director Name:</strong> ${director_name}</p>
                                                    <p><strong>DIN No:</strong> ${din_no}</p>
<p><strong>Appointment Date:</strong> ${appointment_date}</p>


<p><strong>Registration Date:</strong> ${registration_date}</p>
<p><strong>Share Amount:</strong> ${share_amount}</p>
<p><strong>Number of Shares:</strong> ${no_of_share}</p>
<p><strong>Pay Mode:</strong> ${pay_mode}</p>
<p><strong>Pay Date:</strong> ${pay_date}</p>
<p><strong>Cheque No:</strong> ${cheque_no}</p>
<p><strong>Cheque Date:</strong> ${cheque_date}</p>
<p><strong>Cheque Bank:</strong> ${cheque_bank}</p>









<p><strong>To Account:</strong> ${to_account}</p>
                                                `,
                                            confirmButtonText: 'Close'
                                        });
                                    }}>
                                        <FaEye className="me-2" style={{fontSize: "25px"}}/>View
                                    </div>

                                    <div className="btn btn-danger ms-3" onClick={() => {
                                        axios.delete(`/api/director?id=${data._id}`)
                                            .then(() => {
                                                fetchData();
                                            })
                                            .catch(error => {
                                                console.error('Error deleting director:', error);
                                                Swal.fire('Error', 'Could not delete director.', 'error');
                                            });
                                    }}>
                                        <FaTrash className="me-2" style={{fontSize: "25px"}}/>Delete
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="justify-content-center align-items-center d-flex">
                    <div className="pagination">
                        {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => (
                            <button key={index} onClick={() => handlePageChange(index + 1)}
                                    className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'} me-1`}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
