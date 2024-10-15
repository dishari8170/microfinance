import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const validationSchema = Yup.object({
    branch: Yup.string().required("Branch is required"),
    from: Yup.string().required("Date is required"),
    date: Yup.string().required("Date is required"),
});
export default () => {

    const [submittedData, setSubmittedData] = useState({});

    const featchdata = async () => {
        let dat = await axios.get("/api/ma_sa")


        setSubmittedData(dat.data)
    }





    useEffect(() => {

        featchdata()
    }, [])


    const handleSubmit = async (values, {resetForm}) => {
        try {
            const response = await fetch('/api/ma_sa', {
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
    return (
        <div className="m-0 w-100">

            <div className="ms-2 mt-3 fw-medium mb-3" style={{fontSize: 25}}>
                Mobile App Saving Account Collection
            </div>

            <div className="container border p-lg-5 rounded-3 shadow-sm">Search
                <Formik
                    initialValues={{
                        branch: "",
                        from: "",
                        date: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({handleSubmit, resetForm, errors, touched}) => (
                        <Form className="row mt-2 fw-bold">
                            <div className="col-md-4 col-12">
                                <div className="mt-2"> Branch</div>
                                {/*<Field className="form-control mt-2" name="branch" placeholder="All Branch"/>*/}

                                <Field as="select" className="form-control mt-2" name="branch">
                                    <option value="" label="Select branch" />
                                    {submittedData.b?.map(branch => (
                                        <option key={branch._id} defaultValue={branch._id}  className="bg-danger"> {branch.branchName}</option>
                                    ))}
                                </Field>
                                {errors.branch && touched.branch ? (
                                    <div className="text-danger mt-1">{errors.branch}</div>
                                ) : null}



                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mt-2">From Date</div>
                                <Field className="form-control mt-2" name="from"/>
                                {errors.from && touched.from ? (
                                    <div className="text-danger mt-1">{errors.from}</div>
                                ) : null}
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mt-2">To Date</div>
                                <Field className="form-control mt-2" name="date"/>
                                {errors.date && touched.date ? (
                                    <div className="text-danger mt-1">{errors.date}</div>
                                ) : null}
                            </div>
                            <div className="text-end mt-3 col-12">
                                <button className="btn px-5 btn-success" type="submit">
                                    Show
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>


                <div className="mb-3 mt-3 fw-bold">Search Details</div>
                <table className="table table-warning table-bordered border-black text-center">
                    <thead>
                    <tr>
                        <th> Branch</th>
                        <th>From Date</th>
                        <th>To Date</th>

                    </tr>
                    </thead>
                    <tbody>
                    {submittedData.org?.map((data, index) => (
                        <tr key={index}>
                            <td>{data.branch}</td>
                            <td>{data.from}</td>
                            <td>{data.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>






        </div>
    )
        ;
};
