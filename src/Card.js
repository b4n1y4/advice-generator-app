import { React, useEffect, useState } from "react";

import dividerMobile from "./images/pattern-divider-mobile.svg";
import dividerDesktop from "./images/pattern-divider-desktop.svg";
import iconDice from "./images/icon-dice.svg";

const Card = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hit, setHit] = useState(true);
  const fetchData = () => {
    setIsLoading(true);
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((response) => {
        console.log(response.slip);
        setData(response.slip);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("err");
      });
  };
  useEffect(() => {
    fetchData();
  }, [hit]);
  return (
    <div className="card">
      {isLoading ? (
        <p className="loading text">Loading...</p>
      ) : (
        <div className="card-contents">
          <p className="advice-id">ADVICE #{data.id}</p>
          <p className="advice-text">&ldquo;{data.advice}&rdquo;</p>
          <img
            src={window.innerWidth >= 375 ? dividerDesktop : dividerMobile}
            alt=""
            className="divider"
          />
          <button className="generator">
            <img
              src={iconDice}
              alt=""
              onClick={() => window.location.reload(true)}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
