import Swal from "sweetalert2";
import {Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";


export default () =>{

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/branches");
            setcar(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const  [isOpen,setIsOpen]=useState(false)
    const  [data,setdata]=useState("")
    const  [valx    ,setvalxs]=useState({})



    const [carNames,setcar] = useState( );

    useEffect(()=> {
        fetchData();
    },[])
    return <>




        <Modal show={isOpen} onHide={(i) => {
            setIsOpen(false);
        }} fullscreen={false} centered={true} onEscapeKeyDown={ip => {
            ip.preventDefault()
        }}>
            <Modal.Header className="bg-dark" style={{color: "white"}}>


                <div className="w-100 h3">
                    <div className="text-center">Add New Advertisement</div>
                </div>
                <button onClick={(i) => {
                    setIsOpen(false);
                }} className="bg-transparent border-0 h1 m-0">&times;</button>
            </Modal.Header>
            <Modal.Body className="bg-dark" style={{color: "white"}}>

                <input type="text" value={data} name="" id="" onInput={r => {


                    setdata(r.target.value);


                }}/>

                <div className="bg-danger overflow-y-scroll" style={{maxHeight: "300px"}}>
                    {
                        data?.length > 0 ? carNames.map((t) => t.branchName.toLowerCase().includes(data.toLowerCase()) ?
                            <div className="p-4 bg-success mb-1" onClick={e => {




setvalxs({...valx,member:t.branchName});

setIsOpen(false);


                            }}>{JSON.stringify(t)}</div> : "") : ""
                    }


                </div>



            </Modal.Body>

        </Modal>
        <Formik
            enableReinitialize={true}
            initialValues={
           valx
        } onSubmit={() => {
        }}>

            <Form className="">
                <div className="">
                    <Field className="" name="member" onClick={(c) => {

                        setIsOpen(true)


                    }}/>
                </div>

            </Form>


        </Formik>





    </>


}