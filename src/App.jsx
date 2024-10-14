// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [fileLink, setFileLink] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData);
            setMessage(response.data.message);
            setFileLink(response.data.fileLink);
        } catch (error) {
            setMessage('Error uploading file');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{width: "100vw"}} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
                <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">File Upload to Azure Blob Storage</h1>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4 border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500 transition duration-300"
                />
                <button
                    onClick={handleUpload}
                    disabled={loading || !file}
                    className={`w-full bg-blue-600 text-white font-bold py-2 rounded-lg transition duration-300 hover:bg-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
                {message && (
                    <p className={`mt-4 text-center ${fileLink ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
                )}
                {fileLink && (
                    <p className="mt-4 text-center">
                        Download link:{' '}
                        <a href={fileLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                            {fileLink}
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;