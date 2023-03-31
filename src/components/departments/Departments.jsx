import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DepartmentForm } from './DepartmentForm';
import './Department.css';

const apiUrl = process.env.REACT_APP_PUBLIC_API_BASE_URL; 
//const apiUrl = 'http://localhost:3001/departments';

export function Departments() {
    const [state, setState] = useState('empty');
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            let json;

            try {
                const result = await fetch(`${apiUrl}/departments`);

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
                console.warn('error creating course: ', e)
            } finally {
                setLoading(false);
            }
            setDepartments(json);
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <p>Sæki gögn...</p>
        );
    }

    return (
        <>
        {state === 'failed' && (
            <><h3>Ekki tókst að sækja deildir</h3>
                <p>Villur:</p>
                <ul>
                    {errors.map((error, i) => {
                        return (
                            <li key={i}>{error.msg}</li>
                        )
                    })}
                </ul>
            </>)}
        {state === 'success' && (
            <section className='departments'>
            <ul className='department_list'>
                {departments.map((department) => {
                    return (
                        <li className='department_list_item' key={department.slug}>
                            <Link className='department_list_item_link' to={department.slug}>
                                {department.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <DepartmentForm />
        </section>
        )}
        </>
    )
}