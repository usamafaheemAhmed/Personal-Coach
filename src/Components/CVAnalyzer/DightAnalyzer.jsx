import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../assets/Button/CustomButton';
import { generateText3Prop, generateTextDightPlan } from './GenerateText';
import parse from 'html-react-parser';
import { FaQuestion } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Tooltip } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { InputGroup } from 'react-bootstrap';
import * as Yup from "yup";

const DightAnalyzer = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [cvUrl, setCvUrl] = useState(''); // Store the CV URL
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    let initialValues = {
        age: "",
        DesiredWeightState: "",
        DesiredWeight: "",
        DesiredWeightUnit: "",
        Gender: "",
        CurrentWeight: "",
        CurrentWeightUnit: "",
        halalDight: "",
    }
    let validationSchema = Yup.object().shape({
        age: Yup.number().required(),
        DesiredWeightState: Yup.string().required(),
        DesiredWeight: Yup.number().required(),
        DesiredWeightUnit: Yup.string().required(),
        Gender: Yup.string().required(),
        CurrentWeight: Yup.number().required(),
        CurrentWeightUnit: Yup.string().required(),
        halalDight: Yup.string().notRequired(),
    });



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


    const handleSubmit = async (values) => {
        console.log(values);
        // return
        setLoading(true);
        setError('');

        try {
            const result = await generateTextDightPlan(values);
            let setA = await replaceAsterisksWithBoldTags(result);
            setResponse(setA);
        } catch (err) {
            setError('Failed to Generate Response Please Try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center textGreen">
                <div className="col-md-7">
                    <h1 className='text-center'>Gemini Form</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}

                    >
                        {({ values, setFieldValue }) => {
                            return (<Form>

                                <div className='row'>
                                    <div className='col-md-6 my-2'>
                                        <label htmlFor="jobDescription" className='fw-bold'>Age:</label>
                                        <Field type="number" id="age" name="age" placeholder="Enter your age" className="form-control customInput mt-3" />
                                        <ErrorMessage component={"div"} name='age' className='text-danger' />
                                    </div>
                                    <div className='col-md-6 my-2'>
                                        <label htmlFor="DesiredWeightState" className='fw-bold'>Weight Option:</label>
                                        <Field type="text" as="select" id="DesiredWeightState" name="DesiredWeightState" placeholder="Enter your age" className="form-select customInput mt-3"

                                        >
                                            <option value={"gainWeight"}>You want to gain weight</option>
                                            <option value={"loseWeight"}>You want to lose weight</option>
                                            <option value={"MaintainWeight"}>You want to Maintain weight</option>
                                        </Field>
                                    </div>
                                    <div className='col-md-6 my-2'>
                                        <label htmlFor="DesiredWeight" className='fw-bold'>Desired weight:</label>
                                        <InputGroup>
                                            <Field type="number" id="DesiredWeight" name="DesiredWeight" placeholder="Enter your Desired Weight" className="form-control customInput mt-3" style={{ width: '60%' }} />
                                            <Field type="text" as="select" id="DesiredWeightUnit" name="DesiredWeightUnit" placeholder="Enter your age" className="form-select customInput  mt-3"

                                            >
                                                <option value={"kilograms"}>kg</option>
                                                <option value={"pounds"}>lb</option>
                                            </Field>
                                        </InputGroup>
                                    </div>
                                    <div className='col-md-6 my-2'>
                                        <label htmlFor="jobDescription" className='fw-bold'>Gender:</label>
                                        <Field type="text" as="select" id="Gender" name="Gender" placeholder="Enter your age" className="form-select customInput mt-3"
                                        >
                                            <option value={"Male"}>Male</option>
                                            <option value={"Female"}>Female</option>
                                        </Field>

                                    </div>
                                    <div className='col-md-12 my-2'>
                                        <label htmlFor="CurrentWeight" className='fw-bold'>Current weight:</label>
                                        <InputGroup>
                                            <Field type="number" id="CurrentWeight" name="CurrentWeight" placeholder="Enter your age" className="form-control customInput mt-3" style={{ width: '60%' }} />
                                            <Field type="text" as="select" id="CurrentWeightUnit" name="CurrentWeightUnit" placeholder="Enter your age" className="form-select customInput  mt-3"

                                            >
                                                <option value={"kilograms"}>kg</option>
                                                <option value={"pounds"}>lb</option>
                                            </Field>
                                        </InputGroup>

                                    </div>
                                    <div className='col-md-12 my-2'>
                                        <Field type="checkbox" id="halalDight" name="halalDight" className="form-check-input" />
                                        <label htmlFor="halalDight" className='ms-2'>Do you want Halal dight only</label>
                                    </div>
                                </div>
                                <CustomButton extra={"mt-4"} type={"submit"} text={loading ? "Submitting..." : "Submit"} />

                            </Form>)
                        }}
                    </Formik>

                </div>
                <div className='col-md-7'>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {response && (
                        <div className='textGreen'>
                            <h2 className='d-none'>Response:</h2>
                            <pre className='text-wrap textGreen'>{parse(response)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DightAnalyzer;
