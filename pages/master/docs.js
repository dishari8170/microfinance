import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React from "react";
import Swal from "sweetalert2";
import UploadX from "@/Comp/UploadX";

export default ()=> {

    const validationSchema = Yup.object({
        branch: Yup.string().required("Branch is required"),
        from: Yup.string().required("Date is required"),
        date: Yup.string().required("Date is required"),
    });

    const handleSubmit = async (values, {resetForm}) => {

        console.log(values)
    }


    const docs={
        voter_id:{
            type:"text"
        },

        back_img:{
            type:"img"
        },

        doc_file:{
            type:"file"
        }

    }

    return<><Formik
        enableReinitialize={true}
        initialValues={{

            doc: {
                lolp: {

                    type:'text',
                    val:""
                } ,im: {

                    type:'image',
                    val:""
                },imx: {

                    type:'file',
                    val:""
                }
                ,





            }

        }}

        onSubmit={handleSubmit}
    >
        {({errors, values,setValues}) => <Form className="row">



            {Object.keys(values.doc).map(keyx => values.doc[keyx].type === "file" ?
                <div className="col-md-3 mb-2" key={keyx}><UploadX ofile={"xx"} cb={(u) => {


                    values.doc[keyx].val = u;

                    // setValues({...values, doc: yuo})
                }
                }></UploadX></div> : values.doc[keyx].type === "image" ?
                    <div className="col-md-3 mb-2" key={keyx}><UploadX height={200} cb={(u) => {

                        values.doc[keyx].val = u;

                        // setValues({...values, doc: yuo})
                    }
                    }></UploadX></div> : <div className="col-md-3 mb-2" key={keyx}>

                        <div>{keyx.replace("_", " ").toUpperCase()}</div>
                        <Field className="form-control mt-2" name={`doc.${keyx}.val`} placeholder="Enter your name"/>
                        <ErrorMessage name={`doc.${keyx}.val`} component="div" className="text-danger mt-2"/>
                    </div>
            )}


            <div className="col-md-3  "></div>
            <div onClick={r => {

                Swal.fire({
                    title: "xx",
                    input: 'select',
                    inputOptions: Object.fromEntries(Object.keys(docs).map(key => [key, key.replace("_", " ").toUpperCase()]))
                    ,
                    customClass:{
                        input: 'form-control w-75',
                    },

                    inputPlaceholder: "Select an option",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {


                        // Swal.fire(`You selected: ${result.value}`);
                    }
                });



            }} className="rounded-circle bg-danger d-flex justify-content-center align-items-center text-white h5"
                 style={{height: "50px", width: "50px"}}>+
            </div>
            <input type={"submit"}/>

        </Form>


        }

    </Formik>

    </>

}
