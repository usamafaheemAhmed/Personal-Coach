import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../assets/Button/CustomButton';
import { generateText3Prop } from './GenerateText';
import parse from 'html-react-parser';
import { FaQuestion } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Tooltip } from 'antd';

const CVAnalyzer = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [cvUrl, setCvUrl] = useState(''); // Store the CV URL
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleJobDescriptionChange = (e) => {
        setJobDescription(e.target.value);
    };

    const handleCvUrlChange = (e) => {
        setCvUrl(e.target.value);
    };
    const replaceAsterisksWithBoldTags = (text) => {
        // Remove <body> and </body> tags
        let modifiedText = text.replace(/<\/?body>/g, '');

        // Remove ```html
        modifiedText = modifiedText.replace(/```html/g, '');

        // Remove ``` at the end
        modifiedText = modifiedText.replace(/```/g, '');

        // Replace pairs of '**' with <b> tags
        modifiedText = modifiedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

        return modifiedText;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const TextPrompt = "This is my CV and a Job description on which I want to apply. Can you analyze it and give me proper instructions to improve it and can I get a job there? and can you provide response in inner structure of body tag of html so html-react-parse can set it properly";
        try {
            const result = await generateText3Prop(jobDescription, cvUrl, TextPrompt);
            let setA = await replaceAsterisksWithBoldTags(result);
            setResponse(setA);
        } catch (err) {
            setError('Failed to analyze CV. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center textGreen">
                <div className="col-md-6">
                    <h1 className='text-center'>Gemini Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-md-12 my-2'>
                                <label htmlFor="jobDescription" className='fw-bold'>Job Description:</label>
                                <textarea
                                    id="jobDescription"
                                    value={jobDescription}
                                    className="form-control customInput"
                                    onChange={handleJobDescriptionChange}
                                    rows={12}
                                />
                            </div>
                            <div className='col-md-12 my-2'>
                                <label htmlFor="cvUrl" className='fw-bold'>CV File URL
                                &nbsp;
                                    <Tooltip placement="top" title={"Provide online link of your CV like your Google Drive link"}>
                                        <BsFillInfoCircleFill />
                                    </Tooltip> : </label>
                                <input
                                    type="url"
                                    id="cvUrl"
                                    value={cvUrl}
                                    className="form-control customInput"
                                    onChange={handleCvUrlChange}
                                />
                            </div>
                        </div>
                        <CustomButton extra={"mt-4"} type={"submit"} text={loading ? "Submitting..." : "Submit"} />
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {response && (
                        <div className='textGreen'>
                            <h2 className="d-none">Response:</h2>
                            <pre className='text-wrap textGreen'>{parse(response)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CVAnalyzer;
