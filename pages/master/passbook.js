import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { dh } from "@/lib/Dh";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import {
    FaCheckCircle,
    FaCross,
    FaDownload,
    FaEye,
    FaPaperPlane,
    FaPenAlt,
    FaRecycle,
    FaStar,
    FaTimesCircle,
    FaTrash,
} from "react-icons/fa";

import SideEmp from "@/Comp/SideMas";

import { Field, Form, Formik } from "formik";

export default function Passbook() {
    const [ResponceData, setResponceData] = useState([]);

    const [getc, setc] = useState(0);
    const [getudat, setudat] = useState([]);
    const pro = "code,name,parent,phone,photo,email";

    const [searchtext, setserchtext] = useState("");
    const [cat, setcat] = useState("name");

    function loaddataU(acid,s = "0") {
        // axios
        //   .get(
        //     "/api/transaction?limit=10&skip=" +
        //       s +
        //       "&search=" +
        //       searchtext +
        //       "&on=" +
        //       cat
        //   )
        //   .then((value) => {,
        //     setc(value.data.total);
        //     setudat(value.data.data);
        //   });
        // await axios.get("/api/saving?close=" + accid+"&rate="+intres+"&agent="+agent)
        axios.get(`/api/transaction?search=${acid}&on=to`).then((value) => {
            setc(value.data.total);


            let total = 0;
            const updatedData = value.data.data.map(item => {
                if (item.type === 1) {
                    total += item.amount;
                    return { ...item, total };
                } else if (item.type === 2) {
                    return { ...item, total };
                }
                return item;
            });

            setudat(updatedData);



        });
    }

    const router = useRouter();

    const book = useRef();
    const [showx, setshowx] = useState(false);
    const [getaccountd, setaccountd] = useState({});
    const [gettrans, settrans] = useState([]);

    return (
        <SideEmp>
            <div className="card p-3 mb-3">
                <div
                    className="p-4 mb-3 rounded text-white card"
                    style={{ backgroundColor: "#1a75a9" }}
                >
                    <div className="h3">Passbook</div>
                </div>
                {/* <div>
  {
    JSON.stringify(getudat)
  }
</div> */}
                <div className="row ">
                    <div className="col-lg-4">
                        <Formik
                            initialValues={{
                                code: "",
                                amount: "",
                                remark: "",
                                type: 1,
                                date: Date.now().toString(),
                            }}
                            onSubmit={(values) => {
                                Swal.fire({
                                    title: "Are You Sure",

                                    showCancelButton: true,
                                    confirmButtonText: "Confirm",
                                    showLoaderOnConfirm: true,
                                    preConfirm: async (login) => {
                                        const d = await axios.post("/api/passbook", values);
                                        setaccountd(d.data);
                                        loaddataU(values.code);
                                    },
                                });
                            }}
                        >
                            {({ resetForm, values, setValues, errors, submitForm }) => (
                                <Form>
                                    <div className="mb-2    ">Transaction Type</div>

                                    <Field
                                        name="type"
                                        className={"form-control mb-2"}
                                        as="select"
                                    >
                                        <option value="1" className="form-control">
                                            Saving Account
                                        </option>
                                        <option value="2" className="form-control">
                                            Loan Account
                                        </option>
                                    </Field>

                                    <div className="">Account Number</div>
                                    <Field name="code" className={"mb-2 form-control"} />

                                    <div className="btn btn-primary" onClick={submitForm}>
                                        View Transactions
                                    </div>

                                    <div
                                        className="btn btn-primary ms-5"
                                        onClick={(p) => {
                                            const element = document.getElementById("printx");
                                            const newWindow = window.open("", "_blank");

                                            newWindow.document.write(
                                                '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'
                                            );

                                            newWindow.document.write(element.outerHTML);
                                            newWindow.document.close();
                                            newWindow.print();
                                        }}
                                    >
                                        Print
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    {getaccountd.Amount ? (
                        <div className="col  ps-5">
                            <div
                                className="shadow-sm p-2 h-100 no-print w-100"
                                id="printx"
                                ref={book}
                            >
                                <div className="row w-100">
                                    {Object.entries(getaccountd).map(([key, value], index) => {
                                        if (key !== "Image")
                                            return (
                                                <div className={index % 2 === 0 ? "col-8" : "col-4"}>
                                                    <b>{key === "" ? "" : key + " :"}</b> {value}
                                                </div>
                                            );
                                    })}

                                    <div className="col-12 mt-5">
                                        _______________________ <br />
                                        <div className="ms-4"> Authority Signature</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            {getaccountd.Amount ? (
                <div className="bg-white shadow-sm card">
                    <div className="px-4 py-3">
                        <div
                            className="row py-4 rounded d-flex justify-content-between "
                            style={{ backgroundColor: "#1a75a9" }}
                        >
                            <div className="col-md-3 col-6 ">
                                <div className="d-none d-lg-flex  float-start h2 text-white ">
                                    <FaStar className="me-2" />
                                    Transactions
                                </div>
                            </div>

                            <div className="col-md-3 col-6 ">
                                <div
                                    className="btn btn-primary ms-5  float-end "
                                    onClick={(p) => {
                                        const element = document.getElementById("printxx");
                                        const newWindow = window.open("", "_blank");

                                        newWindow.document.write(
                                            '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'
                                        );

                                        newWindow.document.write(element.outerHTML);
                                        const eleme = newWindow.document.getElementById("printe");
                                        eleme.classList.remove("table-striped", "table-bordered");
                                        eleme.classList.add("table-borderless");
                                        newWindow.document.close();
                                        newWindow.print();
                                    }}
                                >
                                    Print
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive px-lg-3 mx-3 m-lg-0" id="printxx">
                        <table
                            className="table text-center align-middle table-striped table-bordered"
                            id="printe"
                        >
                            <thead>
                            <tr>
                                {/* <th scope="col">Tnx No.</th> */}
                                <th scope="col">Tnx ID</th>
                                <th scope="col">Info</th>
                                {/* <th scope="col">Emp</th> */}

                                <th scope="col">Type</th>

                                <th scope="col">Time</th>
                                <th scope="col">Fine</th>
                                <th scope="col">Inst(₹)</th>
                                <th scope="col">Total(₹)</th>
                            </tr>
                            </thead>

                            <tbody>
                            {getudat.length > 0 ? (
                                getudat.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.code}</td>
                                        <td className="">{data.remark=="Saving Payment received"?"By cash":data.remark}</td>

                                        <td>{data.type == 1 ? "Credit" : "-"}</td>

                                        <td>{new Date(data.createdAt).toLocaleString()}</td>
                                        <td
                                            className={
                                                data.iscr
                                                    ? "text-success"
                                                    : "text-danger"
                                            }
                                        >
                                            {data.type == 2 ? data.amount : "-"}
                                        </td>
                                        <td
                                            className={
                                                data.iscr
                                                    ? "text-success"
                                                    : "text-danger"
                                            }
                                        >
                                            {data.type == 1 ? data.amount : "-"}
                                        </td>
                                        <td
                                            className={
                                                data.iscr
                                                    ? "text-success"
                                                    : "text-danger"
                                            }
                                        >
                                            ₹ {data.total}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No transactions found</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="d-flex justify-content-center align-middle mt-4">
                <ul className="pagination">
                    {[...Array(Math.ceil(getc / 10))].map((_, index) => (
                        <li className="page-item" key={index}>
                            <div
                                className="page-link"
                                style={{ cursor: "pointer" }}
                                onClick={() => loaddataU(index * 10)}
                            >
                                {index + 1}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </SideEmp>
    );
}
