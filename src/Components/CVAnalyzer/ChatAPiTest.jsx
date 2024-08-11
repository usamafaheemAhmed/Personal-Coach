

// App.js
import React, { useState } from 'react';
import { GenerateText } from './GenerateText';
import { CustomButton } from '../../assets/Button/CustomButton';

const ChatAPiTest = () => {
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await GenerateText(inputText);
            setResponseText(result);
        } catch (err) {
            setError('Failed to generate text');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className='text-center'>Gemini Text Generator</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-md-12 my-2'>
                                <label htmlFor="inputText">Input Text:</label>
                                <textarea
                                    id="inputText"
                                    value={inputText}
                                    className="form-control customInput"
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Enter your text here"
                                    rows="4"
                                />
                            </div>
                        </div>
                        <CustomButton extra={"mt-4"} type={"submit"} text={loading ? "Generating..." : "Generate"} />
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {responseText && (
                        <div>
                            <h2>Generated Text:</h2>
                            <pre className='text-wrap'>{responseText}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatAPiTest;

