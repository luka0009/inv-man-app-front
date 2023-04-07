import React from "react";
import loaderImg from "../../assets/loadingwithoutbg.gif";
import ReactDOM from "react-dom";
import "./Loader.scss";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <p style={{zIndex: '99', color: '#ff7722', fontStyle: 'bold', fontSize: '34px', marginBottom: '-30px'}}>Please Wait... it Might take a while to load</p>
        <img className="loader-image" src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return (
    <div className="--center-all">
      <img src={loaderImg} alt="Loading..." />
    </div>
  );
};

export default Loader;
