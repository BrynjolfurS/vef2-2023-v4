import React, { useState } from 'react';
import './Courses.css';


export function CourseForm( {url} ) {
    const [state, setState] = useState('empty');
    const [errors, setErrors] = useState([]);
    const [course, setCourse] = useState({
        courseId: '',
        title : '',
        units : '',
        semester : '',
        level : '',
        url : ''
    });

    const handleInputChange = (e) => {
        const { target } = e;
        const value = target.value;
        const name = target.name;

        setCourse(prevState => ({
            ...prevState,
            ...{[name]: value}
        }));
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        createCourse(course);
    }

    async function createCourse(newCourse) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCourse),
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
            console.warn('error creating course: ', e)
        }
    }

    return (
        <>
        <h2 className='newCourse_title'>Nýr áfangi</h2>
        <form className='newCourse_form' onSubmit={onSubmitHandler}>
        <div className='form_input'>
                <label className='form_input_label' for="courseId">Númer deildar: </label>
                <input className='form_input_textArea' id="courseId" type="text" name="courseId" value={course.courseId} onChange={handleInputChange}/>
            </div>
            <div className='form_input'>
                <label className='form_input_label' for="courseTitle">Nafn deildar: </label>
                <input className='form_input_textArea' id="courseTitle" type="text" name="title" value={course.title} onChange={handleInputChange}/>
            </div>
            <div className='form_input'>
                <label className='form_input_label' for="courseUnits">Einingar: </label>
                <input className='form_input_textArea' id="courseUnits" type="text" name="units" value={course.units} onChange={handleInputChange}/>
            </div>
            <div className='form_input'>
                <label className='form_input_label' for="courseSemester">Önn: </label>
                <input className='form_input_textArea' id="courseSemester" type="text" name="semester" value={course.semester} onChange={handleInputChange}/>
            </div>
            <div className='form_input'>
                <label className='form_input_label' for="courseLevel">Námsstig: </label>
                <input className='form_input_textArea' id="courseLevel" type="text" name="level" value={course.level} onChange={handleInputChange}/>
            </div>
            <div className='form_input'>
                <label className='form_input_label' for="courseUrl">Slóð: </label>
                <input className='form_input_textArea' id="courseUrl" type="text" name="url" value={course.url} onChange={handleInputChange}/>
            </div>
            <button className='form_submit_button'>Senda</button>
            {state === 'success' && (<h3>Áfangi var búin til</h3>)}
            {state === 'failed' && (<><h3>Ekki tókst að búa til nýjan áfanga</h3>
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
    );
}