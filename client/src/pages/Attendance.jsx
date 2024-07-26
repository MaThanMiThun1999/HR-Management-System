// eslint-disable-next-line no-unused-vars
import React from "react";
import AttendanceList from "../components/Attendance/AttendanceList";
import AttendanceDetails from '../components/Attendance/AttendanceDetails';

const Attendance = () => {
  return (
    <main className='w-[95%] lg:w-full mx-auto'>
      <section className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
       
       <div className="mb-4">
           <h1 className="text-2xl font-semibold text-gray-800">Attendance Management</h1>
       </div>
     <AttendanceDetails/>
     <AttendanceList />
   </section>
    </main>
  );
};

export default Attendance;
