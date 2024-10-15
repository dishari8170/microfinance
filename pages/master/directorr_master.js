import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UploadX from "@/Comp/UploadX";

export default () =>{

    const [submittedData, setSubmittedData] = useState([]);
    const [getdata, setdata] = useState({
        director_name: "",
        appointment_date: "",
        din_no: "",
        registration_date: "",
        share_amount: "",
        pay_mode: "",
        cheque_no: "",
        cheque_bank: "",
        no_of_share: "",
        pay_date: "",
        cheque_date: "",
        abx:"dp.png",

        to_account: "",
    });

    const featchdata = async () => {
        let datt = await axios.get("/api/directorrss")

        setSubmittedData(datt.data)
    }


    useEffect(()=>{

        featchdata()
    },[])

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch('/api/directorrss', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {


                Swal.fire("Done","Data submited","success").then(o=>{


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
        <>
            <div className="container">
                <div className="btn btn-danger" onClick={y=>{
                    setdata({
                        director_name: "dff",
                        appointment_date: "",
                        din_no: "",
                        registration_date: "",
                        share_amount: "",
                        pay_mode: "",
                        cheque_no: "",
                        cheque_bank: "",
                        no_of_share: "",
                        pay_date: "",
                        cheque_date: "",
                        abx:"dp.png",

                        to_account: "",
                    })

                }}>raju</div>
                <div className="h5">Director Master</div>
                <Formik

                    enableReinitialize={true}
                    initialValues={getdata}
                    // initialValues={{
                    //     director_name: "",
                    //     appointment_date: "",
                    //     din_no: "",
                    //     registration_date: "",
                    //     share_amount: "",
                    //     pay_mode: "",
                    //     cheque_no: "",
                    //     cheque_bank: "",
                    //     no_of_share: "",
                    //     pay_date: "",
                    //     cheque_date: "",
                    //     abx:"dp.png",
                    //
                    //     to_account: "",
                    // }}
                    onSubmit={handleSubmit}


                >
                    {({values, resetForm}) => (
                        <Form>
                            <div className="row">
                                <div className="col-md-6 mb-2  ">
                                    <div>Director Name</div>
                                    <Field className="form-control mt-2 " name="director_name"/>
                                </div>
                                <div className="col-md-6 mb-2 ">
                                    <div>Appointment Date</div>
                                    <Field className="form-control mt-2" name="apointtment_date"/>
                                </div>
                                <div className="col-md-6 mb-2 ">
                                    <div>DIN NO</div>
                                    <Field className="form-control mt-2" name="din_no"/>
                                </div>


                                <div className="col-md-6 mb-2 ">
                                    <div>Registration Date</div>
                                    <Field className="form-control mt-2" name="registration_date"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="h5">Share Details</div>
                                <div className="col-md-6 mb-2 ">
                                    <div>Share Amount</div>
                                    <Field className="form-control mt-2" name="share_amount"/>
                                </div>
                                <div className="col-md-6 mb-2 ">
                                    <div>Pay Mode</div>
                                    <Field className="form-control mt-2" name="pay_mode"/>
                                </div>
                                <div className="col-md-6 mb-2 ">
                                    <div>Cheque No</div>
                                    <Field className="form-control mt-2" name="cheque_no"/>
                                </div>
                                <div className="col-md-6 mb-2 ">
                                    <div>Cheque Bank</div>
                                    <Field className="form-control mt-2" name="cheque_bank"/>
                                </div>
                                <div className="col-md-6 mb-2 ">
                                    <div>No Of Share</div>
                                    <Field className="form-control mt-2" name="no_of_share"/>
                                </div>
                                <div className="col-md-6 mb-2 ">
                                    <div>Pay Date</div>
                                    <Field className="form-control mt-2" name="pay_date"/>
                                </div>
                                <div className="col-md-6 mb-2 ">
                                    <div>Cheque Date</div>
                                    <Field className="form-control mt-2" name="cheque_date"/>
                                </div>
                                <div className="col-3">
                                    fole


                                    {/*<UploadX cb={e=>{*/}
                                    {/*    values.abx=e*/}
                                    {/*}}  df={ values.abx} />*/}



                                </div>
                                <div className="col-md-6 mb-2 ">
                                    <div>To A/C</div>
                                    <Field className="form-control mt-2" name="to_account"/>
                                </div>
                                <div className="text-end mt-3">
                                    <div>
                                        <button className="btn px-5 btn-success" type="submit">
                                            {values._id?"update":"save"}
                                        </button>
                                        <button className="btn px-5 ms-2 btn-warning text-white" type="button"

                                                onClick={() => {


                                                    resetForm();
                                                }}

                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>)}
                </Formik>


                <div className="row">




                </div>


                <h3>Director List:</h3>
                <ul>
                    {submittedData.map((data, index) => (
                        <li key={index} onClick={y=>{
                            setdata(data)
                        }}>


                            <strong>Director Name:</strong> {data.director_name} <br/>
                            <strong>Appointment Date:</strong> {data.appointment_date} <br/>
                            <strong>DIN No:</strong> {data.din_no} <br/>
                            <strong>Registration Date</strong> {data.registration_date} <br/>
                            <strong>Share Amount:</strong> {data.share_amount} <br/>
                            <strong>Pay Mode:</strong> {data.pay_mode} <br/>
                            <strong>Cheque No:</strong> {data.cheque_no} <br/>
                            <strong>Cheque Bank:</strong> {data.cheque_bank} <br/>
                            <strong>:No_Of_Share</strong> {data.no_of_share} <br/>
                            <strong>:pay_date</strong> {data.pay_date} <br/>
                            <strong>Cheque Date:</strong> {data.cheque_date} <br/>
                            <strong>:To A/C</strong> {data.to_account} <br/>
                            <hr/>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    );


}