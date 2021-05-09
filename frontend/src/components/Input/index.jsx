import React from "react";

export default function Input(props) {
  const estilo = {
    borderColor: props.valorInvalido ? "#d50000" : "#cccccc",
    backgroundColor: props.valorInvalido ? "ffcdd2" : "#ffffff",
  };

  return <input type="text" {...props} style={estilo} />;
}
