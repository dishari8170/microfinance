import React, { useEffect, useState } from 'react';

export default() => {
    const [submittedData, setSubmittedData] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('submittedData')) || [];
        setSubmittedData(data);
    }, []);

    return <>
        <div className="container">
            <h2>Submitted Data</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Mobile No</th>
                    <th>Email</th>

                </tr>
                </thead>
                <tbody>
                {submittedData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.fatherName}</td>
                        <td>{item.mobileNo}</td>
                        <td>{item.email}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div></>

};

