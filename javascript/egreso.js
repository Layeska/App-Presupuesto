
class Egreso extends Dato {
    static contadorEgresos = 0;

    constructor(description, value) {
        super(description, value);
        this._id = ++Egreso.contadorEgresos;
    }

    get id() {
        return this._id;
    }
}
