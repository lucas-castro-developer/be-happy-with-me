import React from "react";

export default function Label(props) {
  return <label htmlFor={props.htmlFor}>{props.texto}</label>;
}
