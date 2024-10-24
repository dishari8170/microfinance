import {useState} from "react";
import UploadX from "@/Comp/UploadX";


export default () => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!fileName) {
            setMessage('Please choose a file to upload.');
            return;
        }

        setUploading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('file', profilePhoto);

        try {
            const response = await fetch('/api/poto', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('Upload successful!');
            } else {
                setMessage('Upload failed. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container-fluid ">

            <h1>beore</h1>
            <div className="bucha"></div>

            <h1>after</h1>


            <div className="row ">
                <h2>Manage Your Profile</h2>
            </div>
            <UploadX/>
            <div className="col-12">
                <h4>Change Your Profile Photo</h4>
            </div>

            <div className="col-12">
                <h5>Current Photo</h5>
                {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile"
                         style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
                ) : (
                    <p>No photo uploaded</p>
                )}
            </div>

            <div className="col-12">
                <label htmlFor="file-upload" className="form-label">Upload Profile Photo:</label>
                <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{display: 'none'}}
                />
                <div className="">
                    <button
                        className="btn border-black"
                        onClick={() => document.getElementById('file-upload').click()}
                    >
                        Choose File
                    </button>
                </div>
                <span className="ms-2">{fileName}</span>
                <div className="mt-2">
                    <small>Recommended photo size is 250 pixels width X 250 pixels height</small>
                </div>
                <div className="text-end mt-2">
                    <button className="btn btn-info" onClick={handleSubmit} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Submit'}
                    </button>
                </div>
                {message && <div className="mt-2 text-center alert alert-danger">{message}</div>}
            </div>
        </div>
    );
};
