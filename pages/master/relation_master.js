import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import Sidex from "@/Comp/Sidex";
import * as Yup from "yup";
import { dh } from "@/lib/Dh";

const validationSchema = Yup.object().shape({
    relation: Yup.string().required("Relation is required"),

});

export default() => {
    const [submittedData, setSubmittedData] = useState([]);

    const fetchData = async () => {
        const response = await axios.get("/api/relation");
        setSubmittedData(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        dh.loadx(true);
        try {
            const response = await fetch('/api/relation', {
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

    return (
        <Sidex>
            <div className="container">
                <h1>Relation Manager</h1>
                <Formik
                    initialValues={{
                        rank: "Enter Relation",

                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ resetForm }) => (
                        <Form className="border border-dark p-3">


                                <div className="row fw-bold mt-4">
                                    <div className="col-12 mb-2">
                                        <div>Relation</div>
                                        <Field className="form-control mt-2" name="relation"/>
                                        <ErrorMessage name="relation" component="div" className="text-danger mt-2"/>
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

                <div className="mb-3 mt-3 fw-bold">Relation List</div>
                <table className="table align-middle table-bordered border-black text-center">
                    <thead>
                    <tr>
                        <th>Relation</th>
                     <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.relation}</td>


                            <td>
                                <div className="d-flex justify-content-center">
                                    <div
                                        className="btn btn-success"
                                        onClick={() => {
                                            Swal.fire("View", `Viewing details for ${data.rank}`, "info");
                                        }}
                                    >
                                        <FaEye className="me-2" style={{ fontSize: "25px" }} />
                                        View
                                    </div>
                                    <div
                                        className="btn btn-danger ms-3"
                                        onClick={() => {
                                            axios.delete(`/api/relation?id=${data._id}`).then(() => {
                                                fetchData();
                                            });
                                        }}
                                    >
                                        <FaTrash className="me-2" style={{ fontSize: "25px" }} />
                                        Delete
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Sidex>
    );
}
