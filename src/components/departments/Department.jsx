import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Department.css';

// process.env.REACT_APP_LOCAL_API_BASE_URL + 
const apiUrl = 'http://localhost:3001/departments';


export function Department() {
    const [department, setDepartment] = useState({
        title : '',
        description : '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [URL, setURL] = useState(apiUrl);
    const [state, setState] = useState('');
    let { dptSlug } = useParams();

   
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setURL(`${apiUrl}/${dptSlug}`);
            let json;
    
            try {
                const result = await fetch(URL);
    
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
    }, [URL]);

    async function deleteDepartment(slug) {
        const url = `${apiUrl}/${slug}`
        try {
            const response = await fetch(url, {
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
                <button className='department_delete_button' onClick={() => deleteDepartment(department.slug)}>
                   Eyða deild
                </button>
            </div>
            
        </section>
    )
}
