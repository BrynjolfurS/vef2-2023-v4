import React from 'react';
import './Layout.css';

export function Layout({title, children, footer}) {
    return (
        <div>
            <header className='layout_header'>
                <h1 className='layout_header_title'>{title}</h1>
            </header>
            <main className='layout_main'>
                {children}
            </main>
            <footer className='layout_footer'>{footer}</footer>
        </div>
    )
}