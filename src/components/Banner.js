import React from "react";
import bgImage from "../asset/logo.png";
import Track from "../asset/track.svg";
import style from "../index.scss";
import cn from "classnames";

export default () => (
  <div className={cn(style.banner)}>
    <img src={bgImage} />
    Australian Grand Pix
    <label>
      <Track />
      Albert Park Grand Prix Circuit, Melbourne, Australia
    </label>
  </div>
);
