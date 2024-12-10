import axios from "axios";
import {useEffect, useState} from "react";

export default ()=> {


    const [ResponceData, setResponceData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/user");
            setResponceData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };


    useEffect(() => {fetchData()},[]);

    return  <>
        {JSON.stringify(ResponceData)}


    </>
}