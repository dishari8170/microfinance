import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import * as Yup from "yup";
import { dh } from "@/lib/Dh";
import SideZ from "@/Comp/SideZ";

const validationSchema = Yup.object().shape({
    group_code: Yup.string().required("Group Code is required"),
    opening_date: Yup.string().required("Opening Date is required"),
    group_branch: Yup.string().required("Group Branch is required"),
    collection_code: Yup.string().required("Collection Code required"),
    collector_name: Yup.string().required("Collection Name required"),
    group_name: Yup.string().required("Group Name is required"),
    group_head: Yup.string().required("Group Head is required"),
    phone_no: Yup.string().required("Phone No is required"),
    address: Yup.string().required("Address is required"),
    member_code: Yup.date().required("Member Code is required"),
    name: Yup.date().required("Name is required"),
});

const ITEMS_PER_PAGE = 5;

export default () => {
    const [submittedData, setSubmittedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/group");
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
            const response = await fetch('/api/group', {
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
                <div className="h1">Group Master</div>
                <Formik
                    initialValues={{
                        group_code: "",
                        opening_date: "",
                        group_branch: "",
                        collection_code: "",
                        collector_name: "",
                        group_name: "",
                        group_head: "",
                        phone_no: "",
                        address: "",
                        member_code: "",
                        name: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ resetForm }) => (
                        <Form className="border border-dark p-3">
                            <div className="row fw-bold mt-4">
                                <div className="col-md-3 mb-2">
                                    <div>Group Code</div>
                                    <Field className="form-control mt-2" name="group_code"/>
                                    <ErrorMessage name="group_code" component="div" className="text-danger mt-2"/>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <div>Opening Date</div>
                                    <Field className="form-control mt-2" name="opening_date"/>
                                    <ErrorMessage name="opening_date" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Group Branch</div>
                                    <Field className="form-control mt-2" name="group_branch"/>
                                    <ErrorMessage name="group_branch" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Collection Code</div>
                                    <Field className="form-control mt-2" name="collection_code"/>
                                    <ErrorMessage name="collection_code" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Collector Name</div>
                                    <Field className="form-control mt-2" name="collector_name"/>
                                    <ErrorMessage name="collector_name" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Group Name</div>
                                    <Field className="form-control mt-2" name="group_name"/>
                                    <ErrorMessage name="group_name" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Group Head</div>
                                    <Field className="form-control mt-2" name="group_head"/>
                                    <ErrorMessage name="group_head" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Phone No</div>
                                    <Field className="form-control mt-2" name="phone_no"/>
                                    <ErrorMessage name="phone_no" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Address</div>
                                    <Field className="form-control mt-2" name="address"/>
                                    <ErrorMessage name="address" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Member Code</div>
                                    <Field className="form-control mt-2" name="member_code"/>
                                    <ErrorMessage name="member_code" component="div" className="text-danger mt-2"/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div>Name</div>
                                    <Field className="form-control mt-2" name="name"/>
                                    <ErrorMessage name="Name" component="div" className="text-danger mt-2"/>
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

                <div className="mb-3 mt-3 fw-bold">Group List</div>
                <table className="table align-middle table-bordered border-black text-center">
                    <thead>
                    <tr>
                        <th>Group Code</th>
                        <th>Group Name</th>
                        <th>Date Of Join</th>
                        <th>Collector</th>
                        <th>Branch</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.group_code}</td>
                            <td>{data.group_name}</td>
                            <td>{data.opening_date}</td>
                            <td>{data.collector_name}</td>
                            <td>{data.group_branch}</td>


                            <td>
                                <div className="d-flex justify-content-center">
                                    <div className="btn btn-success" onClick={() => {
                                        const {
                                            group_code,
                                            opening_date,
                                            group_branch,
                                            collection_code,
                                            collector_name,
                                            group_name,
                                            group_head,
                                            phone_no,
                                            address,
                                            member_code,
                                            name,
                                        } = data;
                                        Swal.fire({
                                            title: 'Group Details',
                                            html: `
                                                    <p><strong>Group Code:</strong> ${group_code}</p>
                                                    <p><strong>Opening Date:</strong> ${opening_date}</p>
                                                    <p><strong>Branch Code:</strong> ${group_branch}</p>
                                                    <p><strong>Collection Code:</strong> ${collection_code}</p>
                                                    <p><strong>Collection Name:</strong> ${collector_name}</p>
                                                    <p><strong>Group Name:</strong> ${group_name}</p>
                                                    <p><strong>Group Head :</strong> ${group_head}</p>
                                                    <p><strong>Phone No:</strong> ${phone_no}</p>
                                                     <p><strong>Address:</strong> ${address}</p>
                                                    
                                                    <p><strong>Member Code:</strong> ${member_code}</p>
                                                    <p><strong>Name:</strong> ${name}</p>
                                                    
                                                `,
                                            confirmButtonText: 'Close'
                                        });
                                    }}>
                                        <FaEye className="me-2" style={{fontSize: "25px"}}/>View
                                    </div>

                                    <div className="btn btn-danger ms-3" onClick={() => {
                                        axios.delete(`/api/group?id=${data._id}`)
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
