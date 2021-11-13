import { scaleOrdinal } from "d3";

export const generateDefaultChartConfig = () => {
  return {
    showLegend: true,
    showAxes: true,
    margin: {
      top: 10,
      right: 30,
      bottom: 30,
      left: 60,
    },
  };
};

export const formatDateTick = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date(date);
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${month} ${year}`;
};

export const lineColor = scaleOrdinal().range(["#FFD086", "#86F6FF"]);

export const fillColor = scaleOrdinal().range(["#FFA500", "#36CFE3"]);
