import { Component } from "react";

export default class Services extends Component {
  constructor(url, callBackFunction, errorCallBackFunction) {
    super();
    this.apiUrl = url;

    this.callBack = callBackFunction;
    this.errorCallBack = errorCallBackFunction;
  }

  callBack = data => {
    return data;
  };

  errorCallBack = data => {
    return data;
  };

  get = () => {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => {
        return this.callBack(data);
      })
      .catch(error => {
        return this.errorCallBack(error);
      });
  };
}
