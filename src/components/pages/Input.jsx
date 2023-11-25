import React from 'react'

export default function Input({ type, id, name, title,onChange,value,errors,touched,onBlur }) {
    return (
        <>
            <div className="container">
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor={id} >{title}</label>
                    <input name={name} type={type} className="form-control" value={value} onChange={onChange} onBlur={onBlur}  id={id}/>
                    {touched[name]&&errors[name]&&<p className='text text-danger'>{errors[name]}</p>}  
                </div>
            </div>

        </>
    )
}
