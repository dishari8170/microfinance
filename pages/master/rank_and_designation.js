import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaTrash } from "react-icons/fa";

const validationSchema = Yup.object({
    rank: Yup.string().required("Rank is required"),
    designation: Yup.string().required("Designation is required"),
});

export default () => {
    const [submittedData, setSubmittedData] = useState([]);

    const fetchData = async () => {
        try {
            let response = await axios.get("/api/designation");
            setSubmittedData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch('/api/designation', {
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
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/designation?id=${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <>
            <div className="fw-medium mb-3 mt-2" style={{ fontSize: 25 }}>Rank And Designation</div>
            <hr style={{ margin: "20px 0", border: "3px solid", color: "royalblue" }} />
            <div className="container-fluid">
                <Formik
                    initialValues={{
                        rank: "",
                        designation: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, resetForm }) => (
                        <Form className="border border-dark p-3">
                            <div className="row fw-bold mt-4">
                                <div className="col-md-6 mb-2">
                                    <div>Rank</div>
                                    <Field className="form-control mt-2" name="rank" />
                                    <ErrorMessage name="rank" component="div" className="text-danger mt-2" />
                                </div>

                                <div className="col-md-6 mb-2">
                                    <div>Designation</div>
                                    <Field className="form-control mt-2" name="designation" />
                                    <ErrorMessage name="designation" component="div" className="text-danger mt-2" />
                                </div>

                                <div className="text-end mt-3">
                                    <button className="btn px-5 btn-success" type="submit">Save</button>
                                    <button className="btn px-5 ms-2 btn-warning text-white" type="button" onClick={resetForm}>Clear</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>

                <div className="mb-3 mt-3 fw-bold">Rank List</div>
                <table className="table align-middle table-bordered border-black text-center">
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Designation</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {submittedData.map((data) => (
                        <tr key={data._id}>
                            <td>{data.rank}</td>
                            <td>{data.designation}</td>
                            <td>
                                <div className="d-flex justify-content-center">
                                    <div className="btn btn-success" onClick={() => {/* Implement view logic here if needed */}}>
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
    );
};
