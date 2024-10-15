import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";


const validationSchema = Yup.object({
    rank: Yup.string().required("Rank is required"),
    designation: Yup.string().required("Designation is required"),
});
export default () => {

    const [submittedData, setSubmittedData] = useState([]);

    const featchdata = async () => {
        let dat = await axios.get("/api/designation")

        setSubmittedData(dat.data)
    }


    useEffect(() => {

        featchdata()
    }, [])


    const handleSubmit = async (values, {resetForm}) => {
        try {
            const response = await fetch('/api/designation', {
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
    };
    return <>

        <div className="fw-medium mb-3 mt-2" style={{fontSize: 25}}>Rank And Designation</div>
        <hr style={{margin: "20px 0", border: "3px solid", color: "royalblue"}}/>
        <div className="container-fluid">

            <Formik
                initialValues={{
                    rank: "",
                    designation: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({handleSubmit, resetForm, errors,
                      touched}) => (
                    <Form>

                        <div className="row mt-2 fw-bold">

                            <div className="col-md-6 col-12">
                                <div className="d-flex align-items-center">
                                    <div className="mt-2 me-2"> Rank</div>
                                    <Field
                                        className={`form-control mt-2 ${touched.rank && errors.rank ? 'is-invalid' : ''}`}
                                        name="rank"
                                        placeholder="Enter Rank"
                                    />
                                    {touched.rank && errors.rank && (
                                        <div className="invalid-feedback ms-2">{errors.rank}</div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6  col-12">
                                <div className="d-flex align-items-center">
                                    <div className="mt-2 me-2"> Designation</div>
                                    <Field
                                        className={`form-control mt-2 ${touched.designation && errors.designation ? 'is-invalid' : ''}`}
                                        name="designation"
                                        placeholder="Enter Designation"
                                    />
                                    {touched.designation && errors.designation && (
                                        <div className="invalid-feedback ms-2">{errors.designation}</div>
                                    )}
                                </div>
                            </div>
                            <div className="text-end mt-3">
                                <div className="">
                                    <button className="btn px-5 btn-success " type="submit"


                                    >Save
                                    </button>

                                    <button className="btn px-5 ms-2 btn-warning
                                   text-white" type="button" onClick={() => {


                                        resetForm();
                                    }}
                                    >Clear
                                    </button>
                                </div>


                            </div>

                        </div>
                    </Form>
                )}

            </Formik>


            <div className="mb-3 mt-3 fw-bold">Rank List</div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Designation</th>
                    <th>Action</th>

                </tr>
                </thead>
                <tbody>
                {submittedData.map((data, index) => (
                    <tr key={index}>
                        <td>{data.rank}</td>
                        <td>{data.designation}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    </>


}