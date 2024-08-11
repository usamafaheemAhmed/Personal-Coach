import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../assets/Button/CustomButton'; // Assuming this is your button component
import * as pdfjsLib from 'pdfjs-dist';
import parse from 'html-react-parser';
import axios from 'axios'; // Import Axios for making API requests

const CVAnalyzer = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [cvText, setCvText] = useState(''); // Store the extracted CV text
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleJobDescriptionChange = (e) => {
        setJobDescription(e.target.value);
    };

    const handleCvFileChange = (e) => {
        setCvFile(e.target.files[0]);
    };

    const extractTextFromPdf = async (file) => {
        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const pdfData = e.target.result;
                const pdf = await pdfjsLib.getDocument({ data: pdfData });
                const page = await pdf.getPage(1);
                const content = await page.getTextContent();
                setCvText(content.items.map((item) => item.str).join(' '));
            };
            reader.readAsArrayBuffer(file);
        } catch (err) {
            console.error('Error extracting text from PDF:', err);
            setError('Failed to extract text from CV');
        }
    };

    useEffect(() => {
        if (cvFile) {
            extractTextFromPdf(cvFile);
        }
    }, [cvFile]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('jobDescription', jobDescription);
        formData.append('cvFile', cvFile); // Append the file

        try {
            const result = await axios.post('http://localhost:3000/api/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
            console.log(result.data)
            // setResponse(result.data);
        } catch (err) {
            console.error('Error sending data to server:', err);
            setError('Failed to analyze CV. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className='text-center'>Gemini Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-md-12 my-2'>
                                <label htmlFor="jobDescription">Job Description:</label>
                                <textarea
                                    id="jobDescription"
                                    value={jobDescription}
                                    className="form-control customInput"
                                    onChange={handleJobDescriptionChange}
                                    rows={12}
                                />
                            </div>
                            <div className='col-md-12 my-2'>
                                <label htmlFor="cvFile">Upload CV (PDF):</label>
                                <br />
                                <input
                                    type="file"
                                    id="cvFile"
                                    accept=".pdf"
                                    className="form-control customInput"
                                    onChange={handleCvFileChange}
                                />
                            </div>
                        </div>
                        <CustomButton extra={"mt-4"} type={"submit"} text={loading ? "Submitting..." : "Submit"} />
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {response && (
                        <div>
                            <h2>Response:</h2>
                            <pre>{response}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CVAnalyzer;