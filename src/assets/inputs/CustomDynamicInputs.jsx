import React from 'react'

const CustomDynamicInputs = (props) => {
    let { type, name, id, Placeholder } = props
    return (
        <input type={type} name={name} id={id} placeholder={Placeholder} className='form-control customInput' />
    )
}

export { CustomDynamicInputs }
