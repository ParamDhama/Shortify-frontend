/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ChartComponent({ links=[] }) {
  // Month labels
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Initialize an object to store clicks per month
  const monthlyClicks = new Array(12).fill(0); // [0, 0, 0, ..., 0] (12 months)

  if (!Array.isArray(links)) return null;

  // Process links to count clicks per month
  links.forEach((link) => {
    const monthIndex = new Date(link.createdAt).getMonth(); // Extract month index (0-11)
    monthlyClicks[monthIndex] += link.clicks; // Add clicks to corresponding month
  }); 

  // Chart data
  const data = {
    labels: months, // Month names
    datasets: [
      {
        label: "Clicks",
        data: monthlyClicks, // Dynamic data
        backgroundColor: "rgba(0, 130, 54, 1)", // Green bars
        borderRadius: 5,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 10, color: "" },
        grid: { drawBorder: false },
      },
      x: {
        ticks: { color: "#555" },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false }, // Hide legend
    },
  };

  return (
    <div className="max-md:bg-gray-100 bg-white p-4 shadow-md">
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default ChartComponent;
