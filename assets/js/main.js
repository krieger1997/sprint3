const form = document.querySelector("#formulario");
const checkCarga = document.querySelector("#carga");
const checkActivo = document.querySelector("#activo");
const segundoDiv = document.querySelector("#segundo");
const cantidadCargaInput = document.querySelector("#cantidadCarga");
const resultado = document.querySelector("#resultado");
const btnLimpiar = document.querySelector("#button__limpiar");
// var  persona;

window.onload = function () {//para que cuando se refresque, estén desmarcados
    limpiar(true)
}

limpiar = (cambiaBotones = false) => {
    
    cantidadCargaInput.required = false;
    
    document.querySelector("#fechaIngreso").required = false;
    document.querySelector("#sueldoActual").required = false;
    document.querySelector("#sueldoAnterior").required = false;
    if (cambiaBotones) {
        document.querySelector("#submit").classList.remove('oculto');
        document.querySelector("#submit").classList.add('visible');

        document.querySelector("#limpiar").classList.remove('visible');
        document.querySelector("#limpiar").classList.add('oculto');
        const inputs = form.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
        cantidadCargaInput.disabled = true;
        cantidadCargaInput.required = false;
        segundoDiv.classList.remove('visible');
        segundoDiv.classList.add('oculto');
        checkActivo.checked = false;
        checkCarga.checked = false;
        form.reset();
    }
}


//cuando se checkea el carga, se habilita el cantidadCarga y queda como required
//cuando se descheckea, lo contrario
checkCarga.addEventListener("change", () => {

    cantidadCargaInput.value = '';
    if (checkCarga.checked) {
        cantidadCargaInput.disabled = false;
        cantidadCargaInput.required = true;
    } else {
        cantidadCargaInput.disabled = true;
        cantidadCargaInput.required = false;
    }
})


//en submit se recuperan valores, se crea objeto de clase afiliado y se ejecutan sus metodos
form.addEventListener("submit", (event) => {
    const inputs = form.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }
    document.querySelector("#submit").classList.remove('visible');
    document.querySelector("#submit").classList.add('oculto');

    document.querySelector("#limpiar").classList.remove('oculto');
    document.querySelector("#limpiar").classList.add('visible');


    event.preventDefault();
    let nombre = document.querySelector("#nombre");
    let apellidos = document.querySelector("#apellidos");
    let fechaNac = document.querySelector("#fechaNac");
    let activo = document.querySelector("#activo");
    let fechaIngreso = document.querySelector("#fechaIngreso");
    let sueldoActual = document.querySelector("#sueldoActual");
    let sueldoAnterior = document.querySelector("#sueldoAnterior");
    let chkCarga = checkCarga;
    let cantidadCarga = cantidadCargaInput;



    const persona = new Afiliado(
        nombre.value,
        apellidos.value,
        fechaNac.value,
        activo.checked,
        fechaIngreso.value,
        sueldoActual.value == '' ? 0 : sueldoActual.value,
        sueldoAnterior.value == '' ? 0 : sueldoAnterior.value,
        chkCarga.checked,
        cantidadCarga.value == '' ? 0 : cantidadCarga.value
    );
    const tabla = document.querySelector("#tbody");
    const fila = tabla.insertRow();
    const celdaNombre = fila.insertCell();
    celdaNombre.innerHTML = persona.getNombre();

    const celdaApellidos = fila.insertCell();
    celdaApellidos.innerHTML = persona.getApellidos();

    const celdaFechaNac = fila.insertCell();
    celdaFechaNac.innerHTML = persona.getFechaNacimiento();

    const celdaSueldo = fila.insertCell();
    celdaSueldo.innerHTML = persona.getSueldoActual();

    const celdaCargas = fila.insertCell();
    celdaCargas.innerHTML = persona.getCarga();

    const celdaAsig = fila.insertCell();
    celdaAsig.innerHTML = persona.getAsignacion();

    const celdaCantidad = fila.insertCell();
    celdaCantidad.innerHTML = persona.getCantidadCarga();

    const celdaSueldoFinal = fila.insertCell();
    celdaSueldoFinal.innerHTML = persona.getSueldoTotal();

    const celdaPermanencia = fila.insertCell();
    celdaPermanencia.innerHTML = persona.getPermanencia();






    limpiar();


});


btnLimpiar.addEventListener("click", limpiar)




checkActivo.addEventListener("change", () => {
    if (checkActivo.checked) {
        segundoDiv.classList.remove('oculto');
        segundoDiv.classList.add('visible');
        document.querySelector("#fechaIngreso").required = true;
        document.querySelector("#sueldoActual").required = true;
        document.querySelector("#sueldoAnterior").required = true;
    } else {
        segundoDiv.classList.remove('visible');
        segundoDiv.classList.add('oculto');
        document.querySelector("#fechaIngreso").required = false;
        document.querySelector("#sueldoActual").required = false;
        document.querySelector("#sueldoAnterior").required = false;
    }
})






//CLASES

class Afiliado {
    constructor(nombre, apellidos, fechaNac, activo, fechaIngreso, sueldoActual, sueldoAnterior, carga, cantidadCarga) {
        this.nombre = nombre.toUpperCase();
        this.apellidos = apellidos.toUpperCase();
        this.fechaNac = fechaNac;
        this.activo = activo;
        this.fechaIngreso = fechaIngreso;
        this.sueldoActual = sueldoActual;
        this.sueldoAnterior = sueldoAnterior;
        this.carga = carga;
        this.cantidadCarga = cantidadCarga;
    }
    montoAsignacion = 0;
    sueldoTotal = this.sueldoActual;

    getNombre() {
        return this.nombre;
    }

    getApellidos() {
        return this.apellidos;
    }

    getNombreCompleto() {
        return `${this.nombre} ${this.apellidos}`;
    }
    getSueldoActual() {
        return currencyFormatter({ currency: "CLP", value: this.sueldoActual });
    }

    getCarga() {
        return this.carga ? "SI" : "NO";
    }

    getAsignacion() {
        if (this.carga) {
            if (this.sueldoAnterior <= 429899) {
                this.montoAsignacion = 16828;
            } else if (this.sueldoAnterior > 429899 && this.sueldoAnterior <= 627913) {
                this.montoAsignacion = 10327;
            } else if (this.sueldoAnterior > 627913 && this.sueldoAnterior <= 979330) {
                this.montoAsignacion = 3264;
            } else if (this.sueldoAnterior > 979330) {
                this.montoAsignacion = 0;
            }
        }
        return `${currencyFormatter({ currency: "CLP", value: this.montoAsignacion })}`;
    }

    getCantidadCarga() {
        return this.cantidadCarga;
    }


    getSueldoTotal() {
        // if (parseInt(this.sueldoActual) > 0) {

        // }
        return `${currencyFormatter({ currency: "CLP", value: (parseInt(this.montoAsignacion * this.cantidadCarga) + parseInt(this.sueldoActual)) })}`
    }

    getSueldoAnterior() {
        return currencyFormatter({ currency: "CLP", value: this.sueldoAnterior });
    }

    getFechaNacimiento() {
        let [anio, mes, dia] = this.fechaNac.split("-");
        return `${dia}/${mes}/${anio}`;
    }

    getFechaIngreso() {
        let [anio, mes, dia] = this.fechaIngreso.split("-");
        return `${dia}/${mes}/${anio}`;
    }

    getPermanencia() {
        if (this.activo) {
            let fechaIng = new Date(this.fechaIngreso);
            let fechaActual = new Date();
            let anios = fechaActual.getFullYear() - fechaIng.getFullYear();
            let meses = fechaActual.getMonth() - fechaIng.getMonth();
            let dias = fechaActual.getDate() - fechaIng.getDate();

            // ajuste para evitar días y meses negativos
            if (meses < 0 || (meses === 0 && dias < 0)) {
                anios--;
                if (meses < 0) {
                    meses += 12;
                }
                if (dias < 0) {
                    const ultimoMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0);
                    dias += ultimoMes.getDate();
                }
            }
            return `${anios > 0 ? anios + ' años, ' : ''}${meses > 0 ? meses + ' meses, ' : ''}${dias > 0 ? dias + ' dias.' : ''}`

        } else {
            return 0;
        }
        // console.log('permanencia',this.fechaIngreso)
    }
}




function currencyFormatter({ currency, value }) {
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        minimumFractionDigits: 0,
        currency
    })
    return formatter.format(value)
}


