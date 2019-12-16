import React, { Component } from "react";
import Services from "../service/service";
import CharacterCard from "../component/characterCard";
import { CheckBox, Filter } from "../component/checkbox";

import "../css/style.css";

export default class TableGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      species: [
        {
          id: 1,
          value: "Human",
          name: "Human",
          checked: false,
          tag: "species"
        },
        {
          id: 2,
          value: "Alien",
          name: "Alien",
          checked: false,
          tag: "species"
        },
        {
          id: 3,
          value: "Other Species",
          name: "Other Species",
          checked: false,
          tag: "species"
        }
      ],
      gender: [
        {
          id: 1,
          value: "Male",
          name: "Male",
          checked: false,
          tag: "gender"
        },
        {
          id: 2,
          value: "Female",
          name: "Female",
          checked: false,
          tag: "gender"
        }
      ],
      origin: [
        {
          id: 1,
          value: "Unknown",
          name: "Unknown",
          checked: false,
          tag: "origin"
        },
        {
          id: 2,
          value: "Earth",
          name: "Post-Apocalyptic Earth",
          checked: false,
          tag: "origin"
        },
        {
          id: 3,
          value: "Nupita",
          name: "Nupita 4",
          checked: false,
          tag: "origin"
        },
        {
          id: 4,
          value: "Other",
          name: "Other Origin...",
          checked: false,
          tag: "origin"
        }
      ],
      characterData: [],
      filterData: [],
      filterList: [],
      sort: "asc"
    };

    this.result = [];
    this.listResult = [];
    this.Obj = {
      species: [],
      gender: [],
      origin: []
    };
  }
  callBackFunction = response => {
    this.setState({
      characterData: response.results,
      filterData: response.results
    });
  };

  componentDidMount = () => {
    const service = new Services(
      `https://rickandmortyapi.com/api/character/`,
      this.callBackFunction
    );
    service.get();
  };

  // onHandelSpecies = (e, idx) => {
  //   let newItems = this.state.species.slice();
  //   newItems[idx].checked = !newItems[idx].checked;
  //   this.setState({
  //     species: newItems,
  //     characterData: this.state.filterData
  //   });

  //   if (this.result.indexOf(newItems[idx]) === -1) {
  //     this.result.push(newItems[idx]);
  //   } else {
  //     this.result.splice(this.result.indexOf(newItems[idx]), 1);
  //   }

  //   this.setState({
  //     filterList: this.result
  //   });

  //   this.filterObject(this.result);
  // };

  // onHandelGender = (e, idx) => {
  //   let newItems = this.state.gender.slice();
  //   newItems[idx].checked = !newItems[idx].checked;
  //   this.setState({
  //     gender: newItems,
  //     characterData: this.state.filterData
  //   });

  //   if (this.result.indexOf(newItems[idx]) === -1) {
  //     this.result.push(newItems[idx]);
  //   } else {
  //     this.result.splice(this.result.indexOf(newItems[idx]), 1);
  //   }

  //   this.setState({
  //     filterList: this.result
  //   });
  //   this.filterObject(this.result);
  // };

  // onHandelOrigin = (e, idx) => {
  //   let newItems = this.state.origin.slice();
  //   newItems[idx].checked = !newItems[idx].checked;
  //   this.setState({
  //     origin: newItems,
  //     characterData: this.state.filterData
  //   });

  //   if (this.result.indexOf(newItems[idx]) === -1) {
  //     this.result.push(newItems[idx]);
  //   } else {
  //     this.result.splice(this.result.indexOf(newItems[idx]), 1);
  //   }

  //   this.setState({
  //     filterList: this.result
  //   });
  //   this.filterObject(this.result);
  // };

  onHnadelFilter = (e, idx) => {
    let array = [...this.state.filterList];

    array.splice(idx, 1);
    this.setState({ filterList: array });

    this.setState({
      characterData: this.state.filterData
    });
  };

  checkBoxClick = e => {
    if (this.Obj[e.target.name].indexOf(e.target.value) === -1) {
      this.Obj[e.target.name].push(e.target.value);
    } else {
      this.Obj[e.target.name].splice(
        this.Obj[e.target.name].indexOf(e.target.value),
        1
      );
    }

    if (this.listResult.indexOf(e.target.value) === -1) {
      this.listResult.push(e.target.value);
    } else {
      this.listResult.splice(this.listResult.indexOf(e.target.value), 1);
    }

    this.setState({
      filterList: this.listResult
    });

    console.log(this.listResult);

    this.filterObject(this.Obj);
  };

  filterObject = checkArray => {
    let resultObj = [];
    let flag = false;

    let filterArr = Object.keys(checkArray);
    this.state.characterData.forEach(data => {
      let sFlag = false;
      let gFlag = false;
      let oFlag = false;
      if (checkArray[filterArr[0]].length > 0) {
        for (let i = 0; i < checkArray[filterArr[0]].length; i++) {
          if (
            data[filterArr[0]].toLowerCase() ===
            checkArray[filterArr[0]][i].toLowerCase()
          ) {
            sFlag = true;
          }
        }
      } else {
        sFlag = true;
      }

      if (checkArray[filterArr[1]].length > 0) {
        for (let i = 0; i < checkArray[filterArr[1]].length; i++) {
          if (
            data[filterArr[1]].toLowerCase() ===
            checkArray[filterArr[1]][i].toLowerCase()
          ) {
            gFlag = true;
          }
        }
      } else {
        gFlag = true;
      }

      if (checkArray[filterArr[2]].length > 0) {
        for (let i = 0; i < checkArray[filterArr[2]].length; i++) {
          if (
            data[filterArr[2]].name.toLowerCase() ===
            checkArray[filterArr[2]][i].toLowerCase()
          ) {
            oFlag = true;
          }
        }
      } else {
        oFlag = true;
      }

      if (sFlag && gFlag && oFlag) {
        resultObj.push(data);
        flag = true;
      }
    });

    this.setState({
      filterData: resultObj
    });
  };

  onSorting = e => {
    const { filterData } = this.state;

    this.setState({
      characterData: filterData.sort((a, b) => {
        let col1 = a.id === null ? " " : a.id;
        let col2 = b.id === null ? " " : b.id;
        return e.target.value !== "asc"
          ? col1 > col2
            ? -1
            : 1
          : col1 < col2
          ? -1
          : 1;
      })
    });
  };

  render() {
    console.log(this.state.filterList);
    return (
      <div className="container">
        <div className="leftContainer">
          <h2>Filters </h2>
          <div className="filterBox">
            <div className="heading">
              <h3>Species</h3>
            </div>
            {this.state.species.map((list, idx) => (
              <CheckBox
                onHandelChecked={this.checkBoxClick}
                index={idx}
                {...list}
              />
            ))}
          </div>
          <div className="filterBox">
            <div className="heading">
              <h3>Gender</h3>
            </div>
            {this.state.gender.map((list, idx) => (
              <CheckBox
                onHandelChecked={this.checkBoxClick}
                index={idx}
                {...list}
              />
            ))}
          </div>
          <div className="filterBox">
            <div className="heading">
              <h3>Origin</h3>
            </div>
            {this.state.origin.map((list, idx) => (
              <CheckBox
                onHandelChecked={this.checkBoxClick}
                index={idx}
                {...list}
              />
            ))}
          </div>
        </div>
        <div className="rightContainer">
          <div className="wrapHeading">
            <h2>Selected Filters </h2>

            {this.state.filterList.map((item, idx) => (
              <Filter name={item} index={idx} onFilter={this.onHnadelFilter} />
            ))}
          </div>

          <select className="sortDropDown" onChange={e => this.onSorting(e)}>
            <option value="">Sort by Id</option>
            <option value="asc">Ascending</option>
            <option value="dsc">Decending</option>
          </select>
          <div className="rightWrap">
            {this.state.filterData.map(item => (
              <CharacterCard {...item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
