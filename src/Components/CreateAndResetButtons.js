import { Component } from "react";

export const SubmitAndResetButtons = (props) => {
  return (
    <div className="Twitter-button">
      <button onClick={props.handleSubmit}>{props.submitLabel}</button>
      {props.hideReset ? null : (
        <button onClick={props.handleReset}>{props.resetLabel}</button>
      )}
    </div>
  );
};
