const form = document.querySelector("#formulario");
const checkCarga = document.querySelector("#carga");
const cantidadCargaInput = document.querySelector("#cantidadCarga");
const resultado = document.querySelector("#resultado");
// var  persona;


//cuando se checkea el carga, se habilita el cantidadCarga y queda como required
//cuando se descheckea, lo contrario
checkCarga.addEventListener("change",()=>{
    cantidadCargaInput.value = '';
    if (checkCarga.checked) {
        cantidadCargaInput.disabled = false;
        cantidadCargaInput.required = true;
    }else{
        cantidadCargaInput.disabled = true;
        cantidadCargaInput.required = false;
    }
})


//en submit se recuperan valores, se crea objeto de clase afiliado y se ejecutan sus metodos
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let nombre = document.querySelector("#nombre");
    let apellidos = document.querySelector("#apellidos");
    let sueldoActual = document.querySelector("#sueldoActual");
    let sueldoAnterior = document.querySelector("#sueldoAnterior");
    let chkCarga = checkCarga;
    let cantidadCarga = cantidadCargaInput;
    const persona = new Afiliado(
        nombre.value,
        apellidos.value,
        sueldoActual.value,
        sueldoAnterior.value,
        chkCarga.value,
        cantidadCarga.value==''?0:cantidadCarga.value
    );
    let nombreCompletoRes = persona.getNombreCompleto();
    let sueldoActualRes = persona.getSueldoActual();
    let montoCargaRes = persona.getMontoCarga();
    let sueldoTotalRes = persona.getSueldoTotal();
console.log(nombreCompletoRes);


    resultado.innerHTML= `
    <p>Su nombre es ${nombreCompletoRes}</p>
    <p>Su sueldo actual es ${sueldoActualRes}</p>
    <p>${montoCargaRes}</p>
    <p>${sueldoTotalRes}</p>
    `;
    



    
    form.reset();



});





//CLASES

class Afiliado{
    constructor(nombre, apellidos, sueldoActual, sueldoAnterior, carga, cantidadCarga){
        this.nombre = nombre.toUpperCase();
        this.apellidos = apellidos.toUpperCase();
        this.sueldoActual = sueldoActual;
        this.sueldoAnterior = sueldoAnterior;
        this.carga = carga;
        this.cantidadCarga = cantidadCarga;
    }
    montoAsignacion = 0;
    sueldoTotal=this.sueldoActual;
    getNombreCompleto(){
        return `${this.nombre} ${this.apellidos}`;
    }
    getSueldoActual(){
        return  currencyFormatter( { currency: "CLP", value: this.sueldoActual } );
    }
    getMontoCarga(){
        if(carga){
            if(this.sueldoAnterior<=429899){
                this.montoAsignacion = 16828;
            }else if(this.sueldoAnterior > 429899 && this.sueldoAnterior <= 627913){
                this.montoAsignacion = 10327;
            }else if(this.sueldoAnterior > 627913 && this.sueldoAnterior <= 979330 ){
                this.montoAsignacion = 3264;
            }else if(this.sueldoAnterior > 979330){
                this.montoAsignacion = 0;
            }

            return `Su monto de asignación familiar es ${currencyFormatter( { currency: "CLP", value: this.montoAsignacion } )}, por lo que en total recibiría ${currencyFormatter( { currency: "CLP", value: (this.montoAsignacion*this.cantidadCarga) } )} de acuerdo a la cantidad de cargas.`;


        }else{
            return `No posee carga, por lo tanto, su monto de asignación familiar es ${currencyFormatter( { currency: "CLP", value: this.montoAsignacion } )}`;
        }
    }

    getSueldoTotal(){
        return `Su sueldo total (sueldo actual + total asignación) es ${currencyFormatter( { currency: "CLP", value: (parseInt(this.montoAsignacion * this.cantidadCarga)+parseInt(this.sueldoActual)) } )}`
    }
}









function currencyFormatter({ currency, value}) {
    const formatter = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      minimumFractionDigits: 0,
      currency
    }) 
    return formatter.format(value)
}