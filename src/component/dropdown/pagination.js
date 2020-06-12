import React, { Component } from "react";

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      countPage: 1,
      pageNumbers: 2,
      startIndex: this.props.startIndex,
      endIndex: this.props.endIndex,
      fixedPage: 10
    };
  }

  firstPage = (event, page) => {
    event.preventDefault();
    this.setState({
      startIndex: page - 1,
      endIndex: this.state.fixedPage,
      countPage: page
    });
    this.props.onSetCurrentPage(page);
  };

  lastPage = (event, page) => {
    event.preventDefault();
    this.setState({
      startIndex: page - this.state.fixedPage,
      endIndex: page,
      countPage: page
    });
    this.props.onSetCurrentPage(page);
  };

  prevPage = (event, page) => {
    event.preventDefault();
    const { currentPage } = this.props;
    if (currentPage > 1) {
      this.setState(function(prevState, props) {
        if (currentPage <= prevState.startIndex + 1)
          return {
            startIndex: prevState.startIndex - 1,
            endIndex: prevState.endIndex - 1,
            countPage: page
          };
      });
    }
    this.props.onSetCurrentPage(page);
  };

  nextPage = (event, page) => {
    event.preventDefault();
    const { totalPage, currentPage } = this.props;
    if (currentPage < totalPage) {
      this.setState(function(prevState, props) {
        if (currentPage >= prevState.endIndex)
          return {
            startIndex: prevState.startIndex + 1,
            endIndex: prevState.endIndex + 1
          };
      });
    }

    this.props.onSetCurrentPage(page);
  };

  pagination = (event, page) => {
    event.preventDefault();
    const { pageNumbers } = this.state;
    const { totalPage } = this.props;

    this.setState(function(prevState, props) {
      if (
        prevState.countPage <= props.currentPage &&
        prevState.endIndex < totalPage
      ) {
        return {
          startIndex: prevState.startIndex + pageNumbers - 1,
          endIndex: prevState.endIndex + pageNumbers - 1,
          countPage: page
        };
      }

      if (
        prevState.countPage >= props.currentPage &&
        prevState.startIndex > 0
      ) {
        return {
          startIndex: prevState.startIndex - pageNumbers + 1,
          endIndex: prevState.endIndex - pageNumbers + 1,
          countPage: page
        };
      }
    });

    this.props.onSetCurrentPage(page);
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (
  //     nextProps.endIndex > prevState.endIndex &&
  //     nextProps.totalPage > prevState.fixedPage
  //   ) {
  //     return {
  //       startIndex: nextProps.startIndex,
  //       endIndex: nextProps.endIndex
  //     };
  //   }
  //   if (nextProps.totalPage < prevState.fixedPage) {
  //     return {
  //       startIndex: nextProps.startIndex,
  //       endIndex: nextProps.endIndex,
  //       countPage: 1
  //     };
  //   }
  // }

  render() {
    const { startIndex, endIndex } = this.state;
    const { totalPage, startPage, currentPage } = this.props;

    let numbers = Array.from({ length: totalPage }, (v, k) => k + 1);

    return (
      <div className={this.props.totalPage ? "showData" : "hideData"}>
        {
          <ul className="pagination">
            <li
              className={
                currentPage === startPage ? "page-item disabled" : "page-item"
              }
            >
              <a
                href="#first"
                onClick={e => {
                  this.firstPage(e, startPage);
                }}
              >
                <span>First</span>
              </a>
              <a
                href="#prev"
                onClick={e => {
                  this.prevPage(
                    e,
                    currentPage <= startPage ? currentPage : currentPage - 1
                  );
                }}
              >
                <span>Prev</span>
              </a>
            </li>

            {//(startIndex >= this.props.startIndex ? this.props.startIndex : startIndex), (startIndex >= this.props.startIndex ? this.props.startIndex : startIndex)

            numbers.slice(startIndex, endIndex).map(item => (
              <li
                key={item.toString()}
                className={currentPage === item ? "active" : " "}
              >
                <a
                  href="#link"
                  className="page-link"
                  onClick={e => this.pagination(e, item)}
                >
                  {item}
                </a>
              </li>
            ))}

            <li
              className={
                currentPage === totalPage
                  ? "page-item page-link disabled"
                  : "page-item page-link"
              }
            >
              <a
                href="#next"
                onClick={e => {
                  this.nextPage(
                    e,
                    currentPage >= totalPage ? currentPage : currentPage + 1
                  );
                }}
              >
                <span>Next</span>
              </a>
              <a
                href="#last"
                onClick={e => {
                  this.lastPage(e, totalPage);
                }}
              >
                <span>Last</span>
              </a>
            </li>
          </ul>
        }
      </div>
    );
  }
}
