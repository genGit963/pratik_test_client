import React from "react";
import "./loading.scss";

const LoadingEffect = (): React.JSX.Element => {
  return (
    <section className="loading_container">
      <div className="dots">
        <div className="dot">L</div>
        <div className="dot">O</div>
        <div className="dot">A</div>
        <div className="dot">D</div>
        <div className="dot">I</div>
        <div className="dot">N</div>
        <div className="dot">G</div>
        <div className="dot">.</div>
        <div className="dot">.</div>
        <div className="dot">.</div>
      </div>
      <p className="title">-------- Todo -------- </p>
    </section>
  );
};

export default LoadingEffect;
