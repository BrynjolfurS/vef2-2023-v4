import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Department.css';

const apiUrl = process.env.REACT_APP_PUBLIC_API_BASE_URL;
//const apiUrl = 'http://localhost:3001/departments';


export function Department() {
    const [department, setDepartment] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [state, setState] = useState('');

    let { dptSlug } = useParams();
    const dptUrl = `${apiUrl}/departments/${dptSlug}`;
   
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            let json;
    
            try {
                const result = await fetch(dptUrl);
    
                if (!result.ok) {
                    throw new Error('result not ok');
                }
                json = await result.json();
            } catch (e) {
                console.warn('unable to fetch department', e);
                setError('Tókst ekki að sækja deild');
                return;
            } finally {
                setLoading(false);
            }
            setDepartment(json);
        }
        fetchData();
    }, []);

    async function deleteDepartment() {
        try {
            const response = await fetch(dptUrl, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('result not ok');
            } else {
                setState('success');
            }
        } catch (e) {
            console.warn('unable to delete department', e);
            setError('Tókst ekki að eyða deild');
            setState('failed');
        }
    }

    if (error) {
        return (
            <p>Villa kom upp: {error}</p>
        );
    }

    if (loading) {
        return (
            <p>Sæki deild...</p>
        );
    }

    return (
        <section className='department'>
            <h2 className='department_title'>{department.title}</h2>
            <p className='department_description'>{department.description}</p>
            <Link className='department_courses_link' to={`/${department.slug}/courses`}>Áfangar deildar</Link>
            <div>
                <button className='department_delete_button' onClick={() => deleteDepartment()}>
                   Eyða deild
                </button>
                {state === 'failed' && (<h3>Ekki tókst að eyða deild</h3>)}
                {state === 'success' && (<h3>Deild hefur verið eytt</h3>)}
            </div>
            
        </section>
    )
}
