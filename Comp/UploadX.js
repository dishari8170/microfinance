import {useEffect, useState} from "react";
import axios from "axios";
import {dh} from "@/lib/Dh";


export default (prop)=>{



    const [progressX,setprogressX] = useState();
    const [getdp,setdp] = useState(null);




    async function hadlser(d) {
        const file = d.currentTarget.files[0];


        let f = new FormData()
        f.append("file", file);
        try {
            const Response = await axios.post(`${dh.api}/upload`, f,{

                onUploadProgress(r){
                    setprogressX(  r.progress);
                }
            });

            if (Response) {



                let po=Response.data.name;
                setdp(po)



                if (prop.cb){

                    prop.cb(po)

                }




            }


        } catch (err) {
            console.log(err);
        }


    }
    return <div style={prop.style} className={prop.className}>


        {prop.ofile?<></>:<div className="d-flex justify-content-center">
            <img className="" src={dh.ImUrl + (getdp ?? prop.df??  "dp.png")} style={{objectFit: "scale-down"}}
                 height={prop.height} width={prop.width} alt={"" + getdp ?? "dp.png"}/>

        </div>}

        <input type="file"  onChange={hadlser} className="w-100 form-control"/>


        { ( progressX >0  && progressX< 1 ) ?<div className="text-center bg-success" style={{width: (progressX*100)+"%"}}>

            {progressX *100}%

        </div>:""}












    </div>

}