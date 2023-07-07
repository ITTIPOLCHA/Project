import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import "moment/locale/th"; // หรือเลือก locale ที่ต้องการ

class Chart extends Component {
  chartRef = React.createRef();
  chartInstance = null;

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  renderChart() {
    const { chartData, displayTitle, displayLegend, legendPosition, location } =
      this.props;

    const options = {
      plugins: {
        title: {
          display: displayTitle,
          text: `Largest Cities In ${location}`,
          fontSize: 25,
        },
        legend: {
          display: displayLegend,
          position: legendPosition,
        },
      },
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
    };

    const canvas = this.chartRef.current;
    const ctx = canvas.getContext("2d");

    this.chartInstance = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: options,
    });
  }

  updateChart() {
    const { chartData } = this.props;

    this.chartInstance.data = chartData;
    this.chartInstance.update();
  }

  destroyChart() {
    this.chartInstance.destroy();
  }

  render() {
    return <canvas ref={this.chartRef} width="400" height="400" />;
  }
}

Chart.defaultProps = {
  displayTitle: true,
  displayLegend: true,
  legendPosition: "right",
  location: "City",
};

export default Chart;
