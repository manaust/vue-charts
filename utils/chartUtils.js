import { scaleOrdinal } from "d3";

export const lineColor = scaleOrdinal().range([
  "#FFD086",
  "#86F6FF",
  "#C786FF",
]);

export const fillColor = scaleOrdinal().range([
  "orange",
  "mediumturquoise",
  "blueviolet",
]);
