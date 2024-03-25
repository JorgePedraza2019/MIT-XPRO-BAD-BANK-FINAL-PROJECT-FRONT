import React from "react";

// Functional component Card
export default function Card(props) {
  // Function to apply Bootstrap classes to the Card component
  function classes() {
    // Custom styles class or empty string
    const cn = props.className ? props.className : " ";
    // Background color class or empty string
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    // Text color class or default to white
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    // Concatenation of classes
    return "card mb-3 " + bg + txt + cn;
  }

  // Rendering of the Card component
  return (
    <div className="w-100" style={{ padding: "1.3rem" }}>
      <div className={classes()} style={{ maxWidth: "18rem" }}>
        <div className="card-header" style={{ padding: "13px" }}>
          <h5>
            <b>{props.header}</b>
          </h5>
        </div>
        {/* Card header */}
        <div className="card-body">
          {props.title && <h5 className="card-title">{props.title}</h5>}{" "}
          {/* Card title if defined */}
          {props.text && <p className="card-text">{props.text}</p>}{" "}
          {/* Card text if defined */}
          {props.body} {/* Card body */}
          {props.status && <div id="createStatus">{props.status}</div>}{" "}
          {/* Card status if defined */}
        </div>
      </div>
    </div>
  );
}
