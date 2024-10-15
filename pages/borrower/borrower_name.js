import {Field, Formik} from "formik";
import Sidex from "@/Comp/Sidex";

export default () => {


    return <>
<Sidex>
        <div className="fw-medium mb-3" style={{fontSize: 25}}>Borrower Entry From</div>
        Search
        <div className=" container-fluid">

            <Formik
                initialValues={{
                    borrower_no: "",
                    joining_date: "",
                    branch: "",

                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {() => (
                    <div className="row mt-2 fw-bold">

                        <div className="col-md-4 col-12">
                            <div className="mt-2">Borrower Name</div>
                            <Field className="form-control mt-2 " name="borrower_name"/>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="mt-2"> Joining Date</div>
                            <Field className="form-control mt-2 " name="joining_date"/>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="mt-2">Branch</div>
                            <Field className="form-control mt-2 " name="branch"/>


                        </div>

                    </div>)}
            </Formik>


        </div>
</Sidex>

    </>


}