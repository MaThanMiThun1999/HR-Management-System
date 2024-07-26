// eslint-disable-next-line no-unused-vars
import React from 'react';
import SalaryList from '../components/Salary/SalaryList';
import CreateSalaryReport from '../components/Salary/CreateSalaryReport';

const Salaries = () => {
  return (
    
      <main className='p-8'>
        <CreateSalaryReport />
        <SalaryList />
      </main>
  
  );
};

export default Salaries;
