import { Field, Formik, Form } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object({
    code: Yup.string().required("CODE is required"),
    name: Yup.string().required("Ledger Name is required"),
    group: Yup.string().required("Group is required"),
    type: Yup.string().required("TYPE is required"),
});

export default () => {
    const handleSubmit = (values, { resetForm }) => {

        console.log("Form values:", values);
        resetForm();
    };

    return (
        <>
            <div className="ms-2 mt-3 fw-medium mb-3" style={{ fontSize: 25 }}>
                Group Master
            </div>

            <div className="container-fluid">
                <div className="border bg-light shadow border-info p-4 rounded">
                    <div className="mb-3">Search</div>
                    <Formik
                        initialValues={{
                            code: "",
                            name: "",
                            group: "",
                            type: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, resetForm }) => (
                            <Form className="row mt-2 fw-bold">
                                <div className="col-md-6 col-12">
                                    <div className="mt-2">CODE</div>
                                    <Field className="form-control mt-2" name="code" />
                                    {errors.code && touched.code ? (
                                        <div className="text-danger mt-1">{errors.code}</div>
                                    ) : null}
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="mt-2">LEDGER NAME</div>
                                    <Field className="form-control mt-2" name="name" />
                                    {errors.name && touched.name ? (
                                        <div className="text-danger mt-1">{errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="mt-2">UNDER GROUP</div>
                                    <Field className="form-control mt-2" name="group" />
                                    {errors.group && touched.group ? (
                                        <div className="text-danger mt-1">{errors.group}</div>
                                    ) : null}
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="mt-2">TYPE</div>
                                    <Field className="form-control mt-2" name="type" />
                                    {errors.type && touched.type ? (
                                        <div className="text-danger mt-1">{errors.type}</div>
                                    ) : null}
                                </div>

                                <div className="text-end mt-3 col-12">
                                    <button className="btn border border-info px-5 btn-success" type="submit">
                                        Save
                                    </button>
                                    <button
                                        className="btn ms-2 px-5 border border-info btn-warning"
                                        type="button"
                                        onClick={resetForm}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};


