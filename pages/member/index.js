import { DateRangePicker } from 'react-date-range';
import React, {useEffect, useState} from "react";
import { addYears} from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import {DateRange} from "react-date-range";
import axios from "axios";
import {FaCalendarAlt, FaEye, FaHandsHelping, FaMoneyBill, FaPiggyBank} from "react-icons/fa";
import {Modal} from "react-bootstrap";
import {dh} from "@/lib/Dh"; // theme css file


export default function Member() {
    const otoday = new Date();

    const [daterange, setDaterange] = useState([
        {
            startDate: addYears(new Date(), -1),
            endDate: new Date() ,
            key: 'selection'
        }
    ]);

    const [data,setdata]=useState([])


    function gotData() {

        axios.get("/api/agent?info=1").then(value => {


            setInfo(value.data)


        })

        axios.get("/api/agent?mdx=1").then(value => {


            setInfox(value.data)


        })

    }


    function loaddataU(s = "0") {



        axios.get("/api/member?start="+daterange[0].startDate.toISOString()+"&end="+daterange[0].endDate.toISOString()).then(value => {


            setdata(value.data)

        })





    }
    const [xdilog,setxdilog]=useState(false)
    const [xdilogdate,setxdilogdate]=useState(false)
    const [info,setInfo]=useState({})
    const [infox,setInfox]=useState({})

    useEffect(()=>{
        loaddataU()
        gotData()
    },[])
    return <>

        {/*

        <div className="vh-100 position-relative vw-100 d-flex justify-content-center  align-items-center ">


            <div className="position-absolute top-0  bg-dark   start-0 vw-100 vh-100 opacity-25"></div>

            <div className="card p-lg-4  rounded-3 position-absolute ">

                <div className="card-body">
                   
                    <div className="d-lg-none">

                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDaterange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={daterange}
                        />
                    </div>
                   <div className="d-none d-lg-block">
                    <DateRangePicker
                        onChange={item => setDaterange([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={daterange}
                        className={""}
                        direction="horizontal"
                    />

                </div>

                    <div className="d-flex justify-content-around align-items-center">


                        <div className="btn btn-danger">

                            Close
                        </div>
                        <div className="btn btn-primary " onClick={r=>{
                            loaddataU();
                        }}>

                            Update


                        </div>


                    </div>

                </div>


            </div>


        </div>


*/}



        <Modal backdrop="static" keyboard={false} show={xdilog} centered={true} className="">
            <Modal.Header className="bg-dark text-white" >
                <Modal.Title>Account Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark overflow-y-scroll" style={{color: "white"}}>

                <div className="text-center mb-2">

                    <img src={dh.ImUrl+ (info.photo??"dp.png")} className="rounded" height={200} alt=""/>

                    <div className=""><b>SuperVisor : </b> {info.name}</div>
                    <div className=""><b>Phone Number : </b> {info.phone}</div>
                    <div className=""><b>Address : </b> {info.presentAddress}</div>



                </div>

            </Modal.Body>
            <Modal.Footer className="bg-dark">

                <div className="btn btn-primary" onClick={()=>setxdilog(false)}>Close</div>
            </Modal.Footer>
        </Modal>








        <Modal backdrop="static"  keyboard={false} fullscreen={true} show={xdilogdate} centered={true} className="">


            <Modal.Body className="bg-dark overflow-y-scroll" style={{color: "white"}}>

                <div className="vh-100  bg-transparent position-relative vw-100 d-flex justify-content-center  align-items-center">

                    <div className="card p-lg-4  rounded-3 position-absolute ">

                        <div className="card-body">

                            <div className="d-lg-none">

                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDaterange([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={daterange}
                                />
                            </div>
                            <div className="d-none d-lg-block">
                                <DateRangePicker
                                    onChange={item => setDaterange([item.selection])}
                                    showSelectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    months={2}
                                    ranges={daterange}
                                    className={""}
                                    direction="horizontal"
                                />

                            </div>

                            <div className="d-flex justify-content-around align-items-center">


                                <div className="btn btn-danger" onClick={p=>setxdilogdate(false)}>

                                    Close
                                </div>
                                <div className="btn btn-primary " onClick={r => {


                                    setxdilogdate(false)

                                    loaddataU();
                                }}>

                                    Update


                                </div>


                            </div>

                        </div>


                    </div>

                </div>

            </Modal.Body>
            {/*<Modal.Footer>*/}

            {/*    <div className="btn btn-primary" onClick={() => setxdilog(false)}>Close</div>*/}
            {/*</Modal.Footer>*/}
        </Modal>


        <div className="card m-3  mb-0 ">

            <div className="d-flex justify-content-between align-items-center ">
                <div className="mx-lg-3">

                    <img src="/logoog.png" height={100} alt=""/>

                </div>
                <div className="mx-lg-3 d-flex align-items-center">

                    <div className="me-3 me-lg-5"><FaCalendarAlt className="h1 text-secondary" onClick={e => {
                        setxdilogdate(true);
                    }}/></div>

                    <FaHandsHelping className={"h1"} onClick={r => setxdilog(true)}></FaHandsHelping>

                </div>


            </div>

        </div>
        <div className="card p-4 m-3">

            <div className="row justify-content-around">

                <div className="col-lg-4">
                    <div className="d-flex justify-content-center">
                        <div className="card p-5">


                            <img src={dh.ImUrl + infox.photo} height={200} width={200}
                                 className="rounded p-2 shadow-sm mb-2"></img>
                            <div className=""><b>Name:</b> {infox.name}</div>
                            <div className=""><b>Member Code:</b> {infox.code }</div>

                            <a href={`/master/user?role=Agent&view=true&code=${infox.code}`} className="btn btn-primary mt-3">View Profile
                            </a>





                        </div>
                    </div>
                </div>

                <div className="col mb-4 mb-lg-0">


                    <div className="card p-4 h-100 mt-4  mt-lg-0">

                        <b className="pb-2">Account List</b>


                        <div className="row p-4 h-100 justify-content-around  mb-3">

                            {infox.ac&&infox.ac.map(account => {

                                const  datx=new Date(data.date);



                                const isNormalx= (otoday-datx)/(1000 * 60 * 60 * 24);


                                // const otoday=Date.now();
                                const term= ((otoday - (new Date(account.createdAt)))/(1000 * 60 * 60 * 24)).toFixed(2)
                                const isNormal= account.isNormal? isNormalx>70?2:isNormalx>35?3:isNormalx>5  ?1:0:2;
                                const  due=  account.isNormal? ((datx<otoday) ?  (isNormal===1? account.amount *0.05:account.amount * 0.1).toFixed(2) :0):0;

                                return <div className="card col-6 w-100 mt-3 mt-lg-0  " style={{maxWidth: 400}}>
                                    <div className="text-center ">
                                        <FaPiggyBank className="h1 my-3 "/>

                                        <div className=""><b>A/c Number :</b> {account.code}</div>
                                        <div className=""><b>Next Payment Date
                                            :</b> {new Date(account.date).toLocaleDateString()}</div>

                                       <div className=""><b>Next Payment Amount :</b> {account.amount} {data.isNormal && (isNormal===1||isNormal===3) ? " + Due :"+due:""}</div>



                                        <div className=""><b>Total Amount : </b> {account.total}</div>
                                        <div className=""><b>Total Term :</b> {term} of {account.days} Days</div>

                                        <div className="mt-1"><b>A/c Type :</b> <span
                                            className={(account.isActive?"bg-primary" :"bg-dangers")+  " btn text-white"}>Saving {account.isActive?"":"Closed"}</span></div>
                                    </div>
                                </div>
                            })}

                            {infox.ac?.length===0?<h1 className="text-center"> No Account Found</h1>:""}


                        </div>

                    </div>

                </div>
            </div>

        </div>

        <div className="card p-4 m-3">


            <b className="p-3 pt-0">Transaction History</b>


            <div className="table-responsive px-lg-3 m-lg-0">

                <table className="table text-center align-middle table-striped table-bordered ">

                    <thead>
                    <tr>
                        <th scope="col">Tnx No.</th>
                        <th scope="col">Information</th>
                        <th scope="col">Account Type</th>
                        <th scope="col">Time</th>
                        <th scope="col">Amount</th>


                    </tr>
                    </thead>
                    <tbody>


                    {data.map((data, index) => <tr key={index}>


                        <td className="fw-bold">{data.code}</td>

                        <td className="fw-bold">{data.remark}
                        </td>


                        <td>

                            {data.isSaving ? "Saving" : "Loans"}
                        </td>


                        <td>{new Date(data.createdAt).toLocaleDateString()}</td>

                        <td className={data.type === 1 ? "fw-bold text-success" : data.type === 2 ? "fw-bold text-info-emphasis" : "text-danger"}>₹ {data.amount}
                        </td>

                    </tr>)}


                    </tbody>
                </table>
            </div>
        </div>
    </>


}