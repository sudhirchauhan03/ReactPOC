import React, { Component }  from "react";
import axios from "axios";
import Model from "../model/model";

export default class R1IService extends Component {
  constructor(url, data, callBackFunction, errorCallBackFunction) {
    super();
    this.apiUrl = url;
    this.parameter = data;
    this.callBack = callBackFunction;
    this.errorCallBack = errorCallBackFunction;
    this.state = {
      showAlertModel: false
    };
    // const that = this;
  }

  callBack = data => {
    return data;
  };

  errorCallBack = data => {
    return data;
  };

  // get = () => {
  //   let that = this;
  //   let createCORSRequest = (method, url) => {
  //     let xhr = new XMLHttpRequest();
  //     if ("withCredentials" in xhr) {
  //       // Most browsers.
  //       xhr.open(method, url, true);
  //     } else if (typeof XDomainRequest != "undefined") {
  //       // IE8 & IE9
  //       xhr = new XDomainRequest();
  //       xhr.open(method, url);
  //     } else {
  //       // CORS not supported.
  //       xhr = null;
  //     }
  //     return xhr;
  //   };

  //   let xhr = createCORSRequest("GET", this.apiUrl);

  //   xhr.onload = () => {
  //     let responseText = xhr.responseText;
  //     //console.log(responseText);
  //     //return this.callBack(responseText);
  //   };

  //   xhr.onloadend = () => {
  //     let responseText = xhr.responseText;
  //     let jsonResponse = JSON.parse(responseText);
  //     let data = { data: jsonResponse };
  //     return that.callBack(data);
  //   };

  //   xhr.onerror = function() {
  //     return that.errorCallBack();
  //   };

  //   xhr.withCredentials = true;
  //   xhr.send();
  // };

  // get = () => {
  //   try {
  //     let req = new Request(this.apiUrl, {
  //       method: "GET",
  //       mode: "cors",
  //       redirect: "follow",
  //       headers: {
  //         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
  //       },
  //       credentials: "include"
  //     });

  //     fetch(req)
  //       .then(response => response.json())
  //       .then(response => {
  //         // let jsonResponse = JSON.parse(response);
  //         let data = { data: response };

  //         return this.callBack(response);
  //       })
  //       .catch(error => {
  //         if (this.errorCallBack !== null) {
  //           //  return this.errorCallBack(error.response);
  //         } else {
  //           console.log(error);
  //         }
  //       });
  //   } catch (error) {
  //     console.log(error + " " + this.apiUrl);
  //   }
  // };

  get = () => {
    axios
      .get(this.apiUrl, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        withCredentials: true,
        credentials: "include"
      })
      .then(
        response => {
          return this.callBack(response);
        },
        error => {
          // if (!this.errorHandel()) {
          //   return false;
          // }

          if (
            this.errorCallBack !== null &&
            this.errorCallBack !== "undefined"
          ) {
            return this.errorCallBack(error.response);
          } else {
            console.log(error);
          }
          //this.callBack(error.response);
        }
      );
  };

  post = () => {
    axios({
      method: "POST",
      url: this.apiUrl,
      data: this.parameter,
      mode: "cors",
      contentType: "application/json",
      dataType: "json",
      withCredentials: true,
      credentials: "include"
    }).then(
      response => {
        return this.callBack(response);
      },
      error => {
        if (!this.errorHandel(error)) {
          this.modelPopup();

          return false;
        }
        if (this.errorCallBack !== null && this.errorCallBack !== "undefined") {
          return this.errorCallBack(error.response);
        } else {
          console.log(error);
        }
        //this.callBack(error.response);
      }
    );
  };

  delete = () => {
    axios({
      method: "DELETE",
      url: this.apiUrl,
      data: this.parameter,
      mode: "cors",
      contentType: "application/json",
      dataType: "json",
      withCredentials: true,
      credentials: "include"
    }).then(
      response => {
        return this.callBack(response);
      },
      error => {
        if (!this.errorHandel(error)) {
          alert("Unauthorized to perform this activity");
          return false;
        }

        if (this.errorCallBack !== null && this.errorCallBack !== "undefined") {
          return this.errorCallBack(error.response);
        } else {
          console.log(error);
        }
        //this.callBack(error.response);
      }
    );
  };

  onShowAlertModel = e => {
    this.setState({
      showAlertModel: !this.state.showAlertModel
    });
  };

  modelPopup = () => {
    const alertModelProps = {
      content: "Unauthorized to perform this activity",
      action: "alert"
    };

    return (
      <Model
        {...alertModelProps}
        onClose={this.onShowAlertModel}
        show={this.state.showAlertModel}
      />
    );
  };

  errorHandel = error => {
    if (error.response.status === 401) {
      return false;
    } else {
      return true;
    }
  };
}


