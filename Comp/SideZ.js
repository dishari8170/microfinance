import {
    FaBars,
    FaHome,

    FaPowerOff,
    FaUser, FaVideo
} from "react-icons/fa";


import React, {useEffect, useState} from "react";


import {useRouter} from "next/router";




export default ( {children})=>{

    const [user, setuser] = useState({})
    //
    //
    function toggleSidebar() {
        const sidebarContent = document.getElementById('sidebar');
        sidebarContent.classList.toggle('show');


    }
    //
    //
    const router = useRouter()
    //
    // useEffect(()=>{
    //
    //
    //     if (localStorage.getItem("lol")){
    //         setuser( JSON.parse(localStorage.getItem("lol")))
    //     }
    //
    //
    // },[])
    //
    //
    //


    return <>
        <div className="">

            <div className=" d-flex align-items-center pe-4 justify-content-between bg-dark shadow-lg" >
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


                <div id="sidebar" className=" sidebar ext-light-emphasis  xitem bg2 " >






                </div>

                <div className="w-100 rounded-3 p-4  "  style={{backgroundImage:"url('backdrop.png')",backgroundRepeat:"no-repeat",backgroundSize:"contain",backgroundPosition:"center center"}}>


                    {children}


                </div>

            </div>


        </div>
    </>



}