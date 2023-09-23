import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  defaults,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid:{
          display: false
        },
      },
    },
  };

  defaults.font.family = 'Lexend';
  ChartJS.options = options
  const chartData = {
    labels: data?.map((item) => item.date),
    datasets: [
      {
        label: 'Amount',
        data: data?.map((item) => item.count),
        backgroundColor: '#2733ea',
        borderRadius: 6,
      },
    ],
  };
  return <Bar options={options} data={chartData} />;
};

export default BarChart;
