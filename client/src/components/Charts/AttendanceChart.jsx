// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getAttendanceRecords } from "../../api/attendanceApi";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Present Days",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Casual Leave",
        data: [],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Medical Leave",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Absent",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await getAttendanceRecords();
        const data = response.data;

        // Process the data to aggregate attendance information for each employee
        const attendanceSummary = {};

        data.forEach((record) => {
          const employeeName = record.employeeId.name;
          if (!attendanceSummary[employeeName]) {
            attendanceSummary[employeeName] = {
              presentDays: 0,
              casualLeave: 0,
              medicalLeave: 0,
              absent: 0,
            };
          }

          switch (record.status) {
            case "present":
              attendanceSummary[employeeName].presentDays += 1;
              break;
            case "casual_leave":
              attendanceSummary[employeeName].casualLeave += 1;
              break;
            case "medical_leave":
              attendanceSummary[employeeName].medicalLeave += 1;
              break;
            case "absent":
              attendanceSummary[employeeName].absent += 1;
              break;
            default:
              break;
          }
        });

        const labels = Object.keys(attendanceSummary);
        const presentDays = labels.map((label) => attendanceSummary[label].presentDays);
        const casualLeave = labels.map((label) => attendanceSummary[label].casualLeave);
        const medicalLeave = labels.map((label) => attendanceSummary[label].medicalLeave);
        const absent = labels.map((label) => attendanceSummary[label].absent);

        setChartData({
          labels,
          datasets: [
            {
              label: "Present Days",
              data: presentDays,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Casual Leave",
              data: casualLeave,
              backgroundColor: "rgba(255, 206, 86, 0.6)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
            {
              label: "Medical Leave",
              data: medicalLeave,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Absent",
              data: absent,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Employee Attendance Chart",
      },
    },
  };
 

  return <Bar data={chartData} options={options} />;
};

export default AttendanceChart;
