import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

export default () => {
    const validationSehema = Yup.object({

        dishari : Yup.string().required("dishari was good"),
    });

    return <>

    <div className="">

        <Formik initialValues={{dishari:"",bocha:""}} onSubmit={}>

            <Form>

                <Field className=""

                name="dishari"
                placeholder=""/>



            </Form>




        </Formik>

    </div>


    </>




 }