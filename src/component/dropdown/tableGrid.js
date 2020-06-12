import React, { Component } from "react";
import R1IService from "../common/R1IServiceHandle";
import R1IGridDetail from "./R1IGridDetails";
import Pagination from "./pagination";

export default class TableGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      headerInfo: this.props.header,
      GridInfoUrl: this.props.gridDataURL,
      pageRecordSize: this.props.PageSize,
      headerData: [],
      tableData: [],
      filterObj: [],
      filterTableData: [],

      isPageLoading: false,
      currentPage: 1,
      startPage: 1,

      totalPage: 0,
      currentSort: "down",
      active: false,
      selectedTabId: 0,
      startIndex: 0,
      endIndex: 10,
      fixedNumber: 10,
      isLoaded: false,
      isSort: false
    };

    this._isMounted = true;
    this.filterObject = [];
    this.columnArr = [];
    this.gridOrder = [];
    this.gridOrderFunction();
  }

  callBackFunction = data => {
    this.setState(state => {
      return {
        tableData: data.data,
        filterObj: data.data
      };
    });

    const tableData = data.data;
    const pageRecordSize = this.state.pageRecordSize;
    let countData =
      tableData.length !== 1 ? Math.ceil(tableData.length / pageRecordSize) : 1;
    let lastIndex =
      countData <= this.state.fixedNumber
        ? countData
        : countData > this.state.fixedNumber
        ? this.state.fixedNumber
        : 1;

    this.setState({
      totalPage: countData,
      isPageLoading: true,
      startIndex: 0,
      endIndex: lastIndex
    });
  };

  errorCallBackFunction = data => {
    if (data === undefined) {
      this.setState({
        tableData: [],
        filterObj: [],
        totalPage: 0,
        isEmpLoading: true,
        isPageLoading: true
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (typeof this.props.gridDataURL !== "object") {
      if (prevProps.gridDataURL !== this.props.gridDataURL) {
        this.setState({
          GridInfoUrl: this.props.gridDataURL,
          currentPage: 1
        });

        let R1GridService = new R1IService(
          this.props.gridDataURL,
          {},
          this.callBackFunction,
          this.errorCallBackFunction
        );
        R1GridService.get();
        this.filterData();
      }
    } else {
      if (prevProps.gridDataURL !== this.props.gridDataURL) {
        if (this.props.gridDataURL.length > 0) {
          let result = { data: this.props.gridDataURL };
          let R1GridDetails = new R1IGridDetail();
          this.setState({
            headerData: R1GridDetails.GridHeader[this.state.headerInfo]
          });
          this.callBackFunction(result);
        } else {
          let result = undefined;
          this.errorCallBackFunction(result);
        }
      }
    }
  }

  componentDidMount() {
    if (this.props.header !== "") {
      if (typeof this.props.gridDataURL !== "object") {
        let R1GridService = new R1IService(
          this.state.GridInfoUrl,
          {},
          this.callBackFunction,
          this.errorCallBackFunction
        );
        R1GridService.get();

        let R1GridDetails = new R1IGridDetail();
        this.setState({
          headerData: R1GridDetails.GridHeader[this.state.headerInfo]
        });
      } else {
        let R1GridDetails = new R1IGridDetail();
        this.setState({
          headerData: R1GridDetails.GridHeader[this.state.headerInfo]
        });
        let result = { data: this.props.gridDataURL };

        this.callBackFunction(result);
      }
    }
  }

  handleCurrentPage = page => {
    this.setState({
      currentPage: page,
      isLoaded: false
    });
  };

  gridOrderFunction = () => {
    let bodyObj = [];
    let propObj = {};
    let headerObj = this.state.headerData;
    for (let i = 0; i < headerObj.length; i++) {
      Object.defineProperty(this.gridOrder, headerObj[i].colName, {
        value: "",
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
    bodyObj.push(propObj);
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      alert("You clicked outside of me!");
    }
  }

  isActive = id => {
    return this.state.selectedTabId === id;
  };

  setActiveTab(selectedTabId) {
    this.setState({ selectedTabId });
  }

  filterChange = (idx, filter) => {
    const { headerData } = this.state;
    if (filter) {
      headerData[idx].isFilter = filter;
      this.setState(headerData);
    } else {
      headerData[idx].isFilter = !filter;
      this.setState(headerData);
    }
  };

  filterData = (e, colName) => {
    let colObj = {
      value: "",
      columnName: ""
    };

    if (e === undefined) {
      this.columnArr = [];
      this.inputTitle.value = "";
    }

    if (e !== undefined) {
      if (this.columnArr.length === 0) {
        if (e.target.value !== "") {
          colObj.value = e !== undefined ? e.target.value : "";
          colObj.columnName = colName;
          this.columnArr.push(colObj);
        }
        // filterObject = this.state.tableData;
      } else {
        let isExist = false;
        for (let i = 0; i < this.columnArr.length; i++) {
          if (this.columnArr[i].columnName === colName) {
            if (e.target.value !== "") {
              this.columnArr[i].value = e !== undefined ? e.target.value : "";
            } else {
              this.columnArr.splice(this.columnArr.indexOf(i, 1));
            }

            isExist = true;
          }
        }
        if (!isExist) {
          if (e.target.value !== "") {
            colObj.value = e !== undefined ? e.target.value : "";
            colObj.columnName = colName;
            this.columnArr.push(colObj);
          }
        }
      }
    }

    // this.columnArr = this.columnArr.filter(function (obj) {
    //     return obj.value !== '';
    // });

    let filterTableData = [];
    //let itemData = [];
    let colArray = this.columnArr;
    if (this.columnArr.length && e !== undefined) {
      if (e.keyCode === 8 || e.keyCode === 127) {
        var flag = false;

        for (var i = 0; i < colArray.length; i++) {
          if (colArray[i].value !== "") {
            if (flag) {
              filterTableData = this.filterDataObject(
                colArray[i],
                filterTableData
              );
            } else {
              filterTableData = this.filterDataObject(
                colArray[i],
                this.state.tableData
              );
            }
            flag = true;
          } else {
            filterTableData = this.state.tableData;
          }
        }
      } else {
        //var flag = false;
        for (let i = 0; i < colArray.length; i++) {
          if (colArray[i].value !== "") {
            if (flag) {
              filterTableData = this.filterDataObject(
                colArray[i],
                filterTableData
              );
            } else {
              filterTableData = this.filterDataObject(
                colArray[i],
                this.state.tableData
              );
            }
            flag = true;
          }
        }
      }
    } else {
      filterTableData = this.state.tableData;
    }

    let countData =
      filterTableData.length !== 1
        ? Math.ceil(filterTableData.length / this.state.pageRecordSize)
        : 1;
    let lastIndex =
      countData <= this.state.fixedNumber
        ? countData
        : countData > this.state.fixedNumber
        ? this.state.fixedNumber
        : 1;

    this.setState({
      filterObj: filterTableData,
      totalPage: countData,
      currentPage: 1,
      startIndex: 0,
      endIndex: lastIndex,
      isLoaded: true
    });
  };

  filterDataObject = (colArray, gridData) => {
    var result = [];
    gridData.forEach(data => {
      if (colArray.value !== "" && data[colArray.columnName] !== null) {
        if (
          data[colArray.columnName]
            .toString()
            .toLowerCase()
            .indexOf(colArray.value.toString().toLowerCase()) !== -1
        ) {
          result.push(data);
        }
        if (data[colArray.columnName] === null) {
          let a =
            data[colArray.columnName] === null ? "" : data[colArray.columnName];
          if (a.indexOf(colArray.value.toString().toLowerCase()) !== -1) {
            result.push(data);
          }
        }
      }
    });
    return result;
  };

  keyPress(e) {
    if (e.keyCode === 8) {
      console.log("value", e.target.value);
      // put the login here
    }
  }

  onSortField = (idx, position, colName) => {
    const { headerData, filterObj } = Object.assign({}, this.state);

    headerData.forEach(item => (item.fullIcon = true));

    headerData[idx].fullIcon = false;
    if (position !== "asc") {
      headerData[idx].isSort = "asc";
      this.setState(headerData);
    } else {
      headerData[idx].isSort = "desc";
      this.setState(headerData);
    }

    this.setState({
      filterObj: filterObj.sort((a, b) => {
        if (typeof a[colName] !== "string" && typeof a[colName] !== "object") {
          return headerData[idx].isSort !== "asc"
            ? parseFloat(b[colName]) - parseFloat(a[colName])
            : parseFloat(a[colName]) - parseFloat(b[colName]);
        } else if (typeof a[colName] == "object") {
          let col1 = a[colName] === null ? " " : a[colName];
          let col2 = b[colName] === null ? " " : b[colName];
          return headerData[idx].isSort !== "asc"
            ? col1 > col2
              ? -1
              : 1
            : col1 < col2
            ? -1
            : 1;
        } else {
          // let scol1 = a[colName] !== null ? a[colName].toLowerCase() : "";
          // let scol2 = b[colName] !== null ? b[colName].toLowerCase() : "";

          if (a[colName] === "" || a[colName] === null) return 1;
          if (b[colName] === "" || b[colName] === null) return -1;
          if (a[colName] === b[colName]) return 0;
          return a[colName] < b[colName]
            ? a[colName].toLowerCase().localeCompare(b[colName].toLowerCase())
            : b[colName].toLowerCase().localeCompare(a[colName].toLowerCase());

          // let bb = b[colName]
          //   .toLowerCase()
          //   .localeCompare(a[colName].toLowerCase());

          // return headerData[idx].isSort !== "asc"
          //   ? scol1 > scol2
          //     ? 1
          //     : -1
          //   : scol1 < scol2
          //   ? 1
          //   : -1;
        }
      })
    });
  };

  onHandelDelete = obj => {
    // let o = obj;
  };

  render() {
    const gridInfo = {
      startPage: this.state.startPage,
      currentPage: this.state.currentPage,
      totalPage: this.state.totalPage,
      pageRecordSize: this.state.pageRecordSize,
      startIndex: this.state.startIndex,
      endIndex: this.state.endIndex,
      isLoaded: this.state.isLoaded
    };
    const {
      headerData,
      filterObj,
      tableData,
      currentPage,
      pageRecordSize,
      totalPage
    } = this.state;
    const lastPage = currentPage * pageRecordSize;
    const firstPage = lastPage - pageRecordSize;
    const filterObjData = filterObj.slice(firstPage, lastPage);

    let show = { display: "block" };
    let hide = { display: "none" };

    const sortTypes = {
      up: ["caret-up"],
      down: ["caret-down"]
    };

    return (
      <React.Fragment>
        <div className="row search">
          <div className="col-lg-12">
            <div className="range-label">
              Showing {filterObj.length} Results{" "}
              <span className="spacer-h">|</span> Total Records:{" "}
              {tableData.length} <span className="spacer-h">|</span> Displaying
              Page: <span>{filterObj.length !== 0 ? currentPage : 0}</span> of{" "}
              <span>{Math.ceil(totalPage)} </span>{" "}
            </div>
          </div>
        </div>
        <div className="div-table" ref={this.setWrapperRef}>
          <table className="div-table-row">
            <thead>
              <tr>
                {headerData.map((head, idx) => (
                  <td
                    key={idx}
                    title={head.title}
                    className="div-table-col headcol"
                  >
                    <span>
                      <div className="headerBox">
                        <span style={head.isFilter ? show : hide}>
                          <input
                            type="text"
                            ref={el => (this.inputTitle = el)}
                            onKeyUp={e => this.filterData(e, head.colName)}
                            placeholder={head.title}
                          />{" "}
                        </span>
                        <span style={head.isFilter ? hide : show}>
                          {head.title}
                        </span>
                      </div>
                      <div
                        className="arrowBox"
                        onClick={e =>
                          this.onSortField(idx, head.isSort, head.colName)
                        }
                      >
                        {!head.fullIcon ? (
                          <i
                            className={
                              head.isSort !== "asc"
                                ? `fa fa-${sortTypes.down}`
                                : `fa fa-${sortTypes.up}`
                            }
                          ></i>
                        ) : (
                          <i className="fa fa-sort"></i>
                        )}
                      </div>
                    </span>
                  </td>
                ))}
                {this.props.action && (
                  <td className="div-table-col headcol">
                    <span>
                      <div className="headerBox">{this.props.action}</div>
                    </span>
                  </td>
                )}
              </tr>
            </thead>

            <tbody>
              {filterObjData.length > 0 ? (
                filterObjData.map((data, index) => {
                  return (
                    <GridRow
                      key={index}
                      data={data}
                      headerObj={headerData}
                      gridIconInfo={this.props.gridIconObject}
                      rowInfo={this.props.onGridCallBack}
                      {...this.props}
                    />
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={
                      this.props.action !== undefined
                        ? headerData.length + 1
                        : headerData.length
                    }
                  >
                    <div className="alert alert-info" role="alert">
                      <strong> No results found</strong>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {this.state.isPageLoading}
        <Pagination
          isLoad={this.state.isLoading}
          {...gridInfo}
          onSetCurrentPage={this.handleCurrentPage}
        />
      </React.Fragment>
    );
  }
}

class GridRow extends Component {
  renderSelfElement = () => {
    let obj = [];
    for (let i = 0; i < this.props.headerObj.length; i++) {
      let colName = this.props.headerObj[i].colName;
      //obj.push(React.createElement('div', {}, [React.createElement('span', {}, this.props.data[colName])]));
      let data =
        this.props.data[colName] != null ? this.props.data[colName] : " ";

      // if (new Date(data)) {
      //   console.log(data);
      //   //console.log(data.replce("T", " "));
      // }

      if (typeof data === "string" && Date.parse(data)) {
        data =
          (data.match(/-/g) || []).length === 2 &&
          (data.match(/:/g) || []).length === 2
            ? data.replace("T", " ")
            : data;
      }

      obj.push(
        <td className="table-body-col" key={`col${i}`}>
          {data.toString()}
        </td>
      );
    }
    return obj;
  };
  onHandelDelete = obj => {
    this.props.onHandelDelete(obj);
  };
  render() {
    return (
      <React.Fragment>
        <tr
          key={this.props.id}
          onDoubleClick={e => this.props.rowInfo(this.props.data)}
        >
          {this.renderSelfElement()}
          {this.props.action && (
            <td className="table-body-col">
              {this.props.gridIconInfo.map((icon, idx) => {
                return (
                  <a
                    title={icon.title}
                    onClick={() => this.props[icon.onEvent](this.props.data)}
                  >
                    <i className={`fa ${icon.path}`}></i>
                  </a>
                );
              })}
            </td>
          )}
        </tr>
      </React.Fragment>
    );
  }
}
