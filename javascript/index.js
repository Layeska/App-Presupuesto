//! Crea las variables del localStorage
let crearStorage = () => {
    localStorage.setItem("presupuesto", 0);
    localStorage.setItem("ingresos", 0);
    localStorage.setItem("egresos", 0);
    localStorage.setItem("ingresosArray", JSON.stringify(ingresosTotal));
    localStorage.setItem("egresosArray", JSON.stringify(egresosTotal));
}

//! Variables para manipular los datos
let ingresosTotal = [];
let egresosTotal = [];

let validacion = JSON.parse(localStorage.getItem("presupuesto"));

//! Exiten variables en el localStorage
if (JSON.parse(validacion) != null) {
    let ingresoAux = localStorage.getItem("ingresosArray");
    let x1 = JSON.parse(ingresoAux);
    ingresosTotal = [...x1];

    let egresosAux = localStorage.getItem("egresosArray");
    let x2 = JSON.parse(egresosAux);
    egresosTotal = [...x2];
} else { //! No existen las variables se crean
    crearStorage();
}

//! Es la función que se carga con el Body
let cargarApp = () => {
    cargarCabezera();
    cargarIngresos();
    cargarEgresos();
};

//! Imprime y calcula los ingresos, Egresos y Presupuesto disponible
let cargarCabezera = () => {
    let presupuesto = 0, ingresos = 0, egresos = 0;

    localStorage.setItem("presupuesto", totalIngresos() - totalEgresos());
    presupuesto = JSON.parse(localStorage.getItem("presupuesto"));

    localStorage.setItem("ingresos", totalIngresos());
    ingresos = JSON.parse(localStorage.getItem("ingresos"));

    localStorage.setItem("egresos", totalEgresos());
    egresos = localStorage.getItem("egresos");

    presupuesto == null ? document.querySelector("#presupuestoTotal").innerHTML = "$ 0.00" : document.querySelector("#presupuestoTotal").innerHTML = `$ ${presupuesto}`;
    ingresos == null ? document.querySelector("#ingresos").innerHTML = "$ 0" : document.querySelector("#ingresos").innerHTML = `$ ${ingresos}`;
    egresos == null ? document.querySelector("#egresos").innerHTML = "$ 0" :  document.querySelector("#egresos").innerHTML = `$ ${egresos}`;
};

//! Suma de los ingresos
let totalIngresos = () => {
    let total = 0;

    ingresosTotal.forEach(value => {
        total += value._value;
        console.log("Value: ",value._value);
    });
    
    return total;
};

//! Suma de los egresos
let totalEgresos = () => {
    let total = 0;
    egresosTotal.forEach(dato => {
        total += dato._value;
        console.log("Value egreso: ", dato._value);
    });

    return total;
};

//! Muestra el HTML de los ingresos
let cargarIngresos = () => {
    let ingresosHTML = "";
    let aux = localStorage.getItem("ingresosArray");
    let array = JSON.parse(aux);

    for(let ingreso of array) {
        ingresosHTML += crearIngresosHTML(ingreso);
    }
    localStorage.setItem("ingresosArray", JSON.stringify(array));
    document.querySelector(".lista-ingresos").innerHTML = ingresosHTML;
};

//! Crea el HTML de cada ingreso
let crearIngresosHTML = (valor) => {
    let valueHTML = `
    <div class="list-group w-50 lista-itemEstilo">
        <div class="list-group-item list-group-item-action b border border-0">
            <div class="d-flex justify-content-between">
                <h5 class="">${valor._description}</h5>
                <div class="d-flex">
                    <h5>${(valor._value)}</h5>
                    <div class="elemento_eliminar_btn ms-2">
                        <button onclick="eliminarIngreso(${valor._id})" class="btnEliminar">
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

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresosTotal.findIndex(valor => valor._id === id);
    ingresosTotal.splice(indiceEliminar,1);
    localStorage.setItem("ingresosArray", JSON.stringify(ingresosTotal));
    cargarCabezera();
    cargarIngresos();
};

let cargarEgresos = () => {
    let egresosHTML = "";
    let aux = localStorage.getItem("egresosArray");
    let array = JSON.parse(aux);

    for(let egreso of array) {
        egresosHTML += crearEgresosHTML(egreso);
    }

    localStorage.setItem("egresosArray", JSON.stringify(array));
    document.querySelector(".lista-egresos").innerHTML = egresosHTML;
};

let crearEgresosHTML = (valor) => {
    let egresosGenerated = `
    <div class="list-group w-50 lista-itemEstilo">
        <div class="list-group-item list-group-item-action b border border-0">
            <div class="d-flex justify-content-between">
                <h5 class="">${valor._description}</h5>
                <div class="d-flex">
                    <h5>${(valor._value)}</h5>
                    <div class="elemento_eliminar_btn ms-2">
                        <button onclick="eliminarEgreso(${valor._id})" class="btnEliminar">
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
    return egresosGenerated;
};

let eliminarEgreso = (id) => {
    let indiceEliminar = egresosTotal.findIndex(valor => valor._id === id);
    egresosTotal.splice(indiceEliminar,1);
    localStorage.setItem("egresosArray", JSON.stringify(egresosTotal));
    cargarCabezera();
    cargarEgresos();
};

let agregarDato = () => {
    let formulario = document.forms["forma"];
    let tipo = formulario["tipo"];
    let description = formulario["descripcion"];
    let valor = formulario["valor"];

    //! Si no están vacios se agrega
    if(description.value !== "" && valor.value !== "") {
        if(tipo.value === "agregar"){
            ingresosTotal.push(new Ingreso(description.value, +valor.value));
            localStorage.setItem("ingresosArray", JSON.stringify(ingresosTotal));
            localStorage.setItem("ingresos", totalIngresos());
            cargarCabezera();
            cargarIngresos();
        } else if(tipo.value === "quitar"){
            egresosTotal.push(new Egreso(description.value, +valor.value));
            localStorage.setItem("egresosArray", JSON.stringify(egresosTotal));
            localStorage.setItem("egresos", totalEgresos());
            cargarCabezera();
            cargarEgresos();
        }
    }

    let presupuesto = localStorage.getItem("ingresos");
    localStorage.setItem("presupuesto", presupuesto);
    
    setiarValor(description, valor);
};

const setiarValor = (descripcion, valor) => {
    descripcion.value = "";
    valor.value = "";
};