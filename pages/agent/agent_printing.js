import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    branch: Yup.string().required("Branch is required"),
    from: Yup.number().required("From Date is required"),
    to: Yup.string().required("To Date is required"),


});

export default () => {
    const handleSubmit = (values) => {

        console.log(values);
    };


    return (
        <>
            <div className="ms-2 mt-3 fw-medium mb-3" style={{ fontSize: 25 }}>
               EMPLOYEE MANAGEMENT
            </div>

            <div className="container-fluid">
                Search
                <Formik
                    initialValues={{
                        branch: "",
                        from: "",
                         to: "",

                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="row mt-2 fw-bold">
                            <div className="col-md-4 col-12">
                                <div className="mt-2">Branch</div>
                                <Field as="select" className="form-control mt-2" name="branch">


                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="mt-2">From Date</div>
                                <Field className="form-control mt-2" name="from" />
                                {errors.code && touched.code ? (
                                    <div className="text-danger mt-1">{errors.code}</div>
                                ) : null}
                            </div>
 <div className="col-md-4 col-12">
                                <div className="mt-2">To Date</div>
                                <Field className="form-control mt-2" name="to" />
                                {errors.code && touched.code ? (
                                    <div className="text-danger mt-1">{errors.code}</div>
                                ) : null}
                            </div>


                            <div className="text-end mt-3 col-12">
                                <button className="btn px-5 btn-success" type="submit">
                                    Search
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};


