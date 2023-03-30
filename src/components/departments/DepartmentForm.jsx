import React, { useState } from 'react';
import './Department.css';

const apiUrl = 'http://localhost:3001/departments';

export function DepartmentForm() {
    const [state, setState] = useState('empty');
    const [errors, setErrors] = useState([]);
    const [dept, setDept] = useState({
        title : '',
        description : ''
    });
    
    const handleInputChange = (e) => {
        const { target } = e;
        const value = target.value;
        const name = target.name;

        setDept(prevState => ({
            ...prevState,
            ...{[name]: value}
        }));
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        createDepartment(dept.title, dept.description);
    }

    async function createDepartment(dpTitle, dpDescription) {
        try {
            const dp = {
                title: dpTitle,
                description: dpDescription
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dp),
            });
            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    const responseJson = await response.json();
                    setErrors(responseJson.errors);
                    setState('failed');
                }
            } else {
                setState('success');
            }
        } catch (e) {
            setState('failed');
            console.warn('error creating department: ', e)
        }
    }

    return (
        <>
        <h2 className='newDepartment_title'>Ný deild</h2>
        <form className='newDepartment_form' onSubmit={onSubmitHandler}>
            <div className='form_input'>
                <label className='form_input_label' for="dpTitle">Nafn deildar: </label>
                <input className='form_input_textArea' id="dpTitle" type="text" name="title" value={dept.title} onChange={handleInputChange}/>
            </div>
            <div className='form_input'>
                <label className='form_input_label' for="dpDescription">Lýsing: </label>
                <input className='form_input_textArea' id="dpDescription" type="text" name="description" value={dept.description} onChange={handleInputChange}/>
            </div>
            <button className='form_submit_button'>Senda</button>
            {state === 'success' && (<h3>Deild var búin til</h3>)}
            {state === 'failed' && (<><h3>Ekki tókst að búa til nýja deild</h3>
                <p>Villur:</p>
                <ul>
                    {errors.map((error, i) => {
                        return (
                            <li key={i}>{error.msg}</li>
                        )
                    })}
                </ul>
                </>)}
        </form>
        </>  
    )
}