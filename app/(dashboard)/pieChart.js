import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  defaults,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const PieChart = ({data}) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  defaults.font.family = 'Lexend';
  const chartData = {
    labels: data?.map((item) => item.title),
    datasets: [
      {
        data: data?.map((item) => item.related_item),
        backgroundColor: ['#2733ea', '#ff6174','#2dd4bf'], // 为每个部分设置颜色
        borderColor: ['#ffffff'],
        borderWidth: 4,
        hoverOffset: 10,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return <Doughnut options={options} data={chartData} />;
};

export default PieChart;
