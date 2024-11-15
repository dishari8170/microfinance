import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import * as Yup from "yup";
import { dh } from "@/lib/Dh";
import UploadX from "@/Comp/UploadX";
import SideZ from "@/Comp/SideZ";

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    dp: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
});

const ITEMS_PER_PAGE = 5;

export default () => {
    const [submittedData, setSubmittedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        const response = await axios.get("/api/employy");
        setSubmittedData(response.data);
        setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        dh.loadx(true);
        try {
            const response = await fetch('/api/employy', {
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
            <h1>Employ</h1>
            <Formik
                initialValues={{
                    name: "",
                    type: "",
                    dp: "",
                    password: "",
                    email: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ resetForm }) => (
                    <Form className="border border-dark p-3">
                        <div className="row fw-bold mt-4">
                            <div className="col-md-3 mb-2">
                                <div>Name</div>
                                <Field className="form-control mt-2" name="name"/>
                                <ErrorMessage name="name" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div>Type</div>
                                <Field className="form-control mt-2" name="type"/>
                                <ErrorMessage name="type" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div>DP</div>
{/*<div className="" style={{height:"80px"}}>*/}
{/*    */}
{/*                                <UploadX cb={(d)=>{*/}

{/*                                }}/></div>*/}
                                <Field className="form-control mt-2" name="dp"/>
                                <ErrorMessage name="dp" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div>Password</div>
                                <Field className="form-control mt-2" name="password"/>
                                <ErrorMessage name="password" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div>Email</div>
                                <Field className="form-control mt-2" name="email"/>
                                <ErrorMessage name="email" component="div" className="text-danger mt-2"/>
                            </div>
                            <div className="text-end mt-3">
                                <button className="btn px-5 btn-success" type="submit">Save</button>
                                <button className="btn px-5 ms-2 btn-warning text-white" type="button" onClick={resetForm}>Clear</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="mb-3 mt-3 fw-bold">Data Table</div>
            <table className="table align-middle table-bordered border-black text-center">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>DP</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentData.map((data, index) => (
                    <tr key={index}>
                        <td>{data._id.substring(9)}</td>
                        <td>{data.type}</td>
                        <td>{data.dp}</td>
                        <td>{data.password}</td>
                        <td>{data.email}</td>
                        <td>
                            <div className="d-flex justify-content-center">
                                <div className="btn btn-success" onClick={() => {
                                    Swal.fire("View", `Viewing details for ${data.rank}`, "info");
                                }}>
                                    <FaEye className="me-2" style={{ fontSize: "25px" }} />
                                    View
                                </div>
                                <div className="btn btn-danger ms-3" onClick={() => {
                                    // Handle delete logic here
                                    Swal.fire("Delete", "Are you sure you want to delete?", "warning");
                                }}>
                                    <FaTrash className="me-2" style={{ fontSize: "25px" }} />
                                    Delete
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="justify-content-center align-items-center d-flex">
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)} className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'} me-1`}>
                        {index + 1}
                    </button>
                ))}
            </div></div>
        </div>
</>
    );
};
