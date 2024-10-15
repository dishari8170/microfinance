import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react"; // Import useState for managing state

// Validation schema for form fields
const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
    mode: Yup.string().required("Mode is required"),
    roi: Yup.number().required("ROI(%) is required").positive().min(0),
    amount: Yup.number().required("Amount is required").positive().min(1),
    term: Yup.number().required("Term is required").positive().min(1),
});

export default () => {
    const [emi, setEmi] = useState(); // State to hold the calculated EMI

    const handleSubmit = (values) => {
        const { roi, amount, term } = values;
        const monthlyRate = roi / 100 / 12;
        const emiCalculated = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
        setEmi(emiCalculated.toFixed(2)); // Update the EMI state
    };

    return (
        <>
            <div className="ms-2 mt-3 fw-medium mb-3" style={{ fontSize: 25 }}>
                Loan Calculator
            </div>

            <div className="container w-60">
                <Formik
                    initialValues={{
                        type: "",
                        mode: "",
                        roi: "",
                        amount: "",
                        term: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="row mt-2 fw-bold">
                            <div className="col-12">
                                <div className="mt-2">Calculation Type</div>
                                <Field as="select" className="form-control mt-2" name="type">
                                    <option value="">Select Type</option>
                                    <option value="personal">Personal Loan</option>
                                    <option value="home">Home Loan</option>
                                    {/* Add more options as needed */}
                                </Field>
                                {errors.type && touched.type && (
                                    <div className="text-danger mt-1">{errors.type}</div>
                                )}
                            </div>
                            <div className="col-12">
                                <div className="mt-2">Loan Mode</div>
                                <Field className="form-control mt-2" name="mode" />
                                {errors.mode && touched.mode && (
                                    <div className="text-danger mt-1">{errors.mode}</div>
                                )}
                            </div>
                            <div className="col-12">
                                <div className="mt-2">ROI(%)</div>
                                <Field className="form-control mt-2" name="roi" type="number" />
                                {errors.roi && touched.roi && (
                                    <div className="text-danger mt-1">{errors.roi}</div>
                                )}
                            </div>
                            <div className="col-12">
                                <div className="mt-2">Loan Amount</div>
                                <Field className="form-control mt-2" name="amount" type="number" />
                                {errors.amount && touched.amount && (
                                    <div className="text-danger mt-1">{errors.amount}</div>
                                )}
                            </div>
                            <div className="col-12">
                                <div className="mt-2">Term (Months)</div>
                                <Field className="form-control mt-2" name="term" type="number" />
                                {errors.term && touched.term && (
                                    <div className="text-danger mt-1">{errors.term}</div>
                                )}
                            </div>
                            <div className="col-12">
                                <div className="mt-2">Calculated EMI</div>
                                <input
                                    className="form-control mt-2"
                                    value={emi} // Use the state value for EMI
                                    readOnly
                                />
                            </div>

                            <div className="text-end mt-4 col-12">
                                <button className="btn px-5 btn-success" type="submit">
                                    Calculate
                                </button>
                                <button className="btn px-5 ms-2 text-white btn-warning" type="reset">
                                    Clear
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};
