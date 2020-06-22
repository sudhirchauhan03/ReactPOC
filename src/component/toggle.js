import React, { useState } from "react";
import styled from "styled-components";
import "../../../fonts/font.css";

const PanelDefault = styled.div`
  position: relative;
  padding: ${props => (props.isAccordian ? "10px 0px" : "10px")};
  margin-bottom: 5px;
  border-radius: 4px;
  background-color: #fff;
  border: ${props =>
    props.isAccordian !== undefined ? " 0px" : "1px solid #ddd"};
  border-radius: 4px;
  box-shadow: ${props =>
    props.isAccordian !== undefined
      ? "unset"
      : "0 1px 1px rgba(0, 0, 0, 0.05);"};
`;

const ToggleHeading = styled.div`
  color: #333;
  background-color: #fff;
  border-color: #ddd;
`;

const HeadingTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  color: inherit;
`;

const HeadingAnchor = styled.a`
  color: #0057b8;
  font-family: Rogan-Regular;
  font-size: 18px;
  font-weight: bold;
  padding-left: 20px;
`;

const ToggleBody = styled.div`
  display: ${props => (props.isOpen ? "block" : "none")};
`;

const Toogle = props => {
  const [isOn, setOpended] = useState(props.isOn);

  const handleToggle = e => {
    e.preventDefault();
    setOpended(!isOn);
  };

  let headerClassName = [
    isOn && props.isPanel !== undefined
      ? "accordion-Plus"
      : isOn && props.isPanel === undefined
      ? "accordion-toggle"
      : !isOn && props.isPanel !== undefined
      ? "accordion-Plus collapsed"
      : "accordion-toggle collapsed"
  ];

  return (
    <PanelDefault isAccordian={props.isPanel}>
      <ToggleHeading>
        <HeadingTitle>
          <HeadingAnchor
            href="/#"
            onClick={e => handleToggle(e)}
            className={headerClassName}
            isClassName={props.isOn}
            isPanel={props.isPanel}
          >
            {props.title}
          </HeadingAnchor>
        </HeadingTitle>
      </ToggleHeading>
      <ToggleBody isOpen={isOn}>{props.children}</ToggleBody>
    </PanelDefault>
  );
};

export default Toogle;
