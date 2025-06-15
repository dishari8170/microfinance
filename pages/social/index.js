
import {
    FaArrowRight,
    FaBackspace, FaBookmark,
    FaCheck, FaComment, FaEye,
    FaFacebook, FaHeart,
    FaInstagram,
    FaLinkedin, FaMinus, FaPaperPlane,
    FaPlus, FaRegHeart,
    FaRupeeSign,
    FaTiktok,
    FaTwitter, FaUserCircle,
    FaYoutube
} from "react-icons/fa";
import {FaMagnifyingGlass, FaUserGroup} from "react-icons/fa6";
import {
    Area,
    Bar,
    Cell,
    ComposedChart,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React, {useEffect, useState} from "react";
import { Modal} from "react-bootstrap";
import Swal from "sweetalert2";
import {format, parse} from "date-fns";
import {Field, Form, Formik} from "formik";
import UploadX from "@/Comp/UploadX";
import {dh} from "@/lib/Dh";
const dummy = require("@/lib/dummyx.json");

//
// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`${dh.api}/user?dia=9`)
//     const data = await res.json()
//
//     // Pass data to the page via props
//     return { props: { data } }
// }


const HashtagChips = ({ values, setFieldValue }) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (inputValue.trim()) {
                const newHashtag = inputValue.trim().startsWith("#")
                    ? inputValue.trim()
                    : `#${inputValue.trim()}`;

                if (!values.includes(newHashtag)) {
                    setFieldValue("hashtags", [...values, newHashtag]);
                }
                setInputValue("");
            }
        }
    };

    const handleDelete = (index) => {
        const updatedHashtags = values.filter((_, i) => i !== index);
        setFieldValue("hashtags", updatedHashtags);
    };

    return (
        <div className="form-control d-flex flex-wrap">
            {values.map((hashtag, index) => (
                <div
                    key={index}
                    className="badge bg-primary text-light me-2 d-flex align-items-center "
                >
                    {hashtag}
                    <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        aria-label="Close"
                        onClick={() => handleDelete(index)}
                        style={{ fontSize: "0.7rem" }}
                    ></button>
                </div>
            ))}
            <input
                type="text"
                className="border-0 flex-grow-1"
                placeholder="Type and press Enter/Space"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ outline: "none" }}
            />
        </div>
    );
};


export default function RX (prop){
    const range = (start, end) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i);


    const [datac, setDatac] = useState([
        { date: "14-12-2024", like: 1000, comment: 300, view: 500 },
        { date: "15-12-2024", like: 1200, comment: 400, view: 600 },
        { date: "16-12-2024", like: 800, comment: 250, view: 800 },
        { date: "17-12-2024", like: 950, comment: 320, view: 100 },
        { date: "18-12-2024", like: 1000, comment: 300, view: 900 },
        { date: "19-12-2024", like: 1200, comment: 400, view: 500 },
        { date: "20-12-2024", like: 800, comment: 250, view: 800 },
        { date: "21-12-2024", like: 950, comment: 320, view: 100 },
        { date: "22-12-2024", like: 1000, comment: 300, view: 200 },
        { date: "23-12-2024", like: 1200, comment: 400, view: 500 },
        { date: "24-12-2024", like: 800, comment: 250, view: 850 },
        { date: "25-12-2024", like: 950, comment: 320, view: 100 },
    ]);

    const [startDate, setStartDate] = useState("14-12-2024");
    const [endDate, setEndDate] = useState("20-12-2024");
    const [chmain, setchmain] = useState(0);



    const accountData = [
        { name: "Saving", value: 80000 },
        { name: "Loan", value: 40000 },
    ];

    const filteredData = datac.filter((item) => {
        const itemDate = parse(item.date, "dd-MM-yyyy", new Date());
        const start = parse(startDate, "dd-MM-yyyy", new Date());
        const end = parse(endDate, "dd-MM-yyyy", new Date());
        return itemDate >= start && itemDate <= end;
    });

    const socialMedia = {
        "Facebook": { icon: <FaFacebook style={{ fontSize: 30 }} />,color: "#1877F2", post: 0 },
        "Twitter": { icon: <FaTwitter style={{ fontSize: 30 }} />, color: "#1DA1F2", post: 0 },
        "Linkedin": { icon: <FaLinkedin style={{ fontSize: 30 }} />, color: "#0077B5", post: 0 },
        "TikTok": { icon: <FaTiktok style={{ fontSize: 30 }} />, color: "#FF0050", post: 0 },
        "Instagram": { icon: <FaInstagram style={{ fontSize: 30 }} />, color: "#E4405F", post: 0 },
        "Youtube": { icon: <FaYoutube style={{ fontSize: 30}} />, color: "#FF0000" , post: 0 }
    };



    const [socialmx,setsocialmx]=useState([])

    const [socialm,setsocialm]=useState(["Facebook","Youtube","Instagram"])


    const [checkx,setcheckx]=useState("rx")
    const [choiseOwner,setChoiseowner]=useState(false)

    const [getUser ,setUser]=useState("Raju")


    const [owners,setowners]=useState([
        {
            "name": "John Doe",
            "shortintro": "CEO of Acme Corp",
            "email": "john.doe@acmecorp.com",
            "phone": "+1 555-123-4567",
            "website": "https://www.acmecorp.com",
            "choise":["Facebook","Youtube","Instagram"]
        },
        {
            "name": "Jane Smith",
            "shortintro": "Founder of Innovate Solutions",
            "email": "jane.smith@innovatesolutions.com",
            "phone": "+1 555-987-6543",
            "website": "https://www.innovatesolutions.com",
            "choise":["Facebook","Linkedin"]
        },
        {
            "name": "David Lee",
            "shortintro": "Marketing Director at Global Trends",
            "email": "david.lee@globaltrends.com",
            "phone": "+1 555-555-5555",
            "website": "https://www.globaltrends.com",
            "choise":["Facebook","Youtube","TikTok","Linkedin"]
        },
        {
            "name": "Sarah Jones",
            "shortintro": "Freelance Web Developer",
            "email": "sarah.jones@freelance.com",
            "phone": "+1 555-111-2222",
            "website": "https://www.sarahjones.dev",
            "choise":["Facebook","TikTok","Linkedin"]
        },
        {
            "name": "Michael Brown",
            "shortintro": "Owner of Local Coffee Shop",
            "email": "michael.brown@localcoffeeshop.com",
            "phone": "+1 555-333-4444",
            "website": "https://www.localcoffeeshop.com",
            "choise":["Instagram","Twitter","TikTok","Linkedin"]
        }
    ]);


    const [owner,setOwner]=useState(0);
    const [xcreate,setxcreat]=useState(false);



    useEffect(()=>{
        // setcheckx("raju")

    },[])



    const [showMetrics, setShowMetrics] = useState({
        like: true,
        comment: true,
        view: true,
    });



    const toggleMetric = (metric) => {
        setShowMetrics((prev) => ({ ...prev, [metric]: !prev[metric] }));
    };


    const [search,setsearch]=useState("");


    return <div>






        {/*add new */}
        <Modal backdrop="static" keyboard={false} show={checkx === "raju"} centered={true} className="">
            <Modal.Header className="bg-dark text-white " onClick={(i) => setcheckx(socialm[0])}>
                <Modal.Title>Manage Account</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark" style={{color: "white"}}>


                {Object.keys(socialMedia).map((datax, index) => (


                    <div className="border border-white rounded d-flex  mx-3 align-items-center mt-3" onClick={i => {

                        if (socialm.includes(datax)) {

                            setsocialm(socialm.filter(item => item !== datax));
                        } else {
                            // Add "Instagram" to the array
                            setsocialm([...socialm, datax]);
                        }

                    }}>

                        <div className="d-flex align-items-center justify-content-center rounded"
                             style={{height: 80, width: 120, backgroundColor: socialMedia[datax].color}}>


                            {socialMedia[datax].icon}


                        </div>
                        <div className="ps-2 w-100">


                            <div className="h3">
                                {datax}


                            </div>
                        </div>

                        {socialm.includes(datax) ?
                            <div className="d-flex align-items-center justify-content-center rounded"
                                 style={{height: 80, width: 100}}>

                                <FaCheck style={{fontSize: 50}}/>


                            </div> : <div style={{height: "50px", width: 100}}></div>}
                    </div>

                ))}


            </Modal.Body>
            <Modal.Footer className="bg-dark text-white ">

                <div className="btn btn-secondary" onClick={(i) => setcheckx(socialm[0])}>
                    Close
                </div>


            </Modal.Footer>
        </Modal>



        <Modal backdrop="static" keyboard={false} show={xcreate} centered={true} className="">

            <Modal.Header className="bg-dark text-white ">
                <Modal.Title>Manage Account</Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-dark" style={{color: "white"}}>


<Formik initialValues={{

    name:"",
    email:"",
    phone:"",
    password:"",
    shortintro:"",
    choise:[]

}} onSubmit={values => {

    owners.push(values);

    setxcreat(false)


    console.log(values)
}}>

    {({resetForm, values, setValues, errors,setFieldValue}) => (

        <Form>

            Name
            <Field className="form-control mb-2" name="name"  ></Field>
            Email
            <Field className="form-control mb-2" name="email" ></Field>
            Phone
            <Field className="form-control mb-2" name="phone" ></Field>
            Password
            <Field className="form-control mb-2" name="password" ></Field>
            Short Notes
            <Field className="form-control mb-3" name="shortintro" ></Field>

            <div className="d-flex justify-content-between">
                <input type={"submit"} className="btn btn-outline-info"/>
                <div onClick={o=>{
                    setxcreat(false)
                }} className="btn btn-outline-secondary"> Close</div>
            </div>


        </Form>

    )}


</Formik>

            </Modal.Body>


        </Modal>

        <Modal backdrop="static" keyboard={false} show={choiseOwner} centered={true} className="">
            <Modal.Header className="bg-dark text-white ">
                <Modal.Title>Manage Account</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark" style={{color: "white"}}>


                {owners.map((datax,index) => (


                    <div className="border border-white rounded d-flex  mx-3 align-items-center mt-3" onClick={i => {


                        setOwner(index)

                        setsocialm(owners[owner].choise)
                    }}>

                        <div className="d-flex align-items-center justify-content-center rounded"
                             style={{height: 80, width: 120,fontSize:50}}>


                            {datax.name.substring(0,1)}



                        </div>
                        <div className="ps-2 w-100">


                            <div className="h3">
                                {datax.name}


                            </div>
                        </div>

                        {index===owner?
                            <div className="d-flex align-items-center justify-content-center rounded"
                                 style={{height: 80, width: 100}}>

                                <FaCheck style={{fontSize: 50}}/>


                            </div> : <div style={{height: "50px", width: 100}}></div>}
                    </div>

                ))}


            </Modal.Body>
            <Modal.Footer className="bg-dark text-white ">
                <div className="btn btn-primary" onClick={o=>{
                    setChoiseowner(false)

                    setxcreat(true)

                }}>Add New User</div>


                <div className="btn btn-secondary" onClick={(i) => setChoiseowner(false)}>
                    Close
                </div>


            </Modal.Footer>
        </Modal>


        <div className="text-white vw-100 vh-100 p-4 text-white m-0" style={{
            backgroundColor: "hsla(180,0%,0%,1)",
            backgroundImage: "radial-gradient(at 95% 39%, hsla(266,48%,12%,1) 0px, transparent 90%),radial-gradient(at 18% 86%, hsla(108,81%,13%,0.78) 0px, transparent 50%)"
        }}>


            <div className="rounded-4 p-3 pt-4 pb-5 h-100 shadow row mx-1"
                 style={{backgroundColor: "rgba(33, 37, 41, .6)"}}>


                <div className="col-lg-3 ">


                    <div className="card p-3 text-white rounded-3 shadow-sm " style={{backgroundColor:"#21252960"}}>
                        <div className="ps-3  h4">Search Post</div>


                        <div className="d-flex align-items-center border-1 border-success border rounded-3 px-3 my-2">
                            <input type="text" className="form-control my-2  bg-dark text-white border-0" onKeyUp={r=>{
                                setsearch(r.target.value);
                            }}/>
                            <FaMagnifyingGlass className="ms-2 text-light"/>
                        </div>


                        <div className="d-flex justify-content-between mt-3  ">

                            <div className="link-danger  fw-bold ">Reset</div>

                            <div className="fw-bold link-primary ">Search</div>

                        </div>

                    </div>


                    <div
                        className="card p-3 pb-0  text-white rounded-3 shadow-sm  mt-2  pb-4  overflow-y-scroll  "
                        style={{height: "70vh",backgroundColor:"#21252960"}} >
                        <div className="ps-3   h5">Accounts</div>


                        {socialm.map((data, index) => (


                            <div className="rounded d-flex p-1 ps-2  mx-3 align-items-center mt-3" style={{
                                border: `3px solid ${socialMedia[data].color}`,
                                background: `#${socialMedia[data].color.slice(1)}11`
                            }}
                                 onClick={i => {


                                     setcheckx(checkx !== data ? data : "")

                                 }}>

                                <div className="d-flex align-items-center  justify-content-center rounded"
                                     style={{height: 50, width: 60, backgroundColor: socialMedia[data].color}}>


                                    {checkx === data ? <FaCheck style={{fontSize: 30}}/> : socialMedia[data].icon}


                                </div>
                                <div className="ps-2 w-100">


                                    <div className="h3 pt-2">
                                        {data}

                                        <br/>


                                        <span style={{fontSize: 13}} className="float-end me-3 ">
                                            {socialMedia[data].post} Post
                                        </span>
                                    </div>
                                </div>
                            </div>

                        ))}

                        {
                            <div className="border border-white rounded d-flex  mx-3 align-items-center mt-3 p-2"
                                 onClick={r => {

                                     setcheckx("raju");
                                 }}>

                                <div className="d-flex align-items-center justify-content-center bg-danger rounded"
                                     style={{height: 50, width: 60}}>
                                    {socialm.length === 6 ? <FaMinus/> : <FaPlus style={{fontSize: 30}}/>}

                                </div>
                                <div className="ps-2 w-100">


                                    <div className="h3 pt-2">
                                        {socialm.length === 6 ? "remove" : "Connect"}

                                        <br/>


                                        <span style={{fontSize: 13}} className="float-end me-3 ">
                                            {socialm.length} Connected
                                        </span>
                                    </div>
                                </div>
                            </div>}


                    </div>


                </div>

                <div className="col-9">

                    <div className="d-flex p-3 text-white rounded-3 shadow-sm justify-content-between " style={{backgroundColor:"#21252960"}}>

                        <h2 className="h2 ms-2" onClick={o => {


                            Swal.fire({
                                icon: "info", html: `<div class="card text-white bg-dark mb-3">
                                    <div class="card-header"> ${owners[owner].name} Information</div>
                                    <div class="card-body">
                                        <p class="card-text"><b>Email:</b> ${owners[owner].email}</p>
                                        <p class="card-text"><b>Phone:</b> ${owners[owner].phone}</p>
                                        <p class="card-text"><b>Info:</b> ${owners[owner].shortintro}</p>
                                    </div>
                                </div>`
                                ,

                                background: "#212529",
                                confirmButtonText: "close"
                            })
                        }}>
                            {owners[owner].name}

                        </h2>

                        <div className="">
                            <div className="btn btn-outline-info me-3" onClick={r => {
                               setchmain(2)
                            }}>

                                Create Post

                            </div>

                            <div className="btn btn-outline-warning me-3" onClick={r => {
                                setChoiseowner(true)
                            }}>

                                Post Suggestion

                            </div>

                            <div className="btn btn-outline-primary" onClick={r => {
                                setChoiseowner(true)
                            }}>

                                Change User
                            </div>
                        </div>


                    </div>

                    <div className="card  mt-4 p-4 pt-0   rounded-4" style={{height:"47.5rem",backgroundColor:"#21252960"}}>
                        <div className={"h-100 "+(chmain!==2?"overflow-y-scroll":"")}>

                            { chmain===0?
                        <table className="table  table-borderless align-middle text-center">


                            <tbody className="pb-4">


                            {dummy[checkx]?.map((item, i) => {
                                if (!item.title.toLowerCase().includes(search.toLowerCase()   )) return "";

                                return <>

                                    <tr className="">


                                        {/*<td className="bg-transparent  ">*/}
                                        {/*   <img src="/uploads/dp.png" height={50}/>*/}
                                        {/*</td>*/}

                                        <td className={"bg-transparent py-3 text-start"} colSpan="2" style={{backgroundColor:"white"}}>

                                            <div className="text-warning fw-bold" onClick={o=>{

                                                setchmain(1)
                                            }}>

                                                {item.title}
                                            </div>

                                            <div className="text-info" style={{fontSize:13}}>
                                                31/12/2024 16:50 am
                                            </div>

                                        </td>
                                        <td className={"bg-transparent py-3"}>

                                            <div className=" fw-bold" style={{color:"#ff0000"}}>

                                                <FaHeart className="me-3"/>
                                                {item.like}
                                            </div>

                                            <div className="text-info text-warning " style={{fontSize:13}}>
                                                Likes
                                            </div>

                                        </td>

                                        <td className={"bg-transparent py-3"}>

                                            <div className=" fw-bold" style={{color:"#5c00ff"}}>

                                                <FaComment className="me-3"/>
                                                {item.comment}
                                            </div>

                                            <div className="text-warning" style={{fontSize:13}}>
                                                Comments
                                            </div>

                                        </td>
                                        <td className={"bg-transparent py-3"}>

                                            <div className="text-info fw-bold" style={{color:"#ff0000"}}>

                                                <FaEye className="me-3"/>
                                                {item.view}
                                            </div>

                                            <div className="text-warning" style={{fontSize:13}}>
                                                Views
                                            </div>

                                        </td>
                                    </tr>
                                </>


                            })}
                            </tbody>
                        </table>


                            :chmain===1?
                                <div>
                                    <div className="mt-3 fw-bold text-white d-flex justify-content-between align-items-center">

                                        <div className="" onClick={o=>{
                                            setchmain(0)
                                        }}>
                                            <FaBackspace className="me-2"/>
                                            Happy new Year

                                        </div>


                                        <div>

                                            <label>

                                                <input
                                                    type="date"
                                                    className="form-control me-3 "
                                                    value={format(parse(startDate, "dd-MM-yyyy", new Date()), "yyyy-MM-dd")}
                                                    onChange={(e) =>
                                                        setStartDate(format(new Date(e.target.value), "dd-MM-yyyy"))
                                                    }
                                                />
                                            </label>

                                            <label className="mx-2">

                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={format(parse(endDate, "dd-MM-yyyy", new Date()), "yyyy-MM-dd")}
                                                    onChange={(e) =>
                                                        setEndDate(format(new Date(e.target.value), "dd-MM-yyyy"))
                                                    }
                                                />
                                            </label>

                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="mx-2"
                                                    checked={showMetrics.like}
                                                    onChange={() => toggleMetric("like")}
                                                />
                                                Show Likes
                                            </label>
                                            <label style={{marginLeft: "10px"}}>
                                                <input
                                                    type="checkbox"
                                                    className="mx-2"
                                                    checked={showMetrics.comment}
                                                    onChange={() => toggleMetric("comment")}
                                                />
                                                Show Comments
                                            </label>
                                            <label style={{marginLeft: "10px"}}>
                                                <input
                                                    type="checkbox"
                                                    className="mx-2"
                                                    checked={showMetrics.view}
                                                    onChange={() => toggleMetric("view")}
                                                />
                                                Show Views
                                            </label>
                                        </div>


                                    </div>

                                    <ResponsiveContainer height={650}>

                                        <ComposedChart
                                            data={filteredData}
                                            margin={{top: 20, right: 30, bottom: 20, left: 20}}
                                        >

                                            <Tooltip />


                                            <Legend/>
                                            <XAxis dataKey="date" />
                                            <YAxis/>
                                            {showMetrics.like && (
                                                <Area type="monotone" dataKey="like" strokeWidth={4} stroke={"#ff0000"}
                                                      fill={"#ff0000"}/>
                                            )}
                                            {showMetrics.comment && (
                                                <Area type="monotone" dataKey="comment" stroke="#0dcaf0"
                                                      fill={"#0dcaf0"}/>
                                            )}
                                            {showMetrics.view && (
                                                <Area type="monotone" dataKey="view" stroke="#00f" fill={"#00f"}/>
                                            )}
                                        </ComposedChart>
                                    </ResponsiveContainer>


                                </div>:
                                    <Formik initialValues={{
                                        dp:"dp.png",
                                        dis:"",
                                        hashtags: []
                                    }} onSubmit={values => {}}>

                                        {({resetForm, values, setValues, errors,setFieldValue}) => (
                                            <div className="d-flex h-100 mt-4">


                                                <div className="w-75">



                                                    <div className="card  p-3 pt-0 bg-dark ms-3 text-white">

                                                        <div className="w-100">

                                                            <div className="d-flex pb-2  justify-content-between mb-2">


                                                                {Object.keys(socialMedia).map((datax, index) => (


                                                                    <div
                                                                        className="border border-white rounded d-flex p-3 align-items-center mt-3"
                                                                        onClick={i => {

                                                                            if (socialmx.includes(datax)) {

                                                                                setsocialmx(socialmx.filter(item => item !== datax));

                                                                            } else {
                                                                                // Add "Instagram" to the array
                                                                                setsocialmx([...socialmx, datax]);
                                                                            }

                                                                        }}>


                                                                        {socialmx.includes(datax) ?
                                                                            <div
                                                                                className="d-flex align-items-center justify-content-center rounded"
                                                                                style={{height: 20, width: 30}}>

                                                                                <FaCheck style={{fontSize: 50}}/>


                                                                            </div> :
                                                                            <div
                                                                                className="d-flex align-items-center justify-content-center rounded"
                                                                                style={{height: 20, width: 30}}>


                                                                                {socialMedia[datax].icon}


                                                                            </div>}
                                                                    </div>

                                                                ))}

                                                            </div>


                                                        </div>

                                                        <Field name={"title"}  className={"form-control mb-2"} placeholder={"Post Title"}/>
                                                        <Field as="textarea" name="dis" id="" rows="8"></Field>

                                                        <div className="">
                                                            <label htmlFor="hashtags" className="form-label mt-2">
                                                                Hashtags
                                                            </label>
                                                            <Field
                                                                className={"bg-dark"}
                                                                name="hashtags"
                                                                component={() => (
                                                                    <HashtagChips
                                                                        values={values.hashtags}
                                                                        setFieldValue={setFieldValue}
                                                                    />
                                                                )}
                                                            />
                                                        </div>
                                                        <UploadX cb={(im) => setValues({...values, dp: im})}
                                                                 df={values.dp}
                                                                 height={"150px"}
                                                                 className=" mt-3"/>

                                                        <div className="btn btn-primary text-white mt-2" onClick={o=>{
                                                            setchmain(0)
                                                        }}> PUBLISH POST</div>


                                                    </div>




                                                </div>

                                                <div className="h-100 px-5 w-50">

                                                    <div style={{width:350}} className="text-white  card bg-dark p-2 px-3 pb-3">


                                                        <h5 className="">Preview</h5>

                                                        <div className="h-75 p-3 border   rounded" style={{minHeight:"620px"}}>

                                                            <div className="d-flex">
                                                                <FaUserCircle className="h1 me-2"/> <div><div style={{fontSize:16}}>{owners[owner].name}</div><p style={{fontSize:8}}>31/12/2024</p></div>
                                                            </div>

                                                            <img src={dh.ImUrl+values.dp} className="img-fluid bg-white rounded"  alt=""/>
                                                            <div className="d-flex align-items-center justify-content-between my-2">

                                                                Learn More
                                                                <FaArrowRight/>
                                                            </div>
                                                            <hr/>
                                                            <div className="d-flex h5 align-items-center justify-content-between">

                                                                <div className="">
                                                                    <FaRegHeart/>
                                                                    <FaComment className="mx-2"/>
                                                                    <FaPaperPlane/>


                                                                </div>

                                                                <FaBookmark/>
                                                            </div>

                                                            <div className="">

                                                                {values.hashtags.map((datax, index) => (

                                                                    <span key={index} className="me-1 fw-bold">{datax}</span>
                                                                ))}
                                                            </div>
                                                            <div className="fw-light">
                                                                {values.dis}
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )}
                                    </Formik>}




                            <div className="" style={{height: "10px"}}></div>

                        </div>
                    </div>


                </div>
            </div>


        </div>


    </div>

}