import React from "react";
import style from "../index.scss";
import cn from "classnames";

export default ({ children, onClick, wider, widest }) => (
  <div
    className={cn(
      style.cell,
      widest ? style.widestcell : wider ? style.widercell : null
    )}
    onClick={onClick}
  >
    {children}
  </div>
);
