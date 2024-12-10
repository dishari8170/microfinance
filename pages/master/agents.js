import {useEffect, useState} from "react";
import axios from "axios";
import {dh} from "@/lib/Dh";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import {FaEye, FaPenAlt, FaTrash} from "react-icons/fa";
import SideZ from "@/Comp/SideZ";


export default function Agents() {

    //
    const [ResponceData, setResponceData] = useState([]);

    const [getc, setc] = useState(0);
    const [getudat, setudat] = useState([]);
    const pro = "code,name,parent,phone,photo,email"

    const [searchtext, setserchtext] = useState("");
    const [cat, setcat] = useState("name");

    function loaddataU(s = "0") {

        axios.get("/api/user?role=Agent&limit=10&pro=_id," + pro + "&skip=" + s + "&search=" + searchtext + "&on="+cat).then(value => {

            setc(value.data.total);

            setudat(value.data.data);


        })

    }

    const router = useRouter();

    useEffect(() => {
        loaddataU()
    }, []);

    return <>

        <SideZ className="">


            <div className="row p-4 align-middle" style={{backgroundColor:"#1a75a9"}}>
                <div className="col-md-3">
                    <input className="form-control" placeholder="Text To Search" onChange={i => {

                        setserchtext(i.target.value)

                    }}/></div>
                <div className="col-md-3">
                    <select className="form-control" onChange={i => {

                        setcat(i.target.value)
                    }}>
                        {pro.split(",").map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}


                    </select>
                </div>

                <div className="col-md-3">
                    <div className="btn btn-primary" onClick={u => {


                        loaddataU()


                    }}>
                        Search
                    </div>
                </div>
                <div className="col-md-3">


                    <div className="btn btn-primary  float-end" onClick={u => {

                        window.location.href = "/master/user?role=Agent"
                    }}>Add
                    </div>

                </div>

            </div>




            <table className="table text-center align-middle table-striped">

                <thead>
                <tr>
                    <th scope="col">Photo</th>
                    <th scope="col">ID</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Name</th>

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
                    <td>{data.parent}</td>
                    <td>{data.name}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>

                        <div className="btn btn-danger mx-2" onClick={async r => {

                            await Swal.fire({

                                showConfirmButton: true,
                                icon: "question",
                                showCancelButton: true,
                                title: "Are you sure?",

                                preConfirm() {
                                    axios.delete(`/api/user?_id=${data._id}`).then(() => {
                                        router.reload()
                                    })
                                }
                            })


                        }}><FaTrash/></div>
                        <a href={`/master/user?role=Agent&view=true&_id=${data._id}`}>
                            <div className="btn btn-success mx-2"><FaEye/></div>
                        </a>
                        <a href={`/master/user?role=Agent&_id=${data._id}`}>
                            <div className="btn btn-primary mx-2"><FaPenAlt/>
                            </div>

                        </a>
                    </td>
                </tr>)}


                </tbody>
            </table>

        </SideZ>
        <div className="d-flex justify-content-center">
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