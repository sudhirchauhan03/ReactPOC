import React from "react";

export const CheckBox = props => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        value={props.value}
        id={props.id}
        name={props.tag}
        onChange={e => props.onHandelChecked(e, props.index)}
      />
      <label className="custom-control-label" htmlFor={props.name}>
        {props.name}
      </label>
    </div>
  );
};

export const Filter = props => {
  return (
    <div className="filterTag">
      {props.name}
      <span className="fIcon" onClick={e => props.onFilter(e, props.index)}>
        X
      </span>
    </div>
  );
};
