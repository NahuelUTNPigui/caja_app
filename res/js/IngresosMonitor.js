//main div
let dvMainIngreso=document.getElementById('dvFormIngreso')
//Botones del form
let aAddIng = document.getElementById('aAddIng')
let aModIng = document.getElementById('aModIng')
let aDelIng = document.getElementById('aDelIng')
let btnIngBuscarIdCliente = document.getElementById("btnIngBuscarIdCliente")
let spnFormIng = document.getElementById("spnFormIng")
let btnFormIng = document.getElementById("btnFormIng")
let btnBuscarClienteIngForm = document.getElementById("btnBuscarClienteIngForm")
//Formulario
let txtIngFormMonto = document.getElementById("txtIngFormMonto")
let txtIngFormIdCliente = document.getElementById("txtIngFormIdCliente")
let txtIngApodoCliente = document.getElementById("txtIngApodoCliente")
let txtIngFormPriFact = document.getElementById("txtIngFormPriFact")
let txtIngFormSecFact = document.getElementById("txtIngFormSecFact")
let cboIngFormUnidades = document.getElementById("cboIngFormUnidades")
let cboIngFormResponsable = document.getElementById("cboIngFormResponsable")
let txtaIngFormObservacion = document.getElementById("txtaIngFormObservacion")
let dptIngFormFecha = document.getElementById("dptIngFormFecha")
let txtIngFormId=document.getElementById("txtIngFormId")

//metodo
function fillIngresoForm(ingreso){
    txtIngFormMonto.value = ingreso.monto
    txtIngFormIdCliente = ingreso.cliente.id
    txtIngApodoCliente.value = ingreso.cliente.apodo
    txtIngFormPriFact = ingreso.numero_factura.slice(0,4)
    txtIngFormSecFact = ingreso.numero_factura.slice(4)
    cboIngFormUnidades.value = ingreso.unidad.id
    cboIngFormResponsable.value = ingreso.responsable.id
    txtaIngFormObservacion.value = ingreso.observacion
    dptIngFormFecha.value =ingreso.fecha
    txtIngFormId.value=ingreso.id
}

//funcionalidad
aAddIng.addEventListener('click',function(){
    spnFormIng.innerHTML="Guardar"
    fillIngresoForm({id:'',monto:'',cliente:{id:'',apodo:''},numero_factura:'',unidad:{id:-1},responsable:{id:-1},observacion:'',fecha:''})
    ACCION_ADD()
})

aModIng.addEventListener('click',function(){
    spnFormIng.innerHTML="Modificar"
    modal_data.prev_state=WinState.INGRESO
    main_monitor.setVisible(WinState.MODAL_INGRESO)
    ACCION_MOD()
})
aDelIng.addEventListener('click',function(){
    spnFormIng.innerHTML="Eliminar"
    fillIngresoForm({id:'',monto:'',cliente:{id:'',apodo:''},numero_factura:'',unidad:{id:-1},responsable:{id:-1},observacion:'',fecha:''})
    modal_data.prev_state=WinState.INGRESO
    main_monitor.setVisible(WinState.MODAL_INGRESO)
    ACCION_DEL()
})
btnBuscarClienteIngForm.addEventListener('click',function(e){
    e.preventDefault()
})
btnIngBuscarIdCliente.addEventListener('click',function(e){
    e.preventDefault()
    let id=txtIngFormIdCliente.value
    if(id){
        getClienteId(id).then(p=>fillFormPersona(txtIngFormIdCliente,txtIngApodoCliente,p))
    }
})
btnFormIng.addEventListener('click',function(e){
    e.preventDefault()
    let id=(ACCION.ADD===main_data.accion)?0:parseInt(txtIngFormId.value)
    let ingreso={
        id:id,
        monto:parseFloat(txtIngFormMonto.value),
        cod_cliente:parseInt(txtIngFormIdCliente.value),
        numero_factura:txtIngFormPriFact.value+txtIngFormSecFact.value,
        cod_unidad:cboIngFormUnidades.value,
        cod_responsable:cboIngFormResponsable.value,
        observacion:txtaIngFormObservacion.value,
        fecha:dptIngFormFecha.values
    }
    if(ACCION.ADD===main_data.accion){
        fillIngresoForm({id:'',monto:'',cliente:{id:'',apodo:''},numero_factura:'',unidad:{id:-1},responsable:{id:-1},observacion:'',fecha:''})
        window.SimpleAPI.add("ingresos",ingreso)
    }
    else if(ACCION.MOD===main_data.accion){
        window.SimpleAPI.mod("ingresos",ingreso.id,ingreso)
    }
    else{
        fillIngresoForm({id:'',monto:'',cliente:{id:'',apodo:''},numero_factura:'',unidad:{id:-1},responsable:{id:-1},observacion:'',fecha:''})
        window.SimpleAPI.del("ingresos",ingreso.id)
    }
})
//metodo del main div
function cambiar_estado_main_ingreso(){
    let x =dvMainIngreso
    if (x.style.display === "none") {
        let nav=document.getElementById('navIngresoVolver')
        nav.style.display='block'
        x.style.display = "block";
        fillCbo(cboIngFormResponsable,main_data.responsables)
        fillCbo(cboIngFormUnidades,main_data.unidades)
    } else {
       x.style.display = "none";
    }
}
//volver topvar
let aVolverIngreso=document.getElementById('aVolverIngreso')
//Funcionalidad volver

aVolverIngreso.addEventListener('click',()=>{
    main_monitor.volver_init_ingreso()
})
cambiar_estado_main_ingreso()