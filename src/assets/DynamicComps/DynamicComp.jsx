import React from 'react'
import { CustomButton, CustomButtonBigButton, CustomButtonBigCircleView, CustomButtonLink, CustomButtonOutline } from '../Button/CustomButton'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { HiOutlineArrowLongRight } from 'react-icons/hi2'
import { CustomDynamicInputs } from '../inputs/CustomDynamicInputs'

const DynamicComp = () => {
    return (
        <div className='container-fluid w-100vw vh-100 darkMode text-light'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center'>Dynamic Components</h1>
                </div>
            </div>

            <div className='row mt-3 '>

                <div className='col-md-6 border-dashed p-2'>
                    <div className='row'>
                        <div className='col-md-3 '>
                            <CustomButton extra={""} type={"button"} fun={() => { console.log("login Clicked") }} text="Login" />
                        </div>
                        <div className='col-md-3 '>
                            <CustomButtonOutline extra={""} type={"button"} fun={() => { console.log("login Clicked") }} text="Login" />
                        </div>
                        <div className='col-md-3 '>
                            <CustomButtonLink extra={""} type={"button"} href={"mailto:hannantahir@gmail.com"} text="Login" />
                        </div>
                        <div className='col-md-3 '>
                            <CustomButtonBigButton extra={""} type={"button"} fun={() => { console.log("login Clicked") }} text="Check availability" />
                        </div>
                        <div className='col-md-3 '>
                            <CustomButtonBigCircleView extra={""} type={"button"} fun={() => { console.log("login Clicked") }} text="View all" icon={<HiOutlineArrowLongRight style={{ fontSize: "3rem" }} />} />
                        </div>
                        <div className='col-md-6 mt-2'>
                            <CustomDynamicInputs type={"text"}
                                name={"active1"}
                                id={"active1"}
                                Placeholder={"active1"} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DynamicComp
