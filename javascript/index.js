//! Arreglo que simula los valores que se ingresan
const ingresos = [ new Ingreso('Salario', 2100,00), new Ingreso('Venta Coche', 1500)];

const egresos = [ new Egreso("Renta", 1000), new Egreso("Ropa", 500)];

//! Método que carga el body-html
let cargarApp = () => {
    cargarCabezera(); //! Determina los datos que pondrá dinamicamente
    cargarIngresos();
    cargarEgresos();
};

//! Calcula los ingresos
let totalIngresos = () => {
    let total = 0;

    ingresos.forEach(value => total += value.value);

    return total;
}

//! Calcula los egresos
let totalEgresos = () => {
    let total = 0;

    egresos.forEach(dato => total += dato.value);

    return total;
}

//! Realiza los calculos
let cargarCabezera = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    //let porcentEgreso = totalEgresos() / totalIngresos();

    console.log("total ingreso:",totalIngresos());
    console.log("toal egreso: ",totalEgresos());
    console.log("presupuesto: ",presupuesto);

    document.querySelector("#presupuestoTotal").innerHTML = formatoMoneda(presupuesto);
    //document.querySelector("#porcentaje").innerHTML = formatoPorcentaje(porcentEgreso);
    document.querySelector("#ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.querySelector("#egresos").innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("en-US", {style: "percent", minimumFractionDigits: 2});
}

//! Genera el HTML de los ingresos
const cargarIngresos = () => {
    let ingresosHTML = "";

    for(let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }

    document.querySelector(".lista-ingresos").innerHTML = ingresosHTML;
    console.log(ingresosHTML);
}

const crearIngresoHTML = (valor) => {
    let valueHTML = `
    <div class="list-group w-50 lista-itemEstilo">
        <div class="list-group-item list-group-item-action b border border-0">
            <div class="d-flex justify-content-between">
                <h5 class="">${valor.description}</h5>
                <div class="d-flex">
                    <h5>${formatoMoneda(valor.value)}</h5>
                    <div class="elemento_eliminar_btn ms-2">
                        <button onclick="eliminarIngreso(${valor.id})" class="btnEliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return valueHTML;
};

/*
const crearIngresoHTML = (valor) => {
    let valueHTML = `
    <div class="list-group w-50">
        <div class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${valor.description}</h5>
                <div class="d-flex">
                    <h5>${formatoMoneda(valor.value)}</h5>
                    <div class="elemento_eliminar_btn ms-2">
                        <button onclick="eliminarIngreso(${valor.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return valueHTML;
};
*/

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(valor => valor.id === id);
    ingresos.splice(indiceEliminar,1);
    cargarCabezera();
    cargarIngresos();
};

const cargarEgresos = () => {
    let egresoHTML = "";

    for(let egreso of egresos) {
        egresoHTML += crearEgresoHTML(egreso);
    }

    document.querySelector(".lista-egresos").innerHTML = egresoHTML;
};

const crearEgresoHTML= (valor) => {
    let egresoGenerated = `
    <div class="list-group w-50">
        <div class="list-group-item list-group-item-action b border border-0">
            <div class="d-flex justify-content-between">
                <h5 class="mb-1">${valor.description}</h5>
                <div class="d-flex">
                    <h5>${formatoMoneda(valor.value)}</h5>
                    
                    <div class="elemento_eliminar_btn ms-2">
                        <button onclick="eliminarEgreso(${valor.id})" class="btnEliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return egresoGenerated;
};

//<h5 class="ms-2">${formatoPorcentaje(valor.value/totalEgresos())}</h5>

/*
const crearEgresoHTML= (valor) => {
    let egresoGenerated = `
    <div class="list-group w-50">
        <div class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${valor.description}</h5>
                <div class="d-flex">
                    <h5>${formatoMoneda(valor.value)}</h5>
                    <h5 class="ms-2">${formatoPorcentaje(valor.value/totalEgresos())}</h5>
                    <div class="elemento_eliminar_btn ms-2">
                        <button onclick="eliminarEgreso(${valor.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return egresoGenerated;
};
*/

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(valor => valor.id === id);
    egresos.splice(indiceEliminar,1);
    cargarCabezera();
    cargarEgresos();
};

const agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];

    if(descripcion.value !== "" && valor.value !== "" ) {
        if(tipo.value === 'agregar') {
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabezera();
            cargarIngresos();
        } else if(tipo.value === 'quitar') {
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabezera();
            cargarEgresos();
        }

        setiarValor(descripcion, valor);
    }
};

const setiarValor = (descripcion, valor) => {
    descripcion.value = "";
    valor.value = "";
};