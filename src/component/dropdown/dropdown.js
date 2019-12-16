import React, { useState, useEffect } from "react";
import Service from "../../service/service";

const DropDown = () => {
  const [ddValue, setDDValue] = useState([]);

  state = {
    ddUrl: this.props.ddUrl,
    databases: [],
    selecteddatabase: "",
    validationError: "",
    isddLoading: false,
    ddId: ""
  };

  return (
    <div>
      {this.state.isddLoading && (
        <select
          id={this.state.ddId + "ddlselect"}
          className="form-control"
          disabled={this.props.disabled}
          value={this.state.selecteddatabase}
          onChange={e => this.ddSelected(e)}
        >
          {this.state.databases.map(database => (
            <option key={database.value} value={database.value}>
              {database.name}
            </option>
          ))}
        </select>
      )}
      <div style={{ color: "red", marginTop: "5px" }}>
        {this.state.validationError}
      </div>
    </div>
  );
};

export default class DropDown extends Component {
  state = {
    ddUrl: this.props.ddUrl,
    databases: [],
    selecteddatabase: "",
    validationError: "",
    isddLoading: false,
    ddId: ""
  };

  callBackDDFunction = data => {
    this.setState({
      ddId: this.props.optionFirst.replace(" ", ""),
      databases: [
        { value: "", name: "Select " + this.props.optionFirst }
      ].concat(data.data),
      isddLoading: true
    });
  };

  errorCallBackFunction = data => {
    if (!data.data.status) {
      this.setState({
        databases: [{ value: "", name: "Select " + this.props.optionFirst }],
        isddLoading: true
      });
    }
  };

  callBackObject = data => {
    this.setState({
      ddId: this.props.optionFirst.replace(" ", ""),
      databases: [
        { value: "", name: "Select " + this.props.optionFirst }
      ].concat(data),
      isddLoading: true
    });
  };

  componentDidUpdate(prevProps) {
    if (typeof this.state.ddUrl !== "object") {
      if (prevProps.ddUrl !== this.props.ddUrl) {
        this.setState({
          ddUrl: this.props.ddUrl
        });
        let R1DDService = new R1IService(
          this.props.ddUrl,
          {},
          this.callBackDDFunction,
          this.errorCallBackFunction
        );
        R1DDService.get();
      }
    } else {
      if (prevProps.ddUrl.length !== this.props.ddUrl.length) {
        this.callBackObject(this.props.ddUrl);
      }
    }

    if (this.props.isReset !== undefined) {
      if (prevProps.isReset !== this.props.isReset) {
        document.getElementById(this.state.ddId + "ddlselect").selectedIndex =
          "0";
      }
    }
  }

  componentDidMount() {
    if (typeof this.state.ddUrl !== "object") {
      let R1DDService = new R1IService(
        this.state.ddUrl,
        {},
        this.callBackDDFunction,
        this.errorCallBackFunction
      );
      R1DDService.get();
    } else {
      this.callBackObject(this.state.ddUrl);
    }
  }

  ddSelected = e => {
    let idx = e.target.selectedIndex;
    this.props.onSelectDropDown(e.target.options[idx]);
    let title = this.props.optionFirst;
    this.setState({
      selecteddatabase: e.target.value,
      validationError: e.target.value === "" ? "You must select " + title : ""
    });
    //onChange={(e) => this.setState({selecteddatabase: e.target.value, validationError: e.target.value === "" ? "You must select database" : ""})}
  };

  render() {}
}
