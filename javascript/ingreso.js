

class Ingreso extends Dato {
    static contadorIngresos = 0;

    constructor(description, value) {
        super(description, value);
        this._id = ++Ingreso.contadorIngresos;
    }

    get id() {
        return this._id;
    }
}

