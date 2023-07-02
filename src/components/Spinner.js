import React from "react";
import loading from "./Fidget-spinner.gif";
const Spinner = (props) => {
  return (
    <div className="text-center">
      <img src={loading} alt="" />
    </div>
  );
};

export default Spinner;
