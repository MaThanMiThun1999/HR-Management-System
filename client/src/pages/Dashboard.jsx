// eslint-disable-next-line no-unused-vars
import React from "react";
import AttendanceChart from "../components/Charts/AttendanceChart";
import SalaryChart from "../components/Charts/SalaryChart";
import EmployeeChart from "../components/Charts/EmployeeChart";
import EmployeeBubbleChart from '../components/Charts/EmployeeBubbleChart';
import WeeklyAttendanceDistributionChart from '../components/Charts/WeeklyAttendanceDistributionChart';

const Dashboard = () => {

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">
      <div>
        <p className="text-xl font-bold p-4">Welcome to the dashboard {localStorage.getItem("userData") ? localStorage.getItem("userData") : ""}</p>
        <div className='w-[90%] md:w-full mx-auto'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="bg-white overflow-hidden shadow-lg rounded-lg border-2 border-black/50">
              <AttendanceChart />
            </div>
            <div className="bg-white overflow-hidden shadow-lg rounded-lg border-2 border-black/50">
              <SalaryChart />
            </div>
            <div className="bg-white overflow-hidden shadow-lg rounded-lg p-2 border-2 border-black/50">
              <EmployeeChart />
            </div>
          </div>
          <div className="mt-5 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="bg-white overflow-hidden shadow-lg rounded-lg p-2 border-2 border-black/50">
              <EmployeeBubbleChart />
            </div>
            <div className="bg-white overflow-hidden shadow-lg rounded-lg p-2 border-2 border-black/50">
              <WeeklyAttendanceDistributionChart />
            </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
