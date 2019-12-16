import React from "react";

const CharacterCard = props => {
  return (
    <div className="card" key={props.id}>
      <div className="cardImgBox">
        <img src={props.image} alt="..." />
        <div className="cardBoxTitle">
          <div className="title">{props.name}</div>
          <div className="subTitle">
            id: {props.id} - created {props.created}
          </div>
        </div>
      </div>

      <ul className="card-list">
        <li>
          <span className="title">Status</span>
          <span>{props.status}</span>
        </li>
        <li>
          <span className="title">species</span>
          <span>{props.species}</span>
        </li>
        <li>
          <span className="title">gender</span>
          <span>{props.gender}</span>
        </li>
        <li>
          <span className="title">origin</span>
          <span>{props.origin.name}</span>
        </li>
        <li>
          <span className="title">location</span>
          <span>{props.location.name}</span>
        </li>
      </ul>
    </div>
  );
};

export default CharacterCard;
