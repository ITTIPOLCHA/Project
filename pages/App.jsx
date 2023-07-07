import React, { useEffect, useRef, useState } from "react";
import Chart from "../components/Chart";
import { getBPs } from "../api/bp";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import "moment/locale/th"; // หรือเลือก locale ที่ต้องการ

const App = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Population",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  });

  const chartRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    getChartData();
  }, [user]);

  const getChartData = () => {
    getBPs(user, (bps) => {
      const labels = bps.map((bp) =>
        moment(bp.createdAt.toDate()).format("ll")
      ); // ใช้ moment เพื่อแปลงรูปแบบวันที่
      const data = bps.map((bp) => bp.value);

      const updatedChartData = {
        ...chartData,
        labels,
        datasets: [
          {
            ...chartData.datasets[0],
            data,
          },
        ],
      };

      setChartData(updatedChartData);
    });
  };

  useEffect(() => {
    renderChart();
  }, [chartData]);

  const renderChart = () => {
    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              tooltipFormat: "ll", // รูปแบบการแสดงผลใน Tooltip ของวันที่
              displayFormats: {
                day: "ll", // รูปแบบการแสดงผลในแกน x
              },
            },
          },
        },
      },
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to React</h2>
      </div>
      <canvas ref={chartRef} width="400" height="400" />
    </div>
  );
};

export default App;
