import React from "react";
import Image from "../Image";
import ButtonImage from "../ButtonImage";
import ManipularEvento from "./ManipularEvento";

class ImageScroller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      manipularEvento: new ManipularEvento(
        this.props.elementos.length,
        this.props.selecionado.index
      ),
    };
  }

  obterSelecionado() {
    return this.props.elementos[this.state.manipularEvento.index];
  }
}

export default ImageScroller;
