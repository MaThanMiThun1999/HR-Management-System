// eslint-disable-next-line no-unused-vars
import React from "react";
import EmployeeList from "../components/Employee/EmployeeList";

const Employees = () => {
  return (
    <main className='w-[95%] lg:w-full mx-auto'>
      <section className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Employee Management</h1>
      </div>
      <EmployeeList />
    </section>
    </main>
  );
};

export default Employees;
