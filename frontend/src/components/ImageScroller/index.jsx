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

  renderizarImagem(entry, index) {
    let eixoY = this.props.eixoY ? this.props.eixoY : 0;
    return (
      <li
        style={{
          paddingTop: "8px",
          position: "absolute",
          zIndex: "-1",
          marginLeft: `${index * 140}px`,
        }}
        key={index + entry.toString()}
      >
        <Image
          eixoX={entry.index}
          eixoY={eixoY}
          width={140}
          height={140}
          backgroundHeight={280}
          arquivo={this.props.arquivo}
        />
      </li>
    );
  }

  renderizarImagens() {
    const ms = this.state.manipularEvento.toqueEmExecucao ? "100ms" : "800ms";

    const estilo = {
      WebkitTransitionDuration: ms,
      MsTransitionDuration: ms,
      MozTransitionDuration: ms,
      OTransitionDuration: ms,
      transitionDuration: ms,

      listStyleType: "none",
      margin: "0",
      padding: "0",
      position: "relative",
      width: `${this.props.elementos.length * 140}px`,
      left: `${this.state.manipularEvento.left}px`,
    };

    const lista = this.props.elementos.map((entry, index) =>
      this.renderizarImagem(entry, index)
    );

    return <li style={estilo}>{lista}</li>;
  }

  renderizarSelecionado() {
    return (
      <span
        style={{
          float: "left",
          width: "140px",
          height: "160px",
          marginLeft: "42px",
          backgroundColor: "#00C853",
          position: "relative",
          zIndex: -2,
        }}
      ></span>
    );
  }

  renderizarButtonImage(posicao) {
    return (
      <ButtonImage
        posicao={posicao}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.preventDefault();
          let manipularEvento = this.state.manipularEvento;
          let index = manipularEvento.index;
          if (posicao == "esquerda") {
            index += -1;
          } else {
            index += 1;
          }
          manipularEvento.definirIndex(index);
          manipularEvento.atualizarClique();
          this.setState(
            {
              manipularEvento: manipularEvento,
            },
            () => {
              this.props.onChange(this.obterSelecionado());
            }
          );
        }}
      />
    );
  }
}

export default ImageScroller;
