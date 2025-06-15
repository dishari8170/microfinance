import axios from "axios";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function Chartx() {

    const [data, setData] = useState([]);

    function loaddataU() {

        axios.get("/api/saving?close=ADMIN00048&rate=5").then(value => {


        setData(value.data);


        })}





    useEffect(() => {
        loaddataU()

    }, []);

    const otoday=Date.now();

    return <>



              <div>

                <table className="table table-striped align-items-center text-center">

                    <thead>
                    <tr>
                        <th>
                            Deposit Date

                        </th>
                        <th>
                            Interest time (days)

                        </th>
                        <th>
                            c( 7% )

                        </th>
                        <th>
                            Interest Amount

                        </th>


                    </tr>

                    </thead>
                    <tbody>

                    {data.map((d)=> {

                        const tg = (otoday - new Date(d.createdAt)) / (1000 * 60 * 60 * 24);


                        return <tr className="tr">

                            <td>{new Date(d.createdAt).toLocaleString()}</td>


                            <td>{tg.toFixed(2)}</td>

                            <td>{d.simple_interest?.toFixed(2)}</td>

                        </tr>
                    })}




                    </tbody>


                </table>




            </div>




    </>
}