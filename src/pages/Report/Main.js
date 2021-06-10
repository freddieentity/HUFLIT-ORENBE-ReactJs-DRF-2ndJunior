import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const baseURL = process.env.REACT_APP_BACKEND_API;

export default function Main() {
  const [top5HotelsBooked, setTop5HotelsBooked] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/hotels/report/`)
      .then((res) => {
        setTop5HotelsBooked(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ textAlign: "center", fontWeight: "bold" }}>
      <h1>
        <strong>Top 5 Hotel Being Booked The Most</strong>
      </h1>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <PieChart width={400} height={400}>
          <Pie
            dataKey="bookingRateCount"
            isAnimationActive={true}
            data={top5HotelsBooked}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#943318"
          />

          <Tooltip />
        </PieChart>

        <BarChart
          width={1200}
          height={300}
          data={top5HotelsBooked}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="hotel_id__name" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="bookingRateCount"
            fill="#417362"
            background={{ fill: "#c8dbd5" }}
          />
        </BarChart>
      </div>
    </div>
  );
}
