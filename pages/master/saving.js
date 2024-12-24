import {useEffect, useState} from "react";
import axios from "axios";
import {dh} from "@/lib/Dh";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import {
    FaCheckCircle,
    FaCross,
    FaDownload,
    FaEye,
    FaPaperPlane,
    FaPenAlt, FaRecycle,
    FaStar,
    FaTimesCircle,
    FaTrash, FaTrashAlt
} from "react-icons/fa";

import SideEmp from "@/Comp/SideMas";

import {Field, Form, Formik} from "formik";


export default function SavingsEmp() {

    const today= new Date();
    //
    const [ResponceData, setResponceData] = useState([]);

    const [getc, setc] = useState(0);
    const [getudat, setudat] = useState([]);
    const pro = "code,name,parent,phone,photo,email"

    const [searchtext, setserchtext] = useState("");
    const [cat, setcat] = useState("name");

    function loaddataU(s = "0") {

        axios.get("/api/saving?limit=10&skip=" + s + "&search=" + searchtext + "&on="+cat).then(value => {

            setc(value.data.total);

            setudat(value.data.data);


        })

    }

    const router = useRouter();

    useEffect(() => {
        loaddataU()
        today.setDate(today.getDate() + 5)
    }, []);


    const [showx,setshowx]=useState(false);

    return <SideEmp>





        <div className="card p-3 mb-3">
<div className="p-4 mb-3 rounded text-white card" style={{backgroundColor:"#1a75a9"}}>
            <div className="h3">Add New Saving Account</div></div>
            <Formik initialValues={{
                member:"",
                amount:"",
                date:Date.now(),
                t:"ac"

                
            }} onSubmit={(values)=>{

                Swal.fire({
                    title: "Are You Sure",

                    showCancelButton: true,
                    confirmButtonText: "Confirm",
                    showLoaderOnConfirm: true,
                    preConfirm: async (login) => {

                        await axios.post("/api/saving", values)

                    }

                }).then((result) => {
                    if (result.isConfirmed){
                        Swal.fire({title:"Done",html:"Account Created Successfully",icon:"success",}).then(rr=>{

                            window.location.reload();

                        })
                    }

                })

            }}>
                {({resetForm, values, setValues, errors,submitForm}) => <Form>


                    <div className="">Member Id</div>
                    <Field name="member" className={"mb-2 form-control"}/>
                    <div className="">Join Date</div>
                    <Field name="date" type={"date"} className={"mb-2 form-control"}/>

                    <div className="">Amount</div>
                    <Field name="amount" className={"mb-2 form-control"}/>


                    <div className="btn btn-primary" onClick={submitForm}>Add New Saving Account</div>


                </Form>}


            </Formik>

        </div>


        {/*    </Modal.Body>*/}
        {/*    <Modal.Footer>*/}
        {/*        <div onClick={()=>setshowx(false)}>Close</div>*/}
        {/*    </Modal.Footer>*/}
        {/*</Modal>*/}





        <div className="bg-white shadow-sm card">
            <div className="px-4 py-3">
                <div className="row py-4 rounded " style={{backgroundColor:"#1a75a9"}}>
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

                        <div className="d-none d-lg-flex  float-end h2 text-white "><FaStar className="me-2"/>Savings</div>


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
                        <th scope="col">Mem.Id.</th>
                        <th scope="col">Agnt.Id.</th>
                        <th scope="col">Pay.Date</th>
                        <th scope="col">Pay.Amt</th>
                        <th scope="col">Late Fee</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>


                    </tr>
                    </thead>
                    <tbody>


                    {getudat.map((data, index) =>{

const  datx=new Date(data.date);



const isNormalx= (today-datx)/(1000 * 60 * 60 * 24);

const isNormal= data.isNormal? isNormalx>70?2:isNormalx>30?3:isNormalx>5  ?1:0:2;


const  due=   (datx<today) ?  (data.amount *0.05* ((today-datx)/(1000 * 60 * 60 * 24 * 365))).toFixed(2) :0;


// const  dy1= isNormal ((due/isNormalx)*30);

                        const  amt=isNormal===3? Number.parseFloat(data.amount) +Number.parseFloat(data.amount) :data.amount;

// const duex= isNormalx===2?0:isNormalx>30 ? (due ).toFixed(2):0;

                       return  <tr key={index}>


                        <td className="fw-bold">{data.code}</td>

                        <td className="fw-bold">{data.name} ({(data.isActive?isNormal===0:data.isNormal ) ?
                            <p className="text-success d-inline">Regular</p> : <p className="text-danger d-inline">Irregular</p>})
                        </td>

                        <td><a href={"/master/user?role=Member&code="+data.member}> {data.member}</a></td>
                        <td><a href={"/master/user?role=Agent&code="+data.agent}>{data.agent}</a></td>

                        <td>{new Date(data.date).toLocaleDateString()}</td>

                        <td className="fw-bold">{amt}

                        </td>
                        <td className="fw-bold">{data.isActive && isNormal===1||isNormal===3 ?due:0}
                        </td>
                        <td className="fw-bold">{data.total}</td>
                        <td className="flex-wrap h2">


                            {data.isActive?<>
                                <FaCheckCircle className="text-success" onClick={i => {

                                    Swal.fire({


                                        title: "Accept Payment..?",
                                        icon: "question",
                                        showCancelButton: true,
                                        confirmButtonText: `Give ₹${(Number.parseFloat(data.total) + (data.total * 0.07 * ((today - new Date(data.createdAt)) / (1000 * 60 * 60 * 24 * 365)))).toFixed(2)}`,
                                        showLoaderOnConfirm: true,
                                        async preConfirm(value) {

                                            await axios.get("/api/saving?rajuxy=" + data.code)

                                        },


                                    }).then(u=>{
                                        if (u.isConfirmed){

                                            Swal.fire({


                                                title: "Account Closed",
                                                icon: "success",
                                              })


                                        .then(rr => {

                                                window.location.reload();

                                            })
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


                                        title: "Accept Payment..?",
                                        icon: "question",
                                        showCancelButton: true,
                                        confirmButtonText: `Pay ₹${data.amount}`,
                                        showLoaderOnConfirm: true,
                                        showDenyButton: isNormal === 1 || isNormal === 3,
                                        denyButtonText: `Pay With Due ₹${due} `,
                                        async preDeny(value) {

                                            await axios.get("/api/saving?isNormal=false" + "&code=" + (data.code) + "&pay=" + amt + "&due=" + due + "&isNormal=" + isNormal)

                                        },


                                        preConfirm: async (login) => {


                                            await axios.get("/api/saving?isNormal=false" + "&code=" + (data.code) + "&pay=" + amt + "&isNormal=" + isNormal + (due !== 0 ? "&permanet=true" : ""))

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

                                        await axios.delete("/api/saving?raju=x&code=" + data.code)

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
                            </>:<>
                                <div className="btn btn-danger">Account CLosed</div>

                                <FaTrashAlt className="text-danger mx-3" onClick={(e) => Swal.fire({


                                    title: "Are You Sure",

                                    showCancelButton: true,
                                    confirmButtonText: "Confirm",
                                    showLoaderOnConfirm: true,
                                    preConfirm: async (login) => {

                                        await axios.delete("/api/saving?raju=x&code=" + data.code)

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
                    </tr>;})}


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
    </SideEmp>
}