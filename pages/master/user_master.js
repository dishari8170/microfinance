import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import Sidex from "@/Comp/Sidex";
import * as Yup from "yup";
import { dh } from "@/lib/Dh";

const validationSchema = Yup.object().shape({
    user: Yup.string().required("User is required"),
    designation: Yup.string().required("Designation is required"),
    mly_target: Yup.string().required("Mly.Target is required"),
    yly_target: Yup.string().required("Yly.Target is required"),
    promotion: Yup.string().required("Promotion Target is required"),
    mfa: Yup.string().required("MFA is required"),
    bde: Yup.date().required("BDE is required"),
});

export default() => {
    const [submittedData, setSubmittedData] = useState([]);

    const fetchData = async () => {
        const response = await axios.get("/api/career");
        setSubmittedData(response.data);
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

    return (
        <Sidex>
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
                    {({ resetForm }) => (
                        <Form className="border border-dark p-3">
                            <div className="row fw-bold mt-4">
                                {['rank', 'designation', 'mly_target', 'yly_target', 'promotion', 'mfa'].map((field, index) => (
                                    <div className="col-md-3 mb-2" key={index}>
                                        <div>{field.replace('_', ' ').toUpperCase()}</div>
                                        <Field className="form-control mt-2" name={field} />
                                        <ErrorMessage name={field} component="div" className="text-danger mt-2" />
                                    </div>
                                ))}
                                <div className="col-md-3 mb-2">
                                    <div>BDE</div>
                                    <Field type="date" className="form-control mt-2" name="bde" />
                                    <ErrorMessage name="bde" component="div" className="text-danger mt-2" />
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
                                            // axios.delete(`/api/career?id=${data._id}`).then(() => {
                                            //     fetchData();
                                            // });
                                            window.print()
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
