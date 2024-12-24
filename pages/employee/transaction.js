
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
        FaTrash
    } from "react-icons/fa";

    import SideEmp from "@/Comp/SideEmp";

    import {Field, Form, Formik} from "formik";


    export default function Transaction() {


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
        }, []);


        const [showx,setshowx]=useState(false);

        return <SideEmp>



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

                            <div className="d-none d-lg-flex  float-end h2 text-white "><FaStar className="me-2"/>Transactions</div>


                        </div>

                    </div>
                </div>

                <div className="table-responsive px-lg-3 mx-3 m-lg-0">

                    <table className="table text-center align-middle table-striped table-bordered ">

                        <thead>
                        <tr>
                            <th scope="col">Tnx No.</th>
                            <th scope="col">Region</th>
                            <th scope="col">From</th>
                            <th scope="col">agnt id</th>
                            <th scope="col">pay date</th>
                            <th scope="col">pay amt</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>


                        </tr>
                        </thead>
                        <tbody>


                        {getudat.map((data, index) => <tr key={index}>


                            <td className="fw-bold">{data.code}</td>

                            <td className="fw-bold">{data.name} ({data.isNormal ?
                                <p className="text-success d-inline">Regular</p> : <p className="text-danger">"Penalty"</p>})
                            </td>

                            <td><a href={"/master/user?role=Member&code="+data.member}> {data.member}</a></td>
                            <td><a href={"/master/user?role=Agent&code="+data.agent}>{data.agent}</a></td>

                            <td>{new Date(data.date).toLocaleDateString()}</td>

                            <td className="fw-bold">{data.amount}
                            </td>
                            <td className="fw-bold">{data.total}</td>
                            <td className="flex-wrap h2">


                                <FaCheckCircle className="text-success"/> <FaTimesCircle className="text-danger mx-3"/>
                                <FaRecycle/>

                            </td>
                        </tr>)}


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