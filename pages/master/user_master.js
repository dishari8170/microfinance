import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";

import * as Yup from "yup";
import { dh } from "@/lib/Dh";

const validationSchema = Yup.object().shape({
    branchName: Yup.string().required("Branch Name is required"),
    managerName: Yup.string().required("Manager Name is required"),
    branchCode: Yup.string().required("Branch Code is required"),
    prefix: Yup.string().required("Prefix is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    openingDate: Yup.date().required("Opening Date is required"),
});

const ITEMS_PER_PAGE = 5;

export default () => {
    const [submittedData, setSubmittedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/branches");
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
            const response = await fetch('/api/branches', {
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
                <div className="h1">Branch Information</div>
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
                    {({ resetForm }) => (
                        <Form className="border border-dark p-3">
                            <div className="row fw-bold mt-4">
                                <div className="col-md-3 mb-2">
                                    <div>Branch Name</div>
                                    <Field className="form-control mt-2" name="branchName" />
                                    <ErrorMessage name="branchName" component="div" className="text-danger mt-2" />
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Manager Name</div>
                                    <Field className="form-control mt-2" name="managerName" />
                                    <ErrorMessage name="managerName" component="div" className="mt-2 text-danger" />
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Branch Code</div>
                                    <Field className="form-control mt-2" name="branchCode" />
                                    <ErrorMessage name="branchCode" component="div" className="text-danger mt-2" />
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Prefix</div>
                                    <Field className="form-control mt-2" name="prefix" />
                                    <ErrorMessage name="prefix" component="div" className="text-danger mt-2" />
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Address</div>
                                    <Field className="form-control mt-2" name="address" />
                                    <ErrorMessage name="address" component="div" className="text-danger mt-2" />
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Phone Number</div>
                                    <Field className="form-control mt-2" name="phoneNumber" />
                                    <ErrorMessage name="phoneNumber" component="div" className="text-danger mt-2" />
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Opening Date</div>
                                    <Field type="date" className="form-control mt-2" name="openingDate" />
                                    <ErrorMessage name="openingDate" component="div" className="text-danger mt-2" />
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
                        <th>Prefix</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.branchCode}</td>
                            <td>{data.branchName}</td>
                            <td>{data.prefix}</td>
                            <td>
                                <div className="d-flex justify-content-center">
                                    <div className="btn btn-success" onClick={() => {
                                        const {
                                            branchName,
                                            managerName,
                                            branchCode,
                                            prefix,
                                            address,
                                            phoneNumber,
                                            openingDate
                                        } = data;
                                        Swal.fire({
                                            title: 'Branch Details',
                                            html: `
                                                    <p><strong>Branch Name:</strong> ${branchName}</p>
                                                    <p><strong>Manager Name:</strong> ${managerName}</p>
                                                    <p><strong>Branch Code:</strong> ${branchCode}</p>
                                                    <p><strong>Prefix:</strong> ${prefix}</p>
                                                    <p><strong>Address:</strong> ${address}</p>
                                                    <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                                                    <p><strong>Opening Date:</strong> ${openingDate}</p>
                                                `,
                                            confirmButtonText: 'Close'
                                        });
                                    }}>
                                        <FaEye className="me-2" style={{ fontSize: "25px" }} />View
                                    </div>

                                    <div className="btn btn-danger ms-3" onClick={() => {
                                        axios.delete(`/api/branches?id=${data._id}`)
                                            .then(() => {
                                                fetchData();
                                            })
                                            .catch(error => {
                                                console.error('Error deleting branch:', error);
                                                Swal.fire('Error', 'Could not delete branch.', 'error');
                                            });
                                    }}>
                                        <FaTrash className="me-2" style={{ fontSize: "25px" }} />Delete
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
