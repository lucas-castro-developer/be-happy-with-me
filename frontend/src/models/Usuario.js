class Usuario {
    constructor() {
        this.nome = '';
        this.genero = '';
    }

    validarNome() {
        if (
            typeof this.nome === 'string' &&
            this.nome.length != 0 &&
            this.nome.lenght <= 40
        )
        return false;
    }

    validarGenero() {
        return ['m', 'f'].some(param => {
            return this.genero === param
        })
    }
}

export default Usuario;
