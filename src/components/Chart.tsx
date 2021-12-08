import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CoreChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
  ScaleChartOptions,
  LineControllerChartOptions,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { _DeepPartialObject } from 'chart.js/types/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type OptionsType = _DeepPartialObject<CoreChartOptions<"line"> & ElementChartOptions<"line"> & PluginChartOptions<"line"> & DatasetChartOptions<"line"> & ScaleChartOptions<"line"> & LineControllerChartOptions>;

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,2,3,4,5,6,7],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

function Chart({dataSet, color = 'rgb(255, 99, 132)', darkestColor = 'rgba(255, 99, 132, 0.5)', label = "", title}) {
  const labels = dataSet.map(item => item.created_at);
  const values = dataSet.map(item => item.value);

  const options: OptionsType = {
    responsive: true,
    plugins: {
      legend: {
        display: false
        // position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: label
        }
      }
    } 
  };

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: label,
        data: values,
        borderColor: color,
        backgroundColor: darkestColor,
      }
    ],
  };

  return <Line options={options} data={data} />;
}


export default Chart;