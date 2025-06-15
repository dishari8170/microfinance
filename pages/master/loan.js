import React, {useEffect, useState} from "react";
import axios from "axios";
import {dh} from "@/lib/Dh";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import {FaCheckCircle, FaRecycle, FaStar, FaTrashAlt} from "react-icons/fa";

import {Field, Form, Formik} from "formik";
import {Modal} from "react-bootstrap";


export default function Loan() {

    const today = new Date();
    const otoday = new Date();
    //
    const [accountClose, setaccountclose] = useState([]);
    const [selectacc, setselectacc] = useState({});

    const [getc, setc] = useState(0);
    const [getudat, setudat] = useState([]);
    const pro = "code,name,parent,phone,photo,email";

    const [searchtext, setserchtext] = useState("");
    const [xdilog, setDilog] = useState(false);
    const [xdilogamt, clloseamt] = useState(0);
    const [cat, setcat] = useState("name");





    // saving loan state

    const [savingAccLoan, setSavingAccLoan] = useState({});


    // saving loan state


    async function closeacc(accid, intres, agent) {
        await axios.get("/api/saving?close=" + accid + "&rate=" + intres + "&agent=" + agent).then(value => {


            setaccountclose(value.data);


        })
    }


    const showdatax = (datap) => {

        console.log("xxx")
        const dmt = datap.length;
        if (dmt === 0) return ""
        const amtd = datap[0].amount ?? 0;
        const instraess = datap.reduce((accumulator, currentValue) => accumulator + Number.parseFloat(currentValue.simple_interest?.toFixed(2)), 0);

        const totalg = ((amtd * dmt) + instraess).toFixed(2);

        clloseamt(totalg);
        return <div className="card mt-5 fw-bold">

            <div className="card-header">Total</div>

            <div className="card-body">
                Installment Amount = {amtd}
                <br/>

                Total Installment = {dmt}
                <br/>


                Total Interest = {instraess}


            </div>
            <div className="card-footer">


                Final Amount = ( Amount x Installment ) + Total Interest

                <br/>
                == {totalg}


            </div>

        </div>


    }

    function loaddataU(s = "0") {

        axios.get("/api/loan?limit=10&skip=" + s + "&search=" + searchtext + "&on=" + cat).then(value => {

            setc(value.data.total);

            setudat(value.data.data);


        })

    }

    const router = useRouter();

    useEffect(() => {
        loaddataU()
        today.setDate(today.getDate() + 5)
    }, []);


    const [showx, setshowx] = useState(false);


    function calculateMonthlyPayment(a, b, c) {


        try {


            const monthlyInterestRate = c / 12;
            const numerator = a * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, b);
            const denominator = Math.pow(1 + monthlyInterestRate, b) - 1;

            if (denominator === 0) {
                return "";
            }
            return numerator / denominator;
        }
catch (e) {

            return ""
}
    }


    const docs = (typex) => {

        switch (typex) {
            case "personal":[""]

        }
    }

    return <>


        <Modal backdrop="static" keyboard={false} fullscreen={true} show={xdilog} centered={true} className="">
            <Modal.Header className="bg-dark text-white">
                <Modal.Title>Saving Account Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark overflow-y-scroll" style={{color: "white"}}>


                <table className="table  table-striped table-bordered align-items-center table-dark text-center">

                    <thead>
                    <tr>
                        <th>
                            Deposit Date

                        </th>
                        <th>
                            Interest time (days)

                        </th>
                        <th>
                            Interest

                        </th>


                    </tr>

                    </thead>
                    <tbody>

                    {accountClose.map((d) => {


                        const tg = (otoday - new Date(d.createdAt)) / (1000 * 60 * 60 * 24);


                        return <tr className="tr">

                            <td>{new Date(d.createdAt).toLocaleString()}</td>


                            <td>{tg.toFixed(2)}</td>

                            <td>{d.simple_interest.toFixed(2)}</td>

                        </tr>
                    })}


                    </tbody>


                </table>


                <div className="">

                    <div className="card mt-5 fw-bold">

                        <div className="card-header">Total</div>

                        <div className="card-body">
                            Installment Amount = {accountClose[0]?.amount ?? 0}
                            <br/>

                            Total Installment = {accountClose.length}
                            <br/>


                            Total Interest
                            = {accountClose.reduce((accumulator, currentValue) => accumulator + Number.parseFloat(currentValue.simple_interest?.toFixed(2)), 0)

                        }


                        </div>
                        <div className="card-footer">


                            Final Amount = ( Amount x Installment ) + Total Interest

                            <br/>
                            {/*== {totalg}*/}
                            = {((accountClose[0]?.amount ?? 0) * accountClose.length) + accountClose.reduce((accumulator, currentValue) => accumulator + Number.parseFloat(currentValue.simple_interest?.toFixed(2)), 0)}

                        </div>

                    </div>
                </div>


            </Modal.Body>
            <Modal.Footer className="bg-dark text-white ">

                <div className="btn btn-danger" onClick={(i) => {


                    const amtx = ((accountClose[0]?.amount ?? 0) * accountClose.length) + accountClose.reduce((accumulator, currentValue) => accumulator + Number.parseFloat(currentValue.simple_interest?.toFixed(2)), 0)


                    const fxs = accountClose[0] ?? {}
                    setshowx(false);

                    Swal.fire({


                        title: "Confirm..?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: `Give ₹ ${amtx.toFixed(2)}`,
                        showLoaderOnConfirm: true,

                        async preConfirm(value) {


                            await axios.get("/api/saving?rajuxy=" + fxs.to + "&amt=" + (amtx.toFixed(2)) + "&agent=" + fxs.agent + "&mem=" + fxs.member)

                        },


                    }).then(u => {
                        if (u.isConfirmed) {


                            Swal.fire({


                                title: "Account Closed",
                                icon: "success",
                            })


                                .then(rr => {

                                    window.location.reload();

                                })
                        }
                    })
                }}

                >
                    Close Account
                </div>
                <div className="btn btn-secondary" onClick={(i) => setDilog(false)}>
                    Dismiss
                </div>


            </Modal.Footer>
        </Modal>


        <div className="card p-3 mb-3">
            <div className="p-4 mb-3 rounded text-white card" style={{backgroundColor: "#1a75a9"}}>
                <div className="h3">Add New Loan Account</div>
            </div>
            <Formik initialValues={{
                member: "",
                type: "",
                amount: "",
                days: 180,
                date: Date.now(),
                t: "ac"


            }} onSubmit={(values) => {

                Swal.fire({
                    title: "Are You Sure",

                    showCancelButton: true,
                    confirmButtonText: "Confirm",
                    showLoaderOnConfirm: true,
                    preConfirm: async (login) => {

                        await axios.post("/api/loan", values)

                    }

                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({title: "Done", html: "Account Created Successfully", icon: "success",}).then(rr => {

                            window.location.reload();

                        })
                    }

                })

            }}>
                {({resetForm, values, setValues, errors, submitForm}) => <Form>


                    <div className="">Member Id</div>
                    <Field name="member" className={"mb-2 form-control"}/>

                    <div className="">Select Loan type</div>
                    <Field as="select" name="type"
                           className="form-control mt-2"
                           onChange={async (e) => {


                        if (e.target.value === "saving") {


                            if (e.target.parentElement.childNodes[1].value) {

                                dh.loadx(true);

                                const accountList = (await axios.get("/api/loan?getallsavingac=" + e.target.parentElement.childNodes[1].value)).data






                                dh.loadx(false);


                                if (accountList.length > 0) {




                                    Swal.fire({
                                        icon: "question",
                                        input: 'select',
                                        showCancelButton:true,


                                        inputOptions:accountList.map((item,index) => {

                                            return {[index]:`${item.code}--->${item.name}---${item.amount *10}`}

                                        })

                                    }).then(async u => {

                                        if (u.isConfirmed) {


                                            setSavingAccLoan(accountList[u.value])
                                            await setValues({
                                                type: "saving",

                                                name:accountList[u.value].name,
                                                phone:accountList[u.value].phone,
                                                doc:{ saving: accountList[u.value].code}
                                               ,
                                                agent: accountList[u.value].agent,
                                                member:e.target.parentElement.childNodes[1].value,
                                                days: 180,
                                                date: Date.now(),
                                                t: "ac"

                                            })

                                            e.target.value="saving";

                                        }
                                    })

                                } else {


                                    Swal.fire({title: "Member has no Saving account", icon: "warning"})
                                    await setValues({
                                        type: "",

                                    })
                                }


                            } else {


                                Swal.fire({title: "Please input a Member id", icon: "warning"})

                                await setValues({
                                    type: "",

                                })

                            }


                        } else if (e.target.value === "saving"){


                        }
                        else
                        {


                            await setValues({
                                type: "",

                            })
                        }






                    }

                    }>
                        <option value={""}>Loan Type</option>
                        <option value={"saving"}>Saving Loan</option>
                        <option value={"single"}>Single Loan</option>
                        <option value={"business"}>Business Loan</option>
                        <option value={"personal"}>Personal Loan</option>
                    </Field>

                    {values.type === "saving" ? <>
                        <div className="mt-2 mb-1">Saving Account</div>

                        <Field name="doc.saving" className={"mb-2 form-control"} disabled/>

                    </> : ""}


                    {values.type !==""? <div className={"card my-3"}>

                        <div className="card-header fw-bold">Personal Details </div>

                        <div className="card-body">
                        <div className="mt-2 mb-1">Member Name</div>

                        <Field name="name" className={"mb-2 form-control"} disabled/>

                        <div className="mt-2 mb-1">Member Phone</div>

                        <Field name="phone" className={"mb-2 form-control"} disabled/>

                        </div>

                    </div> : ""}


                    <div className="">Loan Date</div>
                    <Field name="date" type={"date"} className={"mb-2 form-control"}/>

                    <div className="">Select Term</div>

                    { values.type === "saving" ? <div className={"row"}>

                        <div className="col-4">
                        <Field name="days"
                            className="form-control mt-2">


                        </Field></div>  <div className="col-4">
                            Days
                        <Field name="rate"
                            className="form-control mt-2">


                        </Field>


                    </div>

                            <div className="col-4">


                                {calculateMonthlyPayment(values.amount,values.days,values.rate)}



                    </div>
                    </div>

                        :""}
                    <div className="mt-2">Amount</div>
                    <Field name="amount" className={"mb-2 form-control"}/>

                    <div className="card mb-3">
                        
                        <div className="card-header fw-bold">Bank Information</div>

                        <div className="card-body">
                            <div className="">Bank Name</div>


                            <Field  name="bank.name"
                                   className="form-control mt-1">

                            </Field>
                            <div className="mt-2 mb-1">Account Number</div>


                            <Field name="bank.ac" className={"mb-2 form-control"}/>

                            <div className="mt-2 mb-1">Beneficiary Name</div>

                            <Field name="bank.ben" className={"mb-2 form-control"}/>


                            <div className="mt-2 mb-1">IFSC Code</div>

                            <Field name="bank.ifsc" className={"mb-2 form-control"}/>


                        </div>
                    </div>

                    <div className="btn btn-primary" onClick={submitForm}>Add New Loan Account</div>


                </Form>}


            </Formik>

        </div>


        <div className="bg-white shadow-sm card">
            <div className="px-4 py-3">
                <div className="row py-4 rounded " style={{backgroundColor: "#1a75a9"}}>
                    <div className="col-md-3">
                        <input className="form-control" placeholder="Text To Search" onChange={i => {

                            setserchtext(i.target.value)

                        }}/></div>
                    <div className="col-md-3">
                        <select className="form-control my-2 my-lg-0" onChange={i => {

                            setcat(i.target.value)
                        }}>
                            {pro.split(",").map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}


                        </select>
                    </div>


                    <div className="col-md-3 col-6">
                        <div className="btn btn-primary" onClick={u => {


                            loaddataU()


                        }}>
                            Search
                        </div>
                    </div>

                    <div className="col-md-3 col-6 ">

                        <div className="d-none d-lg-flex  float-end h2 text-white "><FaStar className="me-2"/>Savings
                        </div>


                    </div>

                </div>
            </div>

            <div className="table-responsive px-lg-3 mx-3 m-lg-0">

                <table className="table text-center align-middle table-striped table-bordered ">
                    {/*A/C No.  Name.  Mem.Id.     Agnt.Id. Pay.Date Pay.Amt Total*/}
                    <thead>
                    <tr>
                        <th scope="col">A/C No.</th>


                        <th scope="col">Name.</th>
                        <th scope="col">Term.</th>
                        <th scope="col">Mem.Id.</th>
                        <th scope="col">Phone.</th>
                        <th scope="col">Pay.Date</th>
                        <th scope="col">Pay.Amt</th>
                        <th scope="col">Late Fee</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>


                    </tr>
                    </thead>
                    <tbody>


                    {getudat.map((data, index) => {

                        const datx = new Date(data.date);


                        const isNormalx = (today - datx) / (1000 * 60 * 60 * 24);


                        // const otoday=Date.now();
                        const term = ((otoday - (new Date(data.createdAt))) / (1000 * 60 * 60 * 24)).toFixed(2)


                        const isNormal = data.isNormal ? isNormalx > 70 ? 2 : isNormalx > 35 ? 3 : isNormalx > 5 ? 1 : 0 : 2;


                        const due = data.isNormal ? ((datx < today) ? (isNormal === 1 ? data.amount * 0.05 : data.amount * 0.1).toFixed(2) : 0) : 0;


// const  dy1= isNormal ((due/isNormalx)*30);

                        const amt = data.amount;

// const duex= isNormalx===2?0:isNormalx>30 ? (due ).toFixed(2):0;

                        return <tr key={index}>


                            <td className="fw-bold">{data.code}</td>
                            {/*<td className="fw-bold">{isNormal}</td>*/}


                            <td className="fw-bold text-white"
                                style={{backgroundColor: data.isActive ? isNormal === 2 ? "red" : isNormal === 1 ? "#f2691e" : isNormal === 0 ? "indigo" : "maroon" : "black"}}>{data.name}


                                {/*((data.isActive?isNormal===0:data.isNormal )*/}
                                {/*// <p className="text-success d-inline">Regular</p> : <p className="text-danger d-inline">Irregular</p>})*/}
                            </td>

                            <td className="fw-bold" style={{
                                backgroundColor: term > data.days ? "green" : "red",
                                color: "white"
                            }}> {term + " of " + data.days}</td>

                            <td><a href={"/master/user?role=Member&code=" + data.member}> {data.member}</a></td>
                            <td><a href={"/master/user?role=Agent&code=" + data.agent}>{data.phone}</a></td>

                            <td>{new Date(data.date).toLocaleDateString()}</td>

                            <td className="fw-bold">{amt}

                            </td>
                            <td className="fw-bold">{data.isNormal && (isNormal === 1 || isNormal === 3) ? due : 0}
                            </td>
                            <td className="fw-bold">{data.total}</td>
                            <td className="flex-wrap h2">


                                {data.isActive ? <>
                                    <FaCheckCircle className="text-success" onClick={i => {

                                        Swal.fire({


                                            title: "Do You Want to Close This Account..?",
                                            icon: "question",
                                            showCancelButton: true,
                                            // confirmButtonText: `Give ₹${(Number.parseFloat(data.total) + (data.total * 0.07 * ((today - new Date(data.createdAt)) / (1000 * 60 * 60 * 24 * 365)))).toFixed(2)}`,
                                            showLoaderOnConfirm: true,


                                            async preConfirm(value) {


                                                await closeacc(data.code, isNormal === 2 ? 5 : 7.5, data.agent);

                                                // await axios.get("/api/saving?close=" + data.code)

                                            },


                                        }).then(u => {
                                            if (u.isConfirmed) {


                                                setDilog(true)


                                            }
                                        })

                                    }}/>
                                    <FaRecycle className="text-primary mx-3" onClick={e => {
                                        //
                                        // let day5=new Date()
                                        // day5.setDate(day5.getDate()+5);
                                        //
                                        // let h= new Date(data.date) < day5

                                        Swal.fire({


                                            title: `Accept Payment..?${isNormal}-->${due}`,
                                            icon: "question",
                                            showCancelButton: true,
                                            confirmButtonText: `Pay ₹${data.amount}`,
                                            showLoaderOnConfirm: true,
                                            showDenyButton: isNormal === 1 || isNormal === 3,
                                            denyButtonText: `Pay With Due ₹${due} `,
                                            async preDeny(value) {

                                                await axios.get("/api/saving?code=" + (data.code) + "&pay=" + amt + "&due=" + due + "&isNormal=" + isNormal + "&agent=" + data.agent + "&mem=" + data.member + "&phone=" + data.phone)

                                            },


                                            preConfirm: async (login) => {


                                                await axios.get("/api/saving?code=" + (data.code) + "&pay=" + amt + "&isNormal=" + (data.isNormal && (isNormal === 1 || isNormal === 3) ? 2 : 0) + "&agent=" + data.agent + "&mem=" + data.member + "&phone=" + data.phone)

                                            }

                                        }).then((result) => {
                                            if (!result.isDismissed) {
                                                Swal.fire({
                                                    title: "Done",
                                                    html: "Account Update Successfully",
                                                    icon: "success",
                                                }).then(rr => {

                                                    window.location.reload();

                                                })
                                            }

                                        })
                                    }}/>
                                    <FaTrashAlt className="text-danger mx-3" onClick={(e) => Swal.fire({


                                        title: "Are You Sure",

                                        showCancelButton: true,
                                        confirmButtonText: "Confirm",
                                        showLoaderOnConfirm: true,
                                        preConfirm: async (login) => {

                                            await axios.delete("/api/saving?raju=x&code=" + data.code + "&agent=" + data.agent + "&phone=" + data.phone)

                                        }

                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            Swal.fire({
                                                title: "Done",
                                                html: "Account Deleted Successfully",
                                                icon: "success",
                                            }).then(rr => {

                                                window.location.reload();

                                            })
                                        }


                                    })}/>
                                </> : <>
                                    <div className="btn btn-danger">Account CLosed</div>

                                    <FaTrashAlt className="text-danger mx-3" onClick={(e) => Swal.fire({


                                        title: "Are You Sure",

                                        showCancelButton: true,
                                        confirmButtonText: "Confirm",
                                        showLoaderOnConfirm: true,
                                        preConfirm: async (login) => {

                                            await axios.delete("/api/saving?raju=x&code=" + data.code + "&agent=" + data.agent + "&phone=" + data.phone)

                                        }

                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            Swal.fire({
                                                title: "Done",
                                                html: "Account Deleted Successfully",
                                                icon: "success",
                                            }).then(rr => {

                                                window.location.reload();

                                            })
                                        }


                                    })}/></>}
                            </td>
                        </tr>;
                    })}


                    </tbody>
                </table>
            </div>
        </div>
        <div className="d-flex justify-content-center align-middle mt-4">
            <ul className="pagination">

                {[...Array(Math.ceil(getc / 10))].map((_, index) => {
                    return <li className={"page-item"} key={index}>
                        <div className="page-link " style={{cursor: "pointer"}} onClick={y => {

                            const up = document.getElementById("loadingx")
                            up.style.display = "flex";
                            // loaddataU(index * 10);


                        }}>{index * 10}</div>
                    </li>
                })}


            </ul>


        </div>
    </>
}