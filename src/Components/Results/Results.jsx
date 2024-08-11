import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const Results = () => {
    const [response, setResponse] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setResponse(location.state?.response); // Get response from previous page
    }, [location]);

    const animateText = (text) => {
        // Simple text animation example
        const [displayedText, setDisplayedText] = useState('');
        let index = 0;

        useEffect(() => {
            if (text) {
                const interval = setInterval(() => {
                    setDisplayedText((prev) => prev + text[index]);
                    index++;
                    if (index >= text.length) {
                        clearInterval(interval);
                    }
                }, 50);
                return () => clearInterval(interval);
            }
        }, [text]);

        return displayedText;
    };

    return (
        <div className="container">
            <h1>Gemini Response</h1>
            {response && (
                <div className="response-text">
                    {animateText(response.text)} {/* Render text with animation */}
                </div>
            )}
        </div>
    );
};

export default Results;
