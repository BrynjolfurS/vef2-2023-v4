import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DepartmentForm } from './DepartmentForm';
import './Department.css';

// process.env.REACT_APP_LOCAL_API_BASE_URL + 
const apiUrl = 'http://localhost:3001/departments';

export function Departments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            let json;

            try {
                const result = await fetch(apiUrl);

                if (!result.ok) {
                    throw new Error('result not ok');
                }
                json = await result.json();
            } catch (e) {
                console.warn('unable to fetch departments', e);
                setError('Tókst ekki að sækja deildir');
                return;
            } finally {
                setLoading(false);
            }
            setDepartments(json);
        }
        fetchData();
    }, []);

    if (error) {
        return (
            <p>Villa kom upp: {error}</p>
        );
    }

    if (loading) {
        return (
            <p>Sæki gögn...</p>
        );
    }

    return (
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
    )
}