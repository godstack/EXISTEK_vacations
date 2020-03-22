import React, { useState } from "react";
import "../css/ExpectedDate.css";
import { useMessage } from "../hooks/message.hook";

const msPerDay = 24 * 60 * 60 * 1000;
const averageDaysPerMonth = 30.5;

export const ExpectedDate = props => {
  const { balance } = props;
  const message = useMessage();

  const [date, setDate] = useState(new Date(Date.now() + msPerDay));

  const showExpectedBalance = () => {
    const dateFromInput = new Date(date).getTime();
    const dateNow = new Date().getTime();

    const differenceInMonth = Math.floor(
      (dateFromInput - dateNow) / (msPerDay * averageDaysPerMonth)
    );

    const expectedBalance = balance + Math.floor(differenceInMonth * 1.75);

    message(
      `On ${
        new Date(date).toISOString().split("T")[0]
      } balance will be ${expectedBalance} day(s)`
    );

    setDate(new Date(Date.now() + msPerDay));
  };

  return (
    <div className="expected-date-wrapper">
      <label>
        Choose date to see expected balance
        <input
          type="date"
          min={new Date(Date.now() + msPerDay).toISOString().split("T")[0]}
          onChange={event => setDate(event.target.value)}
          value={new Date(date).toISOString().split("T")[0]}
        />
      </label>
      <button className="btn" onClick={showExpectedBalance}>
        {" "}
        Show Expected balance
      </button>
    </div>
  );
};
