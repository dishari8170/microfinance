import {dh} from "@/lib/Dh";
import {
    FaCalendar,
    FaCalendarAlt,
    FaChartBar, FaClipboard, FaCopy,
    FaEye,
    FaHandsHelping,
    FaHireAHelper, FaHistory,
    FaRupeeSign,
    FaUserPlus
} from "react-icons/fa";
import {FaMoneyBillTransfer, FaUserGroup} from "react-icons/fa6";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Modal} from "react-bootstrap";
import {DateRange, DateRangePicker} from "react-date-range";
import {addMonths} from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
//
// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`${dh.api}/user?dia=9`)
//     const data = await res.json()
//
//     // Pass data to the page via props
//     return { props: { data } }
// }


export default function RX (prop){
    const range = (start, end) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i);


    const [daterange, setDaterange] = useState([
        {
            startDate: addMonths(new Date(), -1),
            endDate: new Date() ,
            key: 'selection'
        }
    ]);





    const [data,setdata]=useState([])
    const [info,setInfo]=useState({})
    const [lindex,setlindex]=useState(0)


    const [accountData,seAccountData] =
        useState({ da:0,ia:0,dc:0,ic:0,dl:0,il:0,ds:0,is:0,ta:0})


    const comm=[0.1, 0.009, 0.0075, 0.0055, 0.0045, 0.0025, 0.0015, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.0005, 0.0005, 0.0005, 0.0005, 0.0005, 0.0005, 0.0005, 0.0005, 0.0005]

    function loaddataU(s = "0") {

        axios.get("/api/agent?info=1").then(value => {


            setInfo(value.data)


        })


        accountData.da=0; accountData.ia=0; accountData.dc=0; accountData.ic=0; accountData.dl=0; accountData.il=0; accountData.ds=0; accountData.is=0; accountData.ta=0;

        axios.get("/api/agent?start="+daterange[0].startDate.toISOString()+"&end="+daterange[0].endDate.toISOString()).then(value => {


            value.data.map((data,index) => {
                if (index===0){

accountData.da=data.users.length;



                    data.users.map(o=>{

                        accountData.dc+=(o.FD * 0.1)

                    })


                }else {
                    accountData.ia+=data.users.length;
                    data.users.map(o=>{

                        accountData.is+=Number.parseFloat( o.FD)


                        console.log(o.FD,"------",comm[index])
                        accountData.ic+=(o.FD *  comm[index])

                    })
                }

            })


            accountData.ta=accountData.da+accountData.ia
            setdata(value.data)

        })




    }

const [xdilog,setxdilog]=useState(false)
const [xdilogdate,setxdilogdate]=useState(false)
const [pdata,setPData]=useState({})

useEffect(()=>{

    loaddataU();

},[])

    return<>



        <Modal backdrop="static" keyboard={false} show={xdilog} centered={true} className="">
            <Modal.Header className="bg-dark text-white" >
                <Modal.Title>Account Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark overflow-y-scroll" style={{color: "white"}}>

                <div className="text-center mb-2">

                        <img src={dh.ImUrl+ info.photo} className="rounded" height={200} alt=""/>

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


        <div className="bg-danger s vh-100 position-relative ">

            <div className="container-fluid   bg-white w-100 h-100 shadow rounded overflow-y-scroll">


                <div className="card m-3  mb-0 ">

                    <div className="d-flex justify-content-between align-items-center ">
                        <div className="mx-lg-3">

                            <img src="/logoog.png" height={100} alt=""/>

                        </div>


                        <div className="mx-lg-3 d-flex align-items-center">
                            <div className="bg-dark px-4 py-2 border-warning border-2 fw-bold text-white me-3 rounded user-select-all">

                                {info.code}
                            </div>

                            <div className="me-3 me-lg-5">
                                <FaMoneyBillTransfer className="h1 text-secondary" onClick={e => {
                                    setxdilogdate(true);
                                }}/></div>

                            <FaHandsHelping className={"h1 me-3"} onClick={r => setxdilog(true)}></FaHandsHelping>

                        </div>


                    </div>

                </div>

                <div className="row p-3 pt-0">

                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaUserGroup className="text-success mt-3 h1"/>
                                <h5>Direct Commission</h5>

                                <h4 className="fw-bold">{accountData.dc}</h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaUserGroup className="text-success mt-3 h1"/>
                                <h5>InDirect Commission</h5>

                                <h4 className="fw-bold">{accountData.ic}</h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaUserGroup className="text-success mt-3 h1"/>
                                <h5>Direct Agents</h5>

                                <h4 className="fw-bold">{accountData.da}</h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaRupeeSign className="text-success mt-3 h1"/>
                                <h5>InDirect Agent</h5>
                                <h4 className="fw-bold">{accountData.ia}</h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaRupeeSign className="text-success mt-3 h1"/>
                                <h5>Direct Loan</h5>

                                <h4 className="fw-bold">0</h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaRupeeSign className="text-success mt-3 h1"/>
                                <h5>InDirect Loan</h5>

                                <h4 className="fw-bold">0</h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaRupeeSign className="text-success mt-3 h1"/>
                                <h5>InDirect Saving</h5>

                                <h4 className="fw-bold">{accountData.is}</h4>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaRupeeSign className="text-success mt-3 h1"/>
                                <h5>Direct Saving</h5>

                                <h4 className="fw-bold">{accountData.ds}</h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm" onClick={o => {

                            window.location.href = "/master/user?role=Agent&add=new"
                        }}>
                            <div className="card-body text-center">
                                <FaUserPlus className="text-success mt-3 h1"/>
                                <h5>Add New Agent</h5>

                                <h4 className="fw-bold">{accountData.ta}</h4>

                            </div>
                        </div>
                    </div>

                </div>


                <ul className="nav nav-tabs px-3">
                    {/*<li className="nav-item">*/}
                    {/*    <a className="nav-link active" aria-current="page" href="#">Total</a>*/}
                    {/*</li>*/}

                    {data.map((d, index) => {

                        return <li className="nav-item" key={index}><a className={"nav-link " + (lindex === index ? "active" : "")}
                                                           aria-current="page"
                                                           href="#" onClick={u => {
                            setlindex(index)
                        }}>Level {index}</a></li>
                    })}


                </ul>


                <div className="card table-responsive shadow-sm mt-4 p-4 mx-3">


                    <table className="table  text-center align-middle">

                        <thead>
                        <tr>
                            <th>Agent ID</th>
                            <th>Agent Name</th>
                            <th>Phone</th>
                            <th>Agent Saving</th>
                            <th>Agent Loan</th>

                            <th>Commission</th>


                        </tr>

                        </thead>
                        <tbody>
                        {data[lindex] != null ? data[lindex]["users"].map(d => {

                            return <tr key={lindex}>
                                <td>{d.code}</td>
                                <td>{d.name}</td>
                                <td>{d.phone}</td>
                                <td>{d.FD}</td>
                                <td>{d.loan}</td>

                                <td>{(d.FD * comm[lindex]).toFixed(2)}</td>


                            </tr>

                        }) : ""}

                        </tbody>
                    </table>


                    {/*<ResponsiveContainer width="100%" height={300}>*/}
                    {/*    <PieChart>*/}
                    {/*        <Pie*/}
                    {/*            data={accountData}*/}
                    {/*            cx="50%"*/}
                    {/*            cy="50%"*/}
                    {/*            labelLine={false}*/}
                    {/*            outerRadius={100}*/}
                    {/*            dataKey="value"*/}
                    {/*        >*/}

                    {/*            <Cell key={`cell-`} fill={"#ff00ff"} />*/}

                    {/*            <Cell key={`cell-1`} fill={"#f00"} />*/}


                    {/*        </Pie>*/}
                    {/*        <Legend />*/}
                    {/*    </PieChart>*/}
                    {/*</ResponsiveContainer>*/}

                    {/*<ResponsiveContainer width="100%" height={300}>*/}


                    {/*    <PieChart>*/}
                    {/*        <Pie*/}
                    {/*            data={accountData}*/}
                    {/*            cx="50%"*/}
                    {/*            cy="50%"*/}
                    {/*            labelLine={false}*/}
                    {/*            outerRadius={100}*/}
                    {/*            dataKey="value"*/}
                    {/*        >*/}

                    {/*            <Cell key={`cell-`} fill={"#ff00ff"} />*/}

                    {/*            <Cell key={`cell-1`} fill={"#f00"} />*/}


                    {/*        </Pie>*/}
                    {/*        <Legend />*/}
                    {/*    </PieChart>*/}
                    {/*</ResponsiveContainer>*/}


                </div>


            </div>


        </div>
        {/*{prop.data}*/}


    </>

}