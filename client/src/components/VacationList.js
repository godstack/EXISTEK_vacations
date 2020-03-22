import React, { useState, useContext } from "react";
import classNames from "classnames";
import "../css/VacationList.css";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/auth.context";
import { ManipulateVacation } from "./ManipulateVacation";

const textObj = {
  title: "FORM FOR UPDATE VACATION",
  button: "Update"
};

export const VacationList = props => {
  const auth = useContext(AuthContext);
  const { vacationList } = auth.user;
  const [show, setShow] = useState(false);
  const [yearFilter, setYearFilter] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);
  const { request } = useHttp();
  const message = useMessage();

  const handleClick = event => {
    setShow(!show);
  };

  const handleDeleteItem = async index => {
    const data = await request("/api/employee/delete/vacation", "DELETE", {
      userId: auth.user._id,
      index
    });

    if (data.message) {
      message(data.message);
    }

    if (data.user) {
      auth.login(auth.token, data.user);
    }
  };

  return (
    <>
      <button className="btn" onClick={handleClick}>
        {show ? "Show vacation list" : "Hide vacation list"}
      </button>
      <div className={classNames("vacation-list", { "vac-hide": show })}>
        <h3>
          {vacationList.length === 0
            ? "You didn't add any vacation yet"
            : " Your vacations:"}
        </h3>
        {vacationList.length !== 0 && (
          <label className="year-filter">
            Year filter
            <input
              type="text"
              onChange={event => setYearFilter(event.target.value)}
              value={yearFilter}
            />
          </label>
        )}

        {vacationList.map((vacation, i) => {
          const yearFilterInt = parseInt(yearFilter, 10);
          if (
            yearFilterInt === new Date(vacation.start).getFullYear() ||
            yearFilter === ""
          ) {
            if (updateIndex !== i) {
              return (
                <div className="vac-item" key={i}>
                  <div className="item-description">
                    <p>
                      Start {vacation.start.split("T")[0]}, end{" "}
                      {vacation.end.split("T")[0]}
                    </p>

                    <p className="desc">Description: {vacation.description}</p>
                  </div>
                  <div className="item-buttons">
                    <button
                      className="btn btn-update"
                      onClick={() => setUpdateIndex(i)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDeleteItem(i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            } else if (updateIndex === i) {
              return (
                <ManipulateVacation
                  index={i}
                  textObj={textObj}
                  vacationInfo={vacation}
                  key={i}
                  setUpdateIndex={setUpdateIndex}
                />
              );
            }
          }

          return <></>;
        })}
      </div>
    </>
  );
};
