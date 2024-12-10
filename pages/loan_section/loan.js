import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import React from "react";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

function calculateLoanDetailss(amount, type, interestRate, interestType, totalPeriods) {
    let finalAmount = 0;
    let totalInterest = 0;
    let periodicPayment = 0;
    let periodicDetails = [];

    if (type.toLowerCase() === 'flat') {
        // For flat interest, calculate total interest based on the entire principal
        totalInterest = (amount * interestRate * totalPeriods) / 100;
        finalAmount = amount + totalInterest;
        periodicPayment = finalAmount / totalPeriods;

        // Flat doesn't change each period
        for (let i = 1; i <= totalPeriods; i++) {
            periodicDetails.push({
                period: i,
                principal: (amount / totalPeriods).toFixed(2),
                interest: (totalInterest / totalPeriods).toFixed(2),
                totalPayment: periodicPayment.toFixed(2),
            });
        }
    } else if (type.toLowerCase() === 'reducing') {
        // For reducing interest, calculate periodic payment using reducing formula
        const ratePerPeriod = interestRate / 100; // Interest rate is for the specified period
        periodicPayment = amount * ratePerPeriod / (1 - Math.pow(1 + ratePerPeriod, -totalPeriods));
        finalAmount = periodicPayment * totalPeriods;

        let remainingAmount = amount;

        for (let i = 1; i <= totalPeriods; i++) {
            const interest = remainingAmount * ratePerPeriod;
            const principal = periodicPayment - interest;
            periodicDetails.push({
                period: i,
                principal: principal.toFixed(2),
                interest: interest.toFixed(2),
                totalPayment: periodicPayment.toFixed(2),
            });
            remainingAmount -= principal;
        }

        totalInterest = finalAmount - amount;
    } else {
        throw new Error("Invalid loan type. Choose 'flat' or 'reducing'.");
    }

    return {
        finalAmount: finalAmount.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        periodicPayment: periodicPayment.toFixed(2),
        periodicDetails: periodicDetails,
        mode: interestType,
    };
}
function calculateLoanDetails(amount, type, interestRate, interestType, totalPeriods) {
    if (typeof amount === "number" && typeof interestRate === "number" && typeof totalPeriods === "number") {

    } else {
        return {
            finalAmount: 0,
            totalInterest: 0,
            periodicPayment: 0,
            periodicDetails: [],
            mode: interestType,
        };
    }
    const daysPerYear = 360; // 30 days per month assumption
    let periodsPerYear=1;
    let periodicInterestRate = interestRate;

    // switch (interestType.toLowerCase()) {
    //     case 'weekly':
    //         periodsPerYear = 360 / 7; // Approx 52 weeks in a year
    //         periodicInterestRate = interestRate / periodsPerYear;
    //         break;
    //     case 'monthly':
    //         periodsPerYear = 12; // 12 months in a year
    //         periodicInterestRate = interestRate / periodsPerYear;
    //         break;
    //     case 'yearly':
    //         periodsPerYear = 1; // 1 period per year
    //         periodicInterestRate = interestRate;
    //         break;
    //     default:
    //         throw new Error('Invalid interestType. Use "weekly", "monthly", or "yearly".');
    // }

    const totalPeriodsFinal = totalPeriods;
    let finalAmount = 0;
    let totalInterest = 0;
    let periodicPayment = 0;
    let periodicDetails = [];

    if (type.toLowerCase() === 'flat') {
        totalInterest = (amount * interestRate * totalPeriodsFinal) / periodsPerYear;
        finalAmount = amount + totalInterest;
        periodicPayment = finalAmount / totalPeriodsFinal;
    } else if (type.toLowerCase() === 'reducing') {
        let remainingPrincipal = amount;
        for (let i = 1; i <= totalPeriodsFinal; i++) {
            const interestForPeriod = remainingPrincipal * periodicInterestRate;
            const principalForPeriod = amount / totalPeriodsFinal;
            const paymentForPeriod = interestForPeriod + principalForPeriod;

            periodicDetails.push({
                period: i,
                principal: principalForPeriod.toFixed(2),
                interest: interestForPeriod.toFixed(2),
                payment: paymentForPeriod.toFixed(2),
                remainingPrincipal: (remainingPrincipal - principalForPeriod).toFixed(2),
            });

            totalInterest += interestForPeriod;
            remainingPrincipal -= principalForPeriod;
        }

        finalAmount = amount + totalInterest;
        periodicPayment = (finalAmount / totalPeriodsFinal).toFixed(2);
    } else {
        throw new Error('Invalid type. Use "flat" or "reducing".');
    }


    return {
        finalAmount: finalAmount.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        periodicPayment: type.toLowerCase() !== 'reducing' ? periodicPayment.toFixed(2):0,
        periodicDetails: type.toLowerCase() === 'reducing' ? periodicDetails : [],
    }
}

// Example usage
// const result = calculateEMI(100000, 'reducing', 12, 'monthly', 12);
// console.log(result);
function calculateEMI(amount, type, interestRate,interestType, totalPeriods) {


    const monthlyRate = interestRate / 100; // Convert percentage to decimal
    const periodicDetails = [];
    let finalAmount = 0;
    let totalInterest = 0;
    let payment = 0;


    if (typeof amount === "number" && typeof interestRate === "number" && typeof totalPeriods === "number") {

    } else {
        return {
            finalAmount: 0,
            totalInterest: 0,
            periodicPayment: 0,
            periodicDetails: [],
            mode: interestType,
        };
    }

    if (type === 'flat') {
        // Flat interest calculation
        totalInterest = amount * monthlyRate * totalPeriods;
        finalAmount = amount + totalInterest;
        payment = finalAmount / totalPeriods;
    } else if (type === 'reducing') {
        // Reducing interest calculation
        let remainingPrincipal = amount;

        for (let i = 1; i <= totalPeriods; i++) {
            const interest = remainingPrincipal * monthlyRate;
            const principalComponent = (amount / totalPeriods);
            const monthlyPayment = interest + principalComponent;

            periodicDetails.push({
                interest: interest.toFixed(2),
                payment: monthlyPayment.toFixed(2),
                remainingPrincipal: remainingPrincipal.toFixed(2),
            });

            totalInterest += interest;
            remainingPrincipal -= principalComponent;
        }


        payment= type === 'flat'?payment.toFixed(2):0;
        // Initial payment as monthly payment
        finalAmount = amount + totalInterest;
    } else {
        throw new Error("Invalid type. Accepted values are 'flat' or 'reducing'.");
    }

    return {
        finalAmount: finalAmount.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        payment: type === 'flat'?payment.toFixed(2):0,
        interestType:interestType,
        type:type,

        periodicDetails: type === 'reducing' ? periodicDetails : null,
    };
}

// Example usage:
// const emiDetails = calculateEMI(50000, 'reducing', 1.5, 12);




const LoanResult = (prop) => {

        return <div className="card text-center shadow-sm mx-md-4 mt-5 m-md-0">
        <div className="card-header bg-primary text-white">
            <h5 className="m-0">Loan Calculation Results</h5>
        </div>
        <div className="card-body">

            <div className="d-flex justify-content-around">

                <p className="card-text">
                    <strong>Final Amount:</strong>
                    <br/>
                    <span id="finalAmount" className="text-success">{prop.data.finalAmount}</span>
                </p>
                <p className="card-text">
                    <strong>Total Interest:</strong>
                    <br/>
                    <span id="totalInterest" className="text-danger mt-2">{prop.data.totalInterest}</span>
                </p>



            </div>


        </div>
            <div className="card-footer bg-light text-muted w-100">

                {prop.data.type ==="flat" ?<>Every <span className="text-primary">{prop.data.interestType}</span> Have to Pay <span
                    className="text-primary">{prop.data.payment}</span></>:

                <table className="table table-bordered table-striped table-responsive">
                    <thead className="table-dark">
                    <tr>


                        <th>Interest</th>
                        <th>Payment</th>
                        <th>Remaining Principal</th>
                    </tr>
                    </thead>
                    <tbody>


                    {prop.data.periodicDetails?.map((vp, ind) =>
                        <tr>
                            <td>₹{vp.interest}</td>
                            <td>₹{vp.payment}</td>
                            <td>₹{vp.remainingPrincipal}</td>
                        </tr>

                  )}


                    </tbody>
                </table>}


            </div>
        </div>

}

export default () => {
    const validationSchema = Yup.object({
        branch: Yup.string().required("Branch is required"),
        from: Yup.string().required("Date is required"),
        date: Yup.string().required("Date is required"),
    });

    const handleSubmit = async (values, {resetForm}) => {
        try {
            const response = await fetch('/api/ma_mj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                resetForm()

                Swal.fire("Done", "Data submited", "success").then(o => {


                    // featchdata()


                })
            } else {
                console.error('Error submitting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };


    const docstype = {bank_stetment_2_year: {type: "file"}, bank_stetment_1_year: {type: "file"}}

    return <>

        <Formik
            initialValues={{

                parent: "",
                code: "",
                type: "",
                employer: "",
                customer: "",
                term: 0,
                rate: 1,
                ltype: true,
                amount: 0,
                tenure: 0,
                doc:{},
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors,values,setValues }) => <Form>

                <div className="row p-3 border border-1 shadow-sm rounded m-3">
                <div className="row col-md-7">
                    {/*<div className="col-md-4">*/}
                    {/*    <div>Loan ID</div>*/}
                    {/*    <Field className="form-control mt-2" name="code" placeholder="Loan ID"/>*/}
                    {/*    <ErrorMessage name="code" component="div" className="text-danger mt-2"/>*/}
                    {/*</div>*/}
                    {/*<div className="col-md-4">*/}
                    {/*    <div>Agent ID</div>*/}
                    {/*    <Field className="form-control mt-2" name="code" placeholder="Agent ID"/>*/}
                    {/*    <ErrorMessage name="code" component="div" className="text-danger mt-2"/>*/}
                    {/*</div>*/}
                    <div className="col-md-6">
                        <div>Loan Amount</div>
                        <Field className="form-control mt-2" name="amount" placeholder="Amount"/>
                        <Field className="w-100" type="range" name="amount" placeholder="Amount" max="100000"
                               min="1000"/>

                        <ErrorMessage name="amount" component="div" className="text-danger mt-2"/>

                    </div>
                    <div className="col-md-6">
                        <div>Loan Time in ({values.tenure == 0 ? "Month" : values.tenure == 1 ? "Week" : "Year"})</div>
                        <Field className="form-control mt-2" name="term" placeholder="Term"/>
                        <Field className="w-100" type="range" name="term" placeholder="Amount"
                               max={values.tenure == 0 ? "100" : values.tenure == 1 ? "500" : "10"}
                               min="1"/>

                        <ErrorMessage name="amount" component="div" className="text-danger mt-2"/>

                    </div>
                    <div className="col-md-6">
                        <div>Loan Rate %</div>
                        <Field className="form-control mt-2" name="rate" placeholder="Rate  %"  type={"number"}/>
                        <Field className="w-100" type="range" name="rate" placeholder="Rate" max="100"
                               min="0"/>

                        <ErrorMessage name="amount" component="div" className="text-danger mt-2"/>

                    </div>
                    <div className="col-md-6">
                        <div>LOAN Tenure</div>

                        <div className="btn-group mt-2 w-100" role={"group"}>
                            <div className={`btn  ${values.tenure === 1 ? "btn-primary" : "btn-outline-primary"}`}
                                 onClick={(u) => {


                                     setValues({...values, tenure: 1});


                                 }}>

                                Weekly
                            </div>
                            <div className={`btn  ${values.tenure === 0 ? "btn-primary" : "btn-outline-primary"}`}
                                 onClick={(u) => {

                                     setValues({...values, tenure: 0});

                                 }}>

                                Monthly
                            </div>
                            <div className={`btn  ${values.tenure === 2 ? "btn-primary" : "btn-outline-primary"}`}
                                 onClick={(u) => {

                                     setValues({...values, tenure: 2});

                                 }}>

                                Yearly
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6">
                        <div>LOAN Type</div>

                        <div className="btn-group mt-2 w-100" role={"group"}>
                            <div className={`btn  ${values.ltype ? "btn-primary" : "btn-outline-primary"}`}
                                 onClick={(u) => {


                                     setValues({...values, ltype: true});


                                 }}>

                                Flat
                            </div>
                            <div className={`btn  ${!values.ltype ? "btn-primary" : "btn-outline-primary"}`}
                                 onClick={(u) => {

                                     setValues({...values, ltype: false});

                                 }}>

                                Reducing
                            </div>


                        </div>

                    </div>



                </div>

                    <div className="col-md-5">





<LoanResult data={calculateEMI(values.amount, values.ltype?"flat":'reducing', values.rate, values.tenure===0?'Monthly':values.tenure===1?"Weekly":"Yearly", values.term)}/>


                    </div>

                </div>


            </Form>}

        </Formik>


    </>
}

