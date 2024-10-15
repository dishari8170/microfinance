import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    code: Yup.string().required("Associate Code is required"),
    name: Yup.number().required("Associate Name is required"),
    rank: Yup.string().required("Associate Rank is required"),


});

export default () => {
    const handleSubmit = (values) => {

        console.log(values);
    };


    return (
        <>
            <div className="ms-2 mt-3 fw-medium mb-3" style={{ fontSize: 25 }}>
                Associate Chain View
            </div>

            <div className="container-fluid">
                Search
                <Formik
                    initialValues={{
                        code: "",
                        name: "",
                        rank: "",


                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="row mt-2 fw-bold">
                            <div className="col-md-4 col-12">
                                <div className="mt-2">Associate Code</div>
                                <Field as="select" className="form-control mt-2" name="code">


                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="mt-2">Associate Name</div>
                                <Field className="form-control mt-2" name="name" />
                                {errors.code && touched.code ? (
                                    <div className="text-danger mt-1">{errors.code}</div>
                                ) : null}
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mt-2">Associate Rank</div>
                                <Field className="form-control mt-2" name="rank" />
                                {errors.code && touched.code ? (
                                    <div className="text-danger mt-1">{errors.code}</div>
                                ) : null}
                            </div>



                            <div className="text-end mt-3 col-12">
                                <button className="btn px-5 btn-success" type="submit">
                                    SHOW PRINT
                                </button>
                                <button className="btn ms-2 px-5 btn-success" type="submit">
                                   PRINT
                                </button>

                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};


