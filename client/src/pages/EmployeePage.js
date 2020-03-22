import React, { useContext, useState } from "react";

import { AuthContext } from "../context/auth.context";

import "../css/EmployeePage.css";
import { ManipulateVacation } from "../components/ManipulateVacation";
import { VacationList } from "../components/VacationList";
import { ExpectedDate } from "../components/ExpectedDate";

const textObj = {
  title: "FORM FOR ADDING NEW VACATION",
  button: "Add"
};

export const EmployeePage = () => {
  const auth = useContext(AuthContext);

  const { user } = auth;

  return (
    <div className="employee-wrapper">
      <div className="balance">
        {user.email} available balance <span>{user.balance}</span> day(s)
      </div>
      <ExpectedDate balance={user.balance} />
      <ManipulateVacation textObj={textObj} />
      <VacationList />
    </div>
  );
};
