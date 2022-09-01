//main div
let dvMainEgreso=document.getElementById('dvFormEgreso')
//botones formulario
let aAddEg = document.getElementById("aAddEg")
let aModEg = document.getElementById("aModEg")
let aDelEg = document.getElementById("aDelEg")
let btnEgBuscarIdProveedor = document.getElementById("btnEgBuscarIdProveedor")
let spnFormEg = document.getElementById("spnFormEg")
let btnFormEg = document.getElementById("btnFormEg")
let btnBuscarProveedorEgForm=document.getElementById('btnBuscarProveedorEgForm')

//formulario egresos
let txtEgFormMonto = document.getElementById("txtEgFormMonto")
let txtEgFormIdProveedor = document.getElementById("txtEgFormIdProveedor")
let txtEgFormApodoProveedor =document.getElementById("txtEgFormApodoProveedor")
let txtEgFormProFact =document.getElementById("txtEgFormProFact")
let txtEgFormSecFact = document.getElementById("txtEgFormSecFact")
let cboEgFormUnidades = document.getElementById("cboEgFormUnidades")
let cboEgFormTE = document.getElementById("cboEgFormTE")
let cboEgFormResponsables = document.getElementById("cboEgFormResponsables")
let txtaEgFormObservacion = document.getElementById("txtaEgFormObservacion")
let dptEgFormFecha = document.getElementById("dptEgFormFecha")
let txtEgFormId=document.getElementById("txtEgFormId")


//Metodos
function fillEgresoForm(egreso){
    txtEgFormMonto.value=egreso.monto
    txtEgFormIdProveedor.value = egreso.proveedor.id
    txtEgFormApodoProveedor.value=egreso.proveedor.apodo
    txtEgFormProFact.value=egreso.numero_factura.substring(0,4)
    txtEgFormSecFact.value=egreso.numero_factura.substring(4,12)
    cboEgFormUnidades.value=egreso.unidad.id
    cboEgFormTE.value=egreso.tipo_egreso.id
    cboEgFormResponsables.value=egreso.responsable.id
    txtaEgFormObservacion.value=egreso.observacion
    dptEgFormFecha.value=egreso.fecha
    txtEgFormId.value=egreso.id
}
//Funcionalidad
aAddEg.addEventListener('click',function(){
    spnFormEg.innerHTML="Guardar"
    fillEgresoForm({id:'',monto:"",proveedor:{id:"",apodo:""},numero_factura:"",unidad:{id:-1},tipo_egreso:{id:-1},responsable:{id:-1},observacion:"",fecha:""})
    ACCION_ADD()
})
aModEg.addEventListener('click',function(){
    
    spnFormEg.innerHTML="Modificar"
    modal_data.prev_state=WinState.EGRESO
    main_monitor.setVisible(WinState.MODAL_EGRESO)
    ACCION_MOD()
})
aDelEg.addEventListener('click',function(){
    spnFormEg.innerHTML="Eliminar"
    fillEgresoForm({id:'',monto:"",proveedor:{id:"",apodo:""},numero_factura:"",unidad:{id:-1},tipo_egreso:{id:-1},responsable:{id:-1},observacion:"",fecha:""})
    modal_data.prev_state=WinState.EGRESO
    main_monitor.setVisible(WinState.MODAL_EGRESO)
    
    ACCION_DEL()
})
btnFormEg.addEventListener('click',function(e){
    e.preventDefault()
    let id=(ACCION.ADD===main_data.accion)?0:parseInt(txtEgFormId.value)
    let egreso={
        id:id,
        numero_factura:txtEgFormProFact.value+txtEgFormSecFact.value,
        monto:parseFloat(txtEgFormMonto.value),
        observacion:txtaEgFormObservacion.value,
        fecha:dptEgFormFecha.value,
        cod_proveedor:parseInt(txtEgFormIdProveedor.value),
        cod_unidad:cboEgFormUnidades.value,
        cod_tipo_egreso:cboEgFormTE.value,
        cod_responsable:cboEgFormResponsables.value
    }
    
    if(ACCION.ADD===main_data.accion){
        fillEgresoForm({id:'',monto:"",proveedor:{id:"",apodo:""},numero_factura:"",unidad:{id:-1},tipo_egreso:{id:-1},responsable:{id:-1},observacion:"",fecha:""})
        window.SimpleAPI.add("egresos",egreso)
    }
    else if(ACCION.MOD===main_data.accion){
        window.SimpleAPI.mod("egresos",egreso.id,egreso)
    }
    else{
        fillEgresoForm({
            id:'',
            monto:'',
            observacion:'',
            fecha:'',
            numero_factura:'',
            proveedor:{id:'',apodo:''},
            tipo_egreso:{id:-1},
            responsable:{id:-1},
            unidad:{id:-1}
        })
        window.SimpleAPI.del("egresos",egreso.id)
    }
    
})
btnBuscarProveedorEgForm.addEventListener('click',function(e){
    e.preventDefault()
    
})
btnEgBuscarIdProveedor.addEventListener('click',function(e){
    e.preventDefault()
    let id=txtEgFormIdProveedor.value
    if(id){
        getProveedorId(id).then(p=>fillFormPersona(txtEgFormIdProveedor,txtEgFormApodoProveedor,p))
    }
})
//metodo del main div
function cambiar_estado_main_egreso(){
    let x =dvMainEgreso
    if (x.style.display === "none") {
        let nav=document.getElementById('navEgresoVolver')
        nav.style.display='block'
        x.style.display = "block";
        fillCbo(cboEgFormResponsables,main_data.responsables)
        fillCbo(cboEgFormTE,main_data.tipo_egresos)
        fillCbo(cboEgFormUnidades,main_data.unidades)

    } else {
       x.style.display = "none";
       fillEgresoForm({
        id:'',
        monto:'',
        proveedor:{id:'',apodo:''},
        numero_factura:'',
        unidad:{id:-1},
        responsable:{id:-1},
        tipo_egreso:{id:-1},
        observacion:'',
        fecha:''
       })
    }
}
//volver topvar
let aVolverEgreso=document.getElementById('aVolverEgreso')
//Funcionalidad volver
cambiar_estado_main_egreso()
aVolverEgreso.addEventListener('click',()=>{
    main_monitor.volver_init_egreso()
})