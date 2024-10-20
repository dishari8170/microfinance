import {
    FaBars,
    FaHome,

    FaPowerOff,
    FaUser, FaVideo
} from "react-icons/fa";


import React, {useEffect, useState} from "react";


import {useRouter} from "next/router";




export default ( {children})=>{

    const [pathx, setpathx] = useState([])


    const listx={
        master:["agroup_master","branch_master","career_structure","configuaration","employ","ledger_master","loancal","photo","rank_and_designation","relation_master","user_master","year_master"],
    accounts:["balance_sheet","bank_book","bank_deposit","bank_withdrawal","cash_book","contra_voucher","day_book","journal_entry","journal_voucher","ledger","payment_voucher","profit_loss","receive_voucher","trail_balance"]
    }

    //
    //
    function toggleSidebar() {

        const sidebarContent = document.getElementById('sidebar');
        sidebarContent.classList.toggle('show');


    }

    const router = useRouter()

    //
    //
    //
    useEffect(()=>{


        // if (localStorage.getItem("lol")){
        //     setuser( JSON.parse(localStorage.getItem("lol")))
        // }




        setpathx(router.pathname.split("/"))


    },[])
    //
    //
    //


    return <>

            <div className=" d-flex align-items-center  justify-content-between bg-dark shadow-lg" >
                <div className="text-white d-flex  align-items-center">
                    {/*<FaHome className=" mx-2 h2" onClick={toggleSidebar} />*/}
                    <img src="/logo.png" height={80} className="p-2 rounded-circle mx-4" alt=""/>


                    {/*<div className="">*/}

                    {/*    <div className="fw-bolder ">Admin</div>*/}
                    {/*    <div className="fw-medium">#id-3456</div>*/}
                    {/*</div>*/}

                </div>

                {/*<div className="text-white h3">*/}
                {/*    Hotel Motel Club*/}
                {/*</div>*/}

                <FaBars className="text-white h2" onClick={toggleSidebar} />


            </div>

            {/*<div className="bg-dark mt-1 " style={{height:"2px"}}>*/}



            {/*</div>*/}



            <div className="d-flex  overflow-x-hidden h-100">


                <div id="sidebar" className="sidebar  xitem bg-dark   mt-1" >




                        <ul className=" ps-0 w-100   text-white ">


                        {Object.entries(listx).map(([keyx,valuex])=><li key={keyx}>

                            <div className="d-flex bg-success justify-content-between " onClick={(p)=>{

                                const tp=pathx;

                                tp[1]=keyx;

                                setpathx([...tp]);
                            }}>

<div className="text-white">{keyx .toLocaleUpperCase()}</div>




                                <div className="text-white">+</div>



                            </div>
                            <ul className={pathx[1]==keyx?"":"collapse"}>
                            {valuex.map((o)=>{

                                return <div  className={(pathx[2]  &&  pathx[2]==o )?"bg-danger text-white":"" }>{o.replaceAll("_"," ")} </div>


                            })}


                            </ul>
                            </li>




                        )}
                    </ul>








                </div>

                <div className="w-100 rounded-3 p-4  "  style={{backgroundImage:"url('/backdrop.png')",backgroundRepeat:"no-repeat",backgroundSize:"contain",backgroundPosition:"center center"}}>


                    {children}


                </div>

            </div>


    </>



}