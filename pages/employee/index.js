import {dh} from "@/lib/Dh";
import {FaPiggyBank, FaRupeeSign, FaUser, FaUserAstronaut} from "react-icons/fa";
import {FaUserGroup} from "react-icons/fa6";
import SideEmp from "@/Comp/SideEmp";

//
// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`${dh.api}/user?dia=9`)
//     const data = await res.json()
//
//     // Pass data to the page via props
//     return { props: { data } }
// }

export default function Employee() {

    return<SideEmp>


            <div className="container-fluid   bg-white w-100 h-100 shadow rounded">


                <div className="row p-3">

                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaUser className="text-success mt-3 h1"/>
                                <h5>Total Agents</h5>

                                <h4 className="fw-bold">50000</h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaUserGroup className="text-success mt-3 h1"/>
                                <h5>Total Members</h5>
                                <h4 className="fw-bold">50000</h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaPiggyBank className="text-success mt-3 h1"/>
                                <h5>Saving Account</h5>

                                <h4 className="fw-bold">50000</h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <FaRupeeSign className="text-success mt-3 h1"/>
                                <h5>Total Loan</h5>

                                <h4 className="fw-bold">50000</h4>

                            </div>
                        </div>
                    </div>

                </div>

            </div>


    </SideEmp>

}