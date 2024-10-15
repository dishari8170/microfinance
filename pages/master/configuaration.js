import { Field, Form, Formik } from "formik";

export default () => {
    return (
        <>
            <div className="container-fluid">
                <Formik
                    initialValues={{
                        allot: "",
                        under: "",
                        balance: "",
                        member: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {() => (
                        <Form>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="fw-medium ">Director/Promoter</div>
                                    <div className="row fw-medium">
                                        <div className="col-12 mt-2 ">
                                            Allot From
                                            <Field className="form-control mt-2" name="allot" />
                                        </div>
                                        <div className="col-12">
                                            Under Director
                                            <Field className="form-control mt-2" name="under" />
                                        </div>
                                        <div className="col-12">
                                            Balance
                                            <Field className="form-control mt-2" name="balance" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 ">
                                    <div className="fw-medium ">Share Values</div>

                                    <div className="col-12  fw-medium mt-2">
                                        Member Join
                                        <Field className="form-control mt-2" name="member" />
                                    </div>
                                    
                                    </div>
                            </div>
                            <div className="text-end mt-3">
                                <button className="btn px-5 btn-success" type="submit">
                                    SET
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};
