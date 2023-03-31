import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CourseForm } from './CourseForm';
import './Courses.css';

const apiUrl = process.env.REACT_APP_PUBLIC_API_BASE_URL;
//const apiUrl = 'http://localhost:3001/departments';

export function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [state, setState] = useState('empty');

    let { dptSlug } = useParams();
    const courseUrl = `${apiUrl}/departments/${dptSlug}/courses`;
    console.log(courseUrl);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            let json;

            try {
                const result = await fetch(courseUrl);

                if (!result.ok) {
                    if (result.status >= 400 && result.status < 500) {
                        const responseJson = await result.json();
                        setErrors(responseJson.errors);
                        setState('failed');
                    }
                } else {
                    json = await result.json();
                    setState('success');
                }
            } catch (e) {
                setState('failed');
                console.warn('unable to fetch courses', e);
            } finally {
                setLoading(false);
            }
            setCourses(json);
        }
        fetchData();
    }, [courseUrl]);

    if (loading) {
        return (
            <p>Sæki gögn...</p>
        );
    }

    return (
        <>
        {state === 'failed' && (<><h3>Ekki tókst að sækja áfanga</h3>
            <p>Villur:</p>
            <ul>
                {errors.map((error, i) => {
                    return (
                        <li key={i}>{error.msg}</li>
                    )
                })}
            </ul>
            <CourseForm url={courseUrl}/>
            </>)}

        {state === 'success' && (
            <section className='courses'>
            <CourseForm url={courseUrl}/>
            <ul className='course_list'>
                {courses.map((course, i) => {
                    return (
                        <li className='course_list_item' key={i}>
                        <h3 className='course_title'>
                            {course.courseId} - {course.title}
                        </h3>
                        <p className='course_units'>
                            Einingar: {course.units}
                        </p>
                        <p className='course_semester'>
                            Önn: {course.semester}
                        </p>
                        <p className='course_level'>
                            Námsstig: {course.level}
                        </p>
                        <Link className='course_url' to={course.url}>
                            Heimasíða námskeiðs á Uglu
                        </Link>
                    </li>
                    );
                })}
            </ul>
        </section>
        )}   
        </>
    )
}