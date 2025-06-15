import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {FaEye, FaTrash} from "react-icons/fa";

import * as Yup from "yup";
import {dh} from "@/lib/Dh";
import SideMas from "@/Comp/SideMas";

const validationSchema = Yup.object().shape({
    branchName: Yup.string().required("Branch Name is required"),
    managerName: Yup.string().required("Manager Name is required"),
    code: Yup.string().required("Branch Code is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    openingDate: Yup.date().required("Opening Date is required"),
});

const ITEMS_PER_PAGE = 5;

export default () => {
    const [submittedData, setSubmittedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/branches");
            setSubmittedData(response.data);
            setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (values, {resetForm}) => {
        dh.loadx(true);
        try {
            const response = await fetch('/api/branches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                Swal.fire("Done", "Data submitted", "success").then(() => {
                    fetchData();
                    resetForm();
                });
            } else {
                console.error('Error submitting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            dh.loadx(false);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const currentData = submittedData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <SideMas>
            <div className="card p-4 ">
                <div className="fw-medium" style={{fontSize: "30px"}}>Branch Information</div>
                <Formik
                    initialValues={{
                        branchName: "",
                        managerName: "",
                        code: "",
                        prefix: "",
                        address: "",
                        phoneNumber: "",
                        openingDate: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({resetForm}) => (
                        <Form className="border  border-dark  shadow-sm bg-white p-3">
                            <div className="">
                                <div className="row fw-bold mt-4">

                                    <div className="col-md-3 mb-2">
                                        <div>Branch Name</div>
                                        <Field className="form-control mt-2" name="branchName"
                                               placeholder="Enter Branch Name"/>
                                        <ErrorMessage name="branchName" component="div" className="text-danger mt-2"/>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <div>Manager Name</div>
                                        <Field className="form-control mt-2" name="managerName"
                                               placeholder="Enter Manager Name"/>
                                        <ErrorMessage name="managerName" component="div" className="mt-2 text-danger"/>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <div>Branch Code</div>
                                        <Field className="form-control mt-2" name="code"
                                               placeholder="Enter Branch Code"/>
                                        <ErrorMessage name="code" component="div" className="text-danger mt-2"/>
                                    </div>



                                    <div className="col-md-3 mb-2">
                                        <div>Address</div>
                                        <Field className="form-control mt-2" name="address"
                                               placeholder="Enter Address"/>
                                        <ErrorMessage name="address" component="div" className="text-danger mt-2"/>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <div>Phone Number</div>
                                        <Field className="form-control mt-2" name="phoneNumber"
                                               placeholder="Enter Phone Number"/>
                                        <ErrorMessage name="phoneNumber" component="div" className="text-danger mt-2"/>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <div>Opening Date</div>
                                        <Field type="date" className="form-control mt-2" name="openingDate"/>
                                        <ErrorMessage name="openingDate" component="div" className="text-danger mt-2"/>
                                    </div>

                                    <div className="text-end mt-3">
                                        <button className="btn px-5 btn-success" type="submit">Save</button>
                                        <button className="btn px-5 ms-2 btn-warning text-white" type="button"
                                                onClick={resetForm}>Clear
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>

                <div className="mb-3  mt-3 fw-bold">Branch List</div>
                <table className="table shadow-sm bg-white  align-middle table-bordered border-black text-center">
                    <thead>
                    <tr>
                        <th>Code</th>
                        <th>Branch Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.code}</td>
                            <td>{data.branchName}</td>
                            <td>

                                        <FaEye className="me-2 h1" onClick={() => {
                                            const {
                                                branchName,
                                                managerName,
                                                code,

                                                address,
                                                phoneNumber,
                                                openingDate
                                            } = data;
                                            Swal.fire({
                                                title: 'Branch Details',
                                                html: `
                                                    <p><strong>Branch Name:</strong> ${branchName}</p>
                                                    <p><strong>Manager Name:</strong> ${managerName}</p>
                                                    <p><strong>Branch Code:</strong> ${code}</p>
                                                  
                                                    <p><strong>Address:</strong> ${address}</p>
                                                    <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                                                    <p><strong>Opening Date:</strong> ${openingDate}</p>
                                                `,
                                                confirmButtonText: 'Close'
                                            });
                                        }}/>


                                        <FaTrash className="ms-4 h1 text-danger" onClick={(o)=>{


                                            Swal.fire(
                                            {
                                              title:"Do you want to delete"  ,
                                                icon:"question",
                                                showCancelButton:true,
                                                showConfirmButton:true,
                                                async preConfirm(inputValue) {

                                                    await axios.delete("/api/branches?id=" + data._id)
                                                }
                                            }).then(c=>{


                                                if (c.isConfirmed){

                                                    Swal.fire({icon:"success",title:"branch deleted"}).then(y=>{

                                                        window.location.reload();
                                                    })
                                                }
                                            })
                                        }}/>



                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="justify-content-center align-items-center d-flex">
                    <div className="pagination">
                        {totalPages > 1 && Array.from({length: totalPages}, (_, index) => (
                            <button key={index} onClick={() => handlePageChange(index + 1)}
                                    className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'} me-1`}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </SideMas>
    );
};
