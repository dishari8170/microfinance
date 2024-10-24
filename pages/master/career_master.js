import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";

import * as Yup from "yup";
import { dh } from "@/lib/Dh";


const validationSchema = Yup.object().shape({
    rank: Yup.string().required("Rank is required"),
    designation: Yup.string().required("Designation is required"),
    mly_target: Yup.string().required("Mly.Target is required"),
    yly_target: Yup.string().required("Yly.Target is required"),
    promotion: Yup.string().required("Promotion Target is required"),
    mfa: Yup.string().required("MFA is required"),
    bde: Yup.date().required("BDE is required"),
});
const ITEMS_PER_PAGE = 5;
export default() => {
    const [submittedData, setSubmittedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/career");
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
            const response = await fetch('/api/career', {
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
                <h1>Career Structure</h1>
                <Formik
                    initialValues={{
                        rank: "",
                        designation: "",
                        mly_target: "",
                        yly_target: "",
                        promotion: "",
                        mfa: "",
                        bde: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({resetForm}) => (
                        <Form className="border border-dark p-3">
                            <div className="row fw-bold mt-4">
                                <div className="col-md-3 mb-2">
                                    <div>Rank</div>
                                    <Field className="form-control mt-2" name="rank"/>
                                    <ErrorMessage name="rank" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Designation</div>
                                    <Field className="form-control mt-2" name="designation"/>
                                    <ErrorMessage name="designation" component="div" className="mt-2 text-danger"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Mly.Target</div>
                                    <Field className="form-control mt-2" name="mly_target"/>
                                    <ErrorMessage name="mly_target" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Yly.Target</div>
                                    <Field className="form-control mt-2" name="yly_target"/>
                                    <ErrorMessage name="yly_target" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Promotion</div>
                                    <Field className="form-control mt-2" name="promotion"/>
                                    <ErrorMessage name="promotion" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>MFA</div>
                                    <Field type="date" className="form-control mt-2" name="mfa"/>
                                    <ErrorMessage name="mfa" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>BDE</div>
                                    <Field type="date" className="form-control mt-2" name="bde"/>
                                    <ErrorMessage name="bde" component="div" className="text-danger mt-2"/>
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

                <div className="mb-3 mt-3 fw-bold">Rank List</div>
                <table className="table align-middle table-bordered border-black text-center bg-transparent">
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Designation</th>
                        <th>Mly Target</th>
                        <th>Yly Target</th>
                        <th>Promotion Target</th>
                        <th>MFA</th>
                        <th>BDE</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.rank}</td>
                            <td>{data.designation}</td>
                            <td>{data.mly_target}</td>
                            <td>{data.yly_target}</td>
                            <td>{data.promotion}</td>
                            <td>{data.mfa}</td>
                            <td>{data.bde}</td>
                            <td>
                                <div className="d-flex justify-content-center">
                                    <div className="btn btn-success" onClick={() => {
                                        const {
                                        rank,
                                        designation,
                                        mly_target,
                                        yly_target,
                                      promotion,
                                        mfa,
                                      bde
                                        } = data;
                                        Swal.fire({
                                            title: 'Career Details',
                                            html: `
                                                    <p><strong>Rank:</strong> ${ rank}</p>
                                                    <p><strong>Designation:</strong> ${designation}</p>
                                                    <p><strong>Mly.Target:</strong> ${mly_target}</p>
                                                    <p><strong>Yly.Target:</strong> ${yly_target}</p>
                                                    <p><strong>Promotion:</strong> ${promotion}</p>
                                                    <p><strong>MFA:</strong> ${mfa}</p>
                                                    <p><strong>BDE:</strong> ${bde}</p>
                                                `,
                                            confirmButtonText: 'Close'
                                        });
                                    }}>
                                        <FaEye className="me-2" style={{fontSize: "25px"}}/>View
                                    </div>

                                    <div className="btn btn-danger ms-3" onClick={() => {
                                        axios.delete(`/api/career?id=${data._id}`)
                                            .then(() => {
                                                fetchData();
                                            })
                                            .catch(error => {
                                                console.error('Error deleting branch:', error);
                                                Swal.fire('Error', 'Could not delete branch.', 'error');
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
                        {totalPages > 1 && Array.from({length: totalPages}, (_, index) => (
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
