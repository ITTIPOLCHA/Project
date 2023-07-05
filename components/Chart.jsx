import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const Chart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const q = query(
        collection(db, "your_collection_name"),
        orderBy("createdAt")
      );

      onSnapshot(q, (querySnapshot) => {
        const sysData = [];
        const diaData = [];
        const pulData = [];
        const labels = [];

        querySnapshot.forEach((doc) => {
          const { sys, dia, pul, createdAt } = doc.data();
          sysData.push(sys);
          diaData.push(dia);
          pulData.push(pul);
          labels.push(createdAt.toDate().toLocaleString());
        });

        const updatedChartData = {
          labels,
          datasets: [
            {
              label: "SYS",
              data: sysData,
              borderColor: "red",
              fill: false,
            },
            {
              label: "DIA",
              data: diaData,
              borderColor: "blue",
              fill: false,
            },
            {
              label: "PUL",
              data: pulData,
              borderColor: "green",
              fill: false,
            },
          ],
        };

        setChartData(updatedChartData);
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                  displayFormats: {
                    day: "MMM D",
                  },
                },
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Value",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
