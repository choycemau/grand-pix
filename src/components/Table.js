import React from "react";
import Cell from "./Cell";
import Arrow from "../asset/up-arrow.svg";
import style from "../index.scss";
import cn from "classnames";

const tableData = [
  { label: "Pos", value: "position" },
  { label: "No.", value: "number" },
  { label: "Driver", value: "driver" },
  { label: "Nationality", value: "nationality" },
  { label: "Car", value: "car" },
  { label: "Laps", value: "laps" },
  { label: "Fastest \n Lap Time", value: "fastestLapTime" },
  { label: "Average \n Speed", value: "fastestLapSpeed" },
];

export default ({ data, onSort, sortBy, sortedColumn }) => (
  <div className={cn(style.table)}>
    <div className={cn(style.tableRow, style.tableHeader)}>
      {tableData.map(({ label, value }, index) => (
        <Cell
          onClick={() => onSort(value)}
          key={index}
          widest={value === "driver"}
          wider={
            value === "nationality" ||
            value === "fastestLapTime" ||
            value === "fastestLapSpeed"
          }
        >
          {label}
          {sortedColumn === value ? (
            <Arrow
              className={cn(
                sortBy === "dec"
                  ? style.dec
                  : sortBy === "inc"
                  ? style.inc
                  : null
              )}
            />
          ) : null}
        </Cell>
      ))}
    </div>
    <div className={cn(style.tableContent)}>
      {data && data.length != 0 ? (
        data.map((content, index) => (
          <div className={cn(style.tableRow)} key={index}>
            {tableData.map(({ value }, index) => (
              <Cell
                key={index}
                widest={value === "driver"}
                wider={
                  value === "nationality" ||
                  value === "fastestLapTime" ||
                  value === "fastestLapSpeed"
                }
              >
                {eval("content." + value)}
                {value === "fastestLapSpeed" ? " kph" : null}
              </Cell>
            ))}
          </div>
        ))
      ) : (
        <label className={cn(style.noResult)}> No Results found </label>
      )}
    </div>
  </div>
);
