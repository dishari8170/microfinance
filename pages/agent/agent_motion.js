import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    code: Yup.string().required("Agent Code is required"),
    rank: Yup.number().required("Rank is required"),
     name: Yup.string().required("name is required"),
    sponsor: Yup.number().required("Sponsor Code is required"),
     rankK: Yup.string().required("Rank By is required"),
    namee: Yup.number().required("Name is required"),
     max: Yup.string().required("Down MAX Rank  is required"),

    codee: Yup.number().required("Agent Code is required"),
     nameee: Yup.string().required("Agent Name is required"),
    min: Yup.number().required("Upline min Rank is required"),

    codeee: Yup.number().required("Agent Code is required"),
    nameeee: Yup.string().required("Agent Name is required"),
    branch: Yup.number().required("Branch Name is required"),
    rankKk: Yup.string().required("Rank is required"),
     cody: Yup.string().required(" Sponsor Code  is required"),
     ranky: Yup.string().required("Rank is required"),
     namy: Yup.string().required(" Name  is required"),


});

export default () => {
    const handleSubmit = (values) => {

        console.log(values);
    };


    return (
        <>
            <div className="ms-2 mt-3 fw-medium mb-3" style={{ fontSize: 25 }}>
                ASSOCIATE PROMOTION
            </div>

            <div className="container-fluid">
              
                <Formik
                    initialValues={{
                        code: "",
                        rank: "",
                        name: "",
                        sponsor: "",
                        rankK: "",
                        namee: "",
                        max: "",

                        codee: "",
                        nameee: "",
                        min: "",

                        codeee: "",
                        nameeee: "",
                        branch: "",
                        rankKk: "",
                        cody: "",
                        ranky: "",
                        namy:"",

                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="row mt-2 fw-bold">
                            <div className="">Search</div>
                            <div className="col-md-4 col-12">
                                <div className="mt-2">Agent Code</div>
                                <Field as="select" className="form-control mt-2" name="code">


                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="mt-2">Rank</div>
                                <Field className="form-control mt-2" name="rank"/>
                                {errors.code && touched.code ? (
                                    <div className="text-danger mt-1">{errors.code}</div>
                                ) : null}
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mt-2">Name</div>
                                <Field as="select" className="form-control mt-2" name="name">

                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="mt-2">Sponsor Code</div>
                                <Field className="form-control mt-2" name="sponsor"/>
                                {errors.code && touched.code ? (
                                    <div className="text-danger mt-1">{errors.code}</div>
                                ) : null}
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mt-2">Rank</div>
                                <Field as="select" className="form-control mt-2" name="rankk">


                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="mt-2">Name</div>
                                <Field className="form-control mt-2" name="namee"/>
                                {errors.code && touched.code ? (
                                    <div className="text-danger mt-1">{errors.code}</div>
                                ) : null}
                            </div>
                            <div className="mt-2">Downline/Upline Details</div>
                            <div className="col-md-4 col-12">
                                <div className="mt-2">Down Max Rank</div>
                                <Field as="select" className="form-control mt-2" name="max">


                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="mt-2">Agent Code</div>
                                <Field className="form-control mt-2" name="codee"/>
                                {errors.code && touched.code ? (
                                    <div className="text-danger mt-1">{errors.code}</div>
                                ) : null}
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mt-2">Agent Name</div>
                                <Field as="select" className="form-control mt-2" name="nameee">


                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="mt-2">Upline Min Rank</div>
                                <Field className="form-control mt-2" name="min"/>
                                {errors.code && touched.code ? (
                                    <div className="text-danger mt-1">{errors.code}</div>
                                ) : null}
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mt-2">Agent Code</div>
                                <Field as="select" className="form-control mt-2" name="codeee">

                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="mt-2">Agent Name</div>
                                <Field className="form-control mt-2" name="nameeee"/>
                                {errors.code && touched.code ? (
                                    <div className="text-danger mt-1">{errors.code}</div>
                                ) : null}
                            </div>
                            <div className="mt-2">Update/Promotion Agent Rank</div>
                            <div className="col-md-4 col-12">
                                <div className="mt-2">Service Branch</div>
                                <Field as="select" className="form-control mt-2" name="branch">


                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="mt-2">Rank Promotion</div>
                                <Field as="select" className="form-control mt-2" name="rankkk">


                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>


                            <div className="col-md-4 col-12">
                                <div className="mt-2">N.Sponsor Code</div>
                                <Field className="form-control mt-2" name="cody"/>
                                {errors.code && touched.code ? (
                                    <div className="text-danger mt-1">{errors.code}</div>
                                ) : null}
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mt-2">Rank</div>
                                <Field as="select" className="form-control mt-2" name="ranky">

                                </Field>
                                {errors.search && touched.search ? (
                                    <div className="text-danger mt-1">{errors.search}</div>
                                ) : null}
                            </div>

                            <div className="col-md-4 col-12">
                                <div className="mt-2">Sponsor Name</div>
                                <Field className="form-control mt-2" name="namy"/>
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


