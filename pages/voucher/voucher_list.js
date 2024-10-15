import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    voucher: Yup.string().required("Voucher is required"),
    branch: Yup.number().required("Branch Name is required"),
    vouchery: Yup.string().required("Associate Rank is required"),
    associate: Yup.string().required("Associate is required"),
});

export default () => {
    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <>
            <div className="ms-2 mt-3 fw-medium mb-3" style={{ fontSize: 25 }}>
                Voucher List Print
            </div>

            <div className="container-fluid">
                Search By Branch
                <Formik
                    initialValues={{
                        voucher: "",
                        branch: "",
                        vouchery: "",
                        associate: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className=" mt-2">
                            <div className="col-md-6 col-12">
                                <div className="mt-2">Voucher</div>
                                <Field as="select" className="form-control mt-2" name="voucher">

                                </Field>
                                {errors.voucher && touched.voucher ? (
                                    <div className="text-danger mt-1">{errors.voucher}</div>
                                ) : null}
                            </div>

                            <div className="col-md-6 col-12">
                                <div className="mt-2">Branch Name</div>
                                <Field className="form-control mt-2" name="branch" />
                                {errors.branch && touched.branch ? (
                                    <div className="text-danger mt-1">{errors.branch}</div>
                                ) : null}
                            </div>

                            <div className="text-end mt-3 col-12">
                                <button type="submit" className="btn px-3 btn-success">
                                    Search
                                </button>
                            </div>

                            <div className="">Search By Associate</div>
                            <div className="col-md-6 col-12">
                                <div className="mt-2">Associate Rank</div>
                                <Field className="form-control mt-2" name="vouchery" />
                                {errors.vouchery && touched.vouchery ? (
                                    <div className="text-danger mt-1">{errors.vouchery}</div>
                                ) : null}
                            </div>

                            <div className="col-md-6 col-12">
                                <div className="mt-2">Associate</div>
                                <Field className="form-control mt-2" name="associate" />
                                {errors.associate && touched.associate ? (
                                    <div className="text-danger mt-1">{errors.associate}</div>
                                ) : null}
                            </div>

                            <div className="text-end mt-3 col-12">
                                <button type="submit" className="btn px-2 btn-success">
                                    Show Chain Voucher
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};
