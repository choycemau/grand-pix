import axios from "axios";
import React from "react";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import Banner from "./components/Banner";
import Search from "./components/Search";
import Table from "./components/Table";
import style from "./index.scss";
import cn from "classnames";

const Application = ({
  filteredData,
  searchStations,
  sortColumn,
  sortBy,
  sortedColumn,
}) => (
  <div className={cn(style.container)}>
    <Banner />
    <Search onSearch={searchStations} />
    <Table
      data={filteredData ? filteredData : null}
      onSort={sortColumn}
      sortBy={sortBy}
      sortedColumn={sortedColumn}
    />
  </div>
);

const enhancer = compose(
  withState("data", "setData", null),
  withState("filteredData", "setFilteredData", null),
  withState("sortBy", "setSortBy", "none"),
  withState("sortedColumn", "setSortedColumn", null),
  lifecycle({
    componentDidMount() {
      const { setData, setFilteredData } = this.props;
      axios
        .get("https://ergast.com/api/f1/2004/1/results.json")
        .then(({ data }) => {
          const results = data.MRData.RaceTable.Races[0].Results;

          const finalResults = Object.values(results).map((value) => {
            return {
              position: value.position,
              number: value.number,
              driver: value.Driver.givenName + " " + value.Driver.familyName,
              nationality: value.Driver.nationality,
              car: value.Constructor.name,
              laps: value.laps,
              fastestLapTime: value.FastestLap.Time.time,
              fastestLapSpeed: value.FastestLap.AverageSpeed.speed,
            };
          });

          setData(finalResults);
          setFilteredData(finalResults);
        })
        .catch((error) => console.log(error));
    },
  }),
  withHandlers({
    searchStations: ({ data, setFilteredData }) => (e) => {
      let finalList = [];
      const filter = e.target.value;

      if (e.target.value !== "") {
        finalList = data.filter(
          ({
            position,
            number,
            driver,
            nationality,
            car,
            laps,
            fastestLapTime,
            fastestLapSpeed,
          }) => {
            const pos = position.includes(filter);
            const num = number.includes(filter);
            const dri = driver.toLowerCase().includes(filter.toLowerCase());
            const nat = nationality
              .toLowerCase()
              .includes(filter.toLowerCase());
            const ca = car.toLowerCase().includes(filter.toLowerCase());
            const lap = laps.includes(filter);
            const flt = fastestLapTime.includes(filter);
            const fls = fastestLapSpeed.includes(filter);
            return pos || num || dri || nat || ca || lap || flt || fls;
          }
        );
      } else {
        finalList = data;
      }

      setFilteredData(finalList);
    },
    sortColumn: ({
      filteredData,
      setFilteredData,
      setSortBy,
      sortBy,
      sortedColumn,
      setSortedColumn,
    }) => (e) => {
      const sortedData = filteredData.sort((a, b) => {
        if (e === "driver" || e === "nationality" || e === "car") {
          return eval("a." + e) > eval("b." + e) ? 1 : -1;
        } else if (e === "fastestLapTime") {
          return a.fastestLapTime.substr(2) - b.fastestLapTime.substr(2);
        } else {
          return eval("a." + e) - eval("b." + e);
        }
      });

      let finalSorted = null;

      if (sortedColumn !== e) {
        setSortedColumn(e);
        finalSorted = sortedData;
        setSortBy("inc");
      } else {
        if (sortBy === "none") {
          finalSorted = sortedData;
          setSortBy("inc");
        } else if (sortBy === "inc") {
          finalSorted = sortedData.reverse();
          setSortBy("dec");
        } else if (sortBy === "dec") {
          finalSorted = filteredData.sort((a, b) => a.position - b.position);
          setSortBy("none");
        }
      }

      setFilteredData(finalSorted);
    },
  })
);
export default enhancer(Application);
