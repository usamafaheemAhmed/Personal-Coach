import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyAvCvZNBk-y7UMuZ_0POeKWqALtTfGgArw"; // Replace with your API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
};

const generateText3Prop = async (jobDescription, cvUrl, additionalText) => {
    try {
        // Construct the prompt including CV URL and job description
        const prompt = `
        CV URL: ${cvUrl}
        Job Description: ${jobDescription}
        
        ${additionalText}
        `;

        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        { text: prompt },
                    ],
                },
            ],
        });

        const result = await chatSession.sendMessage("");
        return result.response.text();
    } catch (error) {
        console.error('Error generating text:', error);
        throw error;
    }
};

const generateTextDightPlan = async (values) => {
    let { age, DesiredWeightState, DesiredWeight, DesiredWeightUnit, Gender, CurrentWeight, CurrentWeightUnit, halalDight } = values;
    try {
        // Construct the prompt including CV URL and job description
        const prompt = `Generate a personalized diet, activity, and exercise plan based on the following details:

- **Age:** ${age}
- **Desired Weight State:** ${DesiredWeightState}
- **Desired Weight:** ${DesiredWeight}
- **Desired Weight Unit:** ${DesiredWeightUnit}
- **Gender:** ${Gender}
- **Current Weight:** ${CurrentWeight}
- **Current Weight Unit:** ${CurrentWeightUnit}
- **Halal Diet:** ${halalDight ? "yes" : "no"}

Please provide recommendations that align with my goals, preferences, and dietary restrictions. Include suggestions for daily caloric intake, macronutrient distribution, meal ideas, exercise routines, and any additional activities or tips to help me achieve my desired weight and overall health and can you provide response in inner structure of body tag of html so html-react-parse can set it properly`;

        console.log(prompt)

        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        { text: prompt },
                    ],
                },
            ],
        });

        const result = await chatSession.sendMessage("");
        return result.response.text();
    } catch (error) {
        console.error('Error generating text:', error);
        throw error;
    }
};


const GenerateText = async (inputText) => {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(inputText);
        return result.response.text();
    } catch (error) {
        console.error('Error generating text:', error);
        throw error;
    }
};

export { generateText3Prop, GenerateText, generateTextDightPlan };
