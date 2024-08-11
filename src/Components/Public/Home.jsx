import React from 'react'
import Motive from '../Motive/Motive'
import { content } from '../../assets/Content/Content'
import { CustomButton, CustomButtonBigCircleView } from '../../assets/Button/CustomButton'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    let nav = useNavigate()

    let CheckCVAnalyzer = () => {
        nav("/CVAnalyzer")
    }

    let CheckDightAnalyzer = () => {
        nav("/DightAnalyzer")
    }

    return (
        <div className="container mt-3 textGreen">
            <div className="row justify-content-center">
                <div className="col-md-7">
                    <h3 className='text-center ' >
                        Your personal coach for career and wellness
                    </h3>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-7">
                    <div className="row justify-content-center">
                        <div className="col-md-9">
                            <h5 className='text-center py-3'>
                                Do you want to know how Likely you will get a job ?
                            </h5>
                            <div className='d-flex justify-content-center align-items-center'>
                                <CustomButton extra={""} type={"button"} fun={CheckCVAnalyzer} text="View Now" />
                            </div>
                        </div>

                        <div className="col-md-9 ">
                            <h5 className='text-center py-3'>
                                Do you want Perfect dight for you weight ?
                            </h5>
                            <div className='d-flex justify-content-center align-items-center'>
                                <CustomButton extra={""} type={"button"} fun={CheckDightAnalyzer} text="View Now" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
