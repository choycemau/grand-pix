import React from "react";
import style from "../index.scss";
import cn from "classnames";

export default ({ onSearch }) => (
  <div className={cn(style.search)}>
    <input placeholder={"Search..."} onChange={(e) => onSearch(e)}></input>
  </div>
);
