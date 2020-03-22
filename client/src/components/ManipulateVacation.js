import React, { useState, useContext } from "react";
import "../css/ManipulateVacation.css";
import { useMessage } from "../hooks/message.hook";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";

const msPerDay = 24 * 60 * 60 * 1000;

export const ManipulateVacation = props => {
  const { textObj, user, index, vacationInfo, setUpdateIndex } = props;
  const message = useMessage();
  const auth = useContext(AuthContext);

  const fullDateNow = new Date();

  const cutDateNow = new Date(
    fullDateNow.getUTCFullYear(),
    fullDateNow.getUTCMonth(),
    fullDateNow.getUTCDate() + 2
  );

  let initialDate = {
    start: cutDateNow,
    end: cutDateNow,
    description: ""
  };

  if (vacationInfo) {
    const DateStart = new Date(vacationInfo.start);
    const DateEnd = new Date(vacationInfo.end);

    initialDate = {
      start: DateStart,
      end: DateEnd,
      description: vacationInfo.description
    };
  }

  const [date, setDate] = useState(initialDate);

  const timeEnd = new Date(date.end).getTime();
  const timeStart = new Date(date.start).getTime();

  let vacLength = (timeEnd - timeStart) / msPerDay;
  vacLength = Math.floor(vacLength) + 1;

  const { request } = useHttp();

  const handleAddVacation = async () => {
    const data = await request("/api/employee/add/vacation", "POST", {
      date,
      userId: auth.user._id
    });

    if (data.message) {
      message(data.message);
    }

    if (data.user) {
      auth.login(auth.token, data.user);

      setDate(initialDate);
    }
  };

  const handleUpdateVacation = async () => {
    const data = await request("/api/employee/update/vacation", "POST", {
      date,
      userId: auth.user._id,
      index
    });

    if (data.message) {
      message(data.message);
    }

    if (data.user) {
      auth.login(auth.token, data.user);

      setDate(initialDate);
    }

    setUpdateIndex(null);
  };

  const handleDateChange = event => {
    const { name, value } = event.target;

    const newDate = new Date(value);

    if (name === "start" && date.end < newDate) {
      setDate({ ...date, start: newDate, end: newDate });
    } else if (name !== "description") {
      setDate({ ...date, [name]: newDate });
    } else {
      setDate({ ...date, [name]: value });
    }
  };

  return (
    <div className="add-vacation">
      <div className="title">
        {textObj.title}
        {index !== undefined ? ` № ${index + 1}` : ""}
      </div>
      <div className="date">
        <div className="new-vac-length">
          New vacation length <span>{vacLength}</span> day(s)
        </div>
        <label>
          Start Date
          <input
            type="date"
            name="start"
            min={cutDateNow.toISOString().split("T")[0]}
            onChange={handleDateChange}
            value={date.start.toISOString().split("T")[0]}
          />
        </label>

        <label>
          End Date
          <input
            type="date"
            name="end"
            min={date.start.toISOString().split("T")[0]}
            onChange={handleDateChange}
            value={date.end.toISOString().split("T")[0]}
          />
        </label>
      </div>
      <div className="description">
        <label>
          Description
          <textarea
            type="text"
            name="description"
            onChange={handleDateChange}
            value={date.description}
            placeholder="Description"
          />
        </label>

        <button
          className="btn"
          onClick={
            textObj.button === "Add" ? handleAddVacation : handleUpdateVacation
          }
        >
          {textObj.button} vacation
        </button>
      </div>

      {setUpdateIndex && (
        <div className="close-area">
          <button
            className="btn btn-close"
            onClick={() => setUpdateIndex(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
