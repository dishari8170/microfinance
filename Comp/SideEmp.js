import {
    FaBars,
    FaHome,

    FaPowerOff, FaSignOutAlt,
    FaUser, FaVideo
} from "react-icons/fa";


import React, {useEffect, useState} from "react";


import {useRouter} from "next/router";

function capitalizeName(name) {
    return name
        .toLowerCase() // Ensure all characters are lowercase
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string
}


export default ( {children})=>{

    const [pathx, setpathx] = useState([])


    const listx={

        "DashBoard":[],
        "Agents":[],
        "Members":[],
        "Loan":[],
        "Saving":[],
        "Calculator":[]


    }

    //
    //
    function toggleSidebar() {

        const sidebarContent = document.getElementById('sidebar');
        sidebarContent.classList.toggle('show');


    }

    const router = useRouter()



    useEffect(()=>{


        setpathx(router.pathname.split("/"))


    },[])
    //
    //
    //


    return <>

        <div className=" d-flex align-items-center  justify-content-between  shadow-sm" >
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

            <div className="d-inline h2 me-5">
            <img src='/img_4.png' height={50}/>
                <FaPowerOff className="text-danger mx-5"/>
                <FaBars className="   " style={{color:"blue"}} onClick={toggleSidebar} />

            </div>

        </div>

        {/*<div className="bg-dark mt-1 " style={{height:"2px"}}>*/}



        {/*</div>*/}




        <div className="d-flex  overflow-x-hidden h-100">


            <div id="sidebar" className="sidebar  xitem   mt-1" style={{backgroundColor:"#1a75a9",minHeight:"100vh"}}>




                <ul className="mt-3 ps-0 w-100   text-white ">


                    {Object.entries(listx).map(([keyx, valuex]) => <li key={keyx}>

                            <div className="d-flex  justify-content-between  mt-2 btn-outline-secondary" style={{backgroundColor: "#f2691e",}}
                                 onClick={(p) => {

                                     const tp = pathx;

                                     if (tp[1] === keyx) {

                                         tp[1] = "/";

                                     } else {
                                         tp[1] = keyx;
                                     }


                                     setpathx([...tp]);
                                 }}>



                                {valuex.length===0?<a href={"/employee/"+(keyx==="DashBoard"?"":keyx.toLowerCase())} className={"text-decoration-none"}> <div className="text-white">{keyx.toLocaleUpperCase()}</div></a>:
                                    <div className="text-white">{keyx.toLocaleUpperCase()}</div>
                                }

                                <div className="text-white">{pathx[1] === keyx ? "-" : "+"}</div>

                            </div>
                            <ul className={pathx[1] === keyx ? "" : "collapse"}>
                                {valuex.map((o) => {

                                    return <a key={o} href={"/" + keyx + "/" + o} className="text-decoration-none">
                                        <div
                                            className={(pathx[2] && pathx[2] == o) ? "selbg text-white" : ""}>{capitalizeName( o.replaceAll("_", " "))} </div>
                                    </a>


                                })}


                            </ul>
                        </li>
                    )}
                </ul>


            </div>

            <div className="w-100 rounded-3 p-4  " style={{
                // backgroundImage: "url('/backdrop.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center center"
            }}>


            {children}


            </div>

        </div>


    </>



}