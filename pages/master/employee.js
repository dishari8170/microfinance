import {useEffect, useState} from "react";
import axios from "axios";
import {dh} from "@/lib/Dh";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import {FaDownload, FaEye, FaPenAlt, FaStar, FaTrash} from "react-icons/fa";
import SideZ from "@/Comp/SideZ";
import SideEmp from "@/Comp/SideMas";


export default function EmployeesEmp() {


    //
    const [ResponceData, setResponceData] = useState([]);

    const [getc, setc] = useState(0);
    const [getudat, setudat] = useState([]);
    const pro = "code,name,parent,phone,photo,email"

    const [searchtext, setserchtext] = useState("");
    const [cat, setcat] = useState("name");

    function loaddataU(s = "0") {

        axios.get("/api/user?role=Employee&limit=10&pro="+ pro + "&skip=" + s + "&search=" + searchtext + "&on="+cat).then(value => {

            setc(value.data.total);

            setudat(value.data.data);


        })

    }

    const router = useRouter();

    useEffect(() => {
        loaddataU()
    }, []);

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
                    <div className="col-md-3 col-6 d-flex align-items-center justify-content-between">

                        <div className="d-none d-lg-flex align-items-center h2 text-white "><FaStar className="me-2"/>Employees</div>
                        <div className=""></div>
                        <div className="btn btn-primary float-end" onClick={u => {

                            window.location.href = "/master/user?role=Employee&add=new"
                        }}>Add
                        </div>

                    </div>

                </div>
            </div>

            <div className="table-responsive px-lg-3 mx-3 m-lg-0">

                <table className="table text-center align-middle table-striped table-bordered ">

                    <thead>
                    <tr>
                        <th scope="col">Photo</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>


                    {getudat.map((data, index) => <tr key={index}>

                        <td><img src={dh.ImUrl + "/" + data.photo} height={50} className="rounded-circle" alt=""
                                 onClick={o => {

                                     // window.location.href=dh.ImUrl+"/"+data.photo

                                 }}/></td>
                        <td>{data.code}</td>
                        <td>{data.name}</td>
                        <td>{data.parent}</td>
                        <td>{data.phone}</td>
                        <td>{data.email}</td>
                        <td className="">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="btn btn-danger mx-2" onClick={async r => {

                                    await Swal.fire({

                                        showConfirmButton: true,
                                        icon: "question",
                                        showCancelButton: true,
                                        title: "Are you sure?",

                                        preConfirm() {
                                            axios.delete(`/api/user?code=${data.code}`).then(() => {
                                                router.reload()
                                            })
                                        }
                                    })


                                }}><FaTrash/></div>
                                <a href={`/master/user?role=Employee&view=true&code=${data.code}`}>
                                    <div className="btn btn-success mx-2"><FaEye/></div>
                                </a>
                                <a href={`/master/user?role=Employee&code=${data.code}&editx=true`}>
                                    <div className="btn btn-primary mx-2"><FaPenAlt/>
                                    </div>

                                </a>
                                <a href={`/api/Employee_arg?code=${data.code}`}>
                                    <div className="btn btn-primary mx-2"><FaDownload/>
                                    </div>

                                </a>
                            </div>


                        </td>
                    </tr>)}


                    </tbody>
                </table>
            </div></div>
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