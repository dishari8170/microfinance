import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    search: Yup.string().required("Search By is required"),
    code: Yup.number().required("Agent Code is required"),
});

export default () => {
    const handleSubmit = (values) => {

        console.log(values);
    };


    return (
        <>
            <div className="ms-2 mt-3 fw-medium mb-3" style={{ fontSize: 25 }}>
                Agent Search
            </div>

            <div className="container-fluid">
                Search Information
                <Formik
                    initialValues={{
                        search: "",
                        code: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="row mt-2 fw-bold">
                            <div className="col-md-6 col-12">
                                <div className="mt-2">Search By</div>
                                <Field as="select" className="form-control mt-2" name="search">
                                    <option value="">Select...</option>

                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>

                            <div className="col-md-6 col-12">
                                <div className="mt-2">Agent Code</div>
                                <Field className="form-control mt-2" name="code" />
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


