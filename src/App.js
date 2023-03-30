import React from 'react';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import { Departments } from './components/departments/Departments';
import { Department } from './components/departments/Department';
import { Courses } from './components/courses/Courses';
import { Layout } from './components/layout/Layout';

export default function App() {

  return (
    <Layout title="Kennsluskrá" footer={
      <p>Vefforritun 2 - 2023 - Verkefni 4</p>
    }>
      <Routes>
          <Route exact path='/' element={<Departments/>}/>
          <Route path="/:dptSlug" element={<Department />}/>
          <Route path="/:dptSlug/courses" element={<Courses />}/>
       </Routes>
    </Layout>
  );
}