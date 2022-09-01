
//Elementos del div
let dvs_personas=document.getElementsByClassName('dvPersona')
let dvCliente=document.getElementById('dvCliente')
let dvResponsable=document.getElementById('dvResponsable')
let dvProveedor=document.getElementById('dvProveedor')
let aVolverPersonas=document.getElementById('aVolverPersonas')

//tablas
let tblResponsable=document.getElementById('tblResponsables')


//botones responsable
let aAddResponsable=document.getElementById('aAddResponsable')
let aModResponsable=document.getElementById('aModResponsable')
let aDelResponsable=document.getElementById('aDelResponsable')
let btnFormResponsable=document.getElementById('btnFormResponsable')
let spnFormResponsable=document.getElementById('spnFormResponsable')
//Form responsable
let txtResNombre=document.getElementById('txtResNombre')
let txtResApellido=document.getElementById('txtResApellido')
let txtResRol=document.getElementById('txtResRol')
let txtResId=document.getElementById('txtResId')
//Botones Cliente
let aAddCliente=document.getElementById('aAddCliente')
let aModCliente=document.getElementById('aModCliente')
let aDelCliente=document.getElementById('aDelCliente')
let btnFormCliente=document.getElementById('btnFormCliente')
let spnFormCliente=document.getElementById('spnFormCliente')
//Form Cliente
let txtCliFormApodo=document.getElementById('txtCliFormApodo')
let txtCliFormRazonSocial=document.getElementById('txtCliFormRazonSocial')
let cboCliFormRubro=document.getElementById('cboCliFormRubro')
let txtCliFormId=document.getElementById('txtCliFormId')
//Botones Proveedores
let aAddPro=document.getElementById('aAddPro')
let aModPro=document.getElementById('aModPro')
let aDelPro=document.getElementById('aDelPro')
let btnFormPro=document.getElementById('btnFormPro')
let spnFormPro=document.getElementById('spnFormPro')
//Form Proveedor
let txtProFormApodo=document.getElementById('txtProFormApodo')
let txtProFormNombre=document.getElementById('txtProFormNombre')
let txtProFormApellido=document.getElementById('txtProFormApellido')
let cboProFormTipo=document.getElementById('cboProFormTipo')
let txtProFormId=document.getElementById('txtProFormId')


//Funcionalidad
//Funcionalidad volver
aVolverPersonas.addEventListener('click',()=>{
    main_monitor.volver_init_personas()
})
//Funcionalidad responsable
btnFormResponsable.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=(main_data.accion===ACCION.ADD)?0:parseInt(txtResId.value)
    let responsable={
        nombre:txtResNombre.value,
        apellido:txtResApellido.value,
        rol:txtResRol.value,
    }
    if(main_data.accion===ACCION.ADD){
        window.SimpleAPI.add("responsables",responsable)
        getAllResponsables().then(responsables=>{fillTableResponsable(tblResponsable,responsables);main_data.responsables=responsables})
    }
    else if(main_data.accion===ACCION.MOD){
        window.SimpleAPI.mod("responsables",id,responsable)
        getAllResponsables().then(responsables=>{fillTableResponsable(tblResponsable,responsables);main_data.responsables=responsables})
    }
    else{
        window.SimpleAPI.del("responsables",id)
        fillResponsableForm({id:'',nombre:'',apellido:'',rol:''})
        getAllResponsables().then(responsables=>{fillTableResponsable(tblResponsable,responsables);main_data.responsables=responsables})
    }
})
aAddResponsable.addEventListener('click',(e)=>{
    spnFormResponsable.innerHTML='Guardar'
    fillResponsableForm({id:'',nombre:'',apellido:'',rol:''})
    ACCION_ADD()
})
aModResponsable.addEventListener('click',(e)=>{
    spnFormResponsable.innerHTML='Modificar'
    ACCION_MOD()
})
aDelResponsable.addEventListener('click',(e)=>{
    spnFormResponsable.innerHTML='Eliminar'
    ACCION_DEL()
})
//Funcionalidad cliente
btnFormCliente.addEventListener('click',e=>{
    e.preventDefault()
    let id=(ACCION.ADD===main_data.accion)?0:parseInt(txtCliFormId.value)
    let cliente={
        id:id,
        apodo:txtCliFormApodo.value,
        razon_social:txtCliFormRazonSocial.value,
        cod_rubro:cboCliFormRubro.value
    }
    if(main_data.accion===ACCION.ADD){
        if(cboCliFormRubro.value!==-1){
            window.SimpleAPI.add("clientes",cliente)
        }

    }
    else if(main_data.accion===ACCION.MOD){
        if(cboCliFormRubro.value!==-1){
            window.SimpleAPI.mod("clientes",cliente.id,cliente)
        }

    }
    else{
        if(cboCliFormRubro.value!==-1){
            fillClienteForm({apodo:'',razon_social:'',rubro:{id:-1},id:''})
            window.SimpleAPI.del("clientes",cliente.id)
        }

    }

})
aAddCliente.addEventListener('click',e=>{
    spnFormCliente.innerHTML='Guardar'
    let cli={
        apodo:'',
        razon_social:'',
        id:'',
        rubro:{id:-1}
    }
    fillClienteForm(cli)
    ACCION_ADD()
})
aModCliente.addEventListener('click',e=>{
    spnFormCliente.innerHTML="Modificar"
    ACCION_MOD()
})
aDelCliente.addEventListener('click',e=>{
    spnFormCliente.innerHTML="Eliminar"
    ACCION_DEL()
})
//Funcionalidad Proveedor
btnFormPro.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=(ACCION.ADD===main_data.accion)?0:parseInt(txtProFormId.value)
    let proveedor={
        id:id,
        apodo:txtProFormApodo.value,
        nombre:txtProFormNombre.value,
        apellido:txtProFormApellido.value,
        cod_tipo_proveedor:cboProFormTipo.value
    }
    if(main_data.accion===ACCION.ADD){
        if(cboProFormTipo!==-1){
            window.SimpleAPI.add("proveedores",proveedor)
        }

    }
    else if(main_data.accion===ACCION.MOD){
        if(cboProFormTipo!==-1){
            window.SimpleAPI.mod("proveedores",proveedor.id,proveedor)
        }

    }
    else{
        if(cboProFormTipo!==-1){
            fillProveedorForm({apodo:'',nombre:'',apellido:'',tipo:{id:-1},id:''})
            window.SimpleAPI.del("proveedores",proveedor.id)
        }

    }
})
aAddPro.addEventListener('click',(e)=>{
    spnFormPro.innerHTML="Guardar"
    fillProveedorForm({apodo:'',nombre:'',apellido:'',tipo:{id:-1},id:''})
    ACCION_ADD()
})
aModPro.addEventListener('click',(e)=>{
    spnFormPro.innerHTML="Modificar"
    ACCION_MOD()
})
aDelPro.addEventListener('click',(e)=>{
    spnFormPro.innerHTML="Eliminar"
    fillProveedorForm({apodo:'',nombre:'',apellido:'',tipo:{id:-1},id:''})
    ACCION_DEL()
})
//metosdos de los divs
function esconder_personas(){
    for(let i =0;i<dvs_personas.length;i++){
        dvs_personas[i].style.display='none'
    }
}
function show_cliente_dv(){
    fillCbo(cboCliFormRubro,main_data.rubros)
    dvCliente.style.display='block'
}
function show_proveedor_dv(){
    fillCbo(cboProFormTipo,main_data.tipo_proveedores)
    dvProveedor.style.display='block'
}
function show_responsable_dv(){
    fillTableResponsable(tblResponsable,main_data.responsables)
    dvResponsable.style.display='block'
}
//Forms
function fillResponsableForm(res){
    txtResNombre.value=res.nombre
    txtResApellido.value=res.apellido
    txtResRol.value=res.rol
    txtResId.value=res.id
}
function fillClienteForm(cli){
    txtCliFormApodo.value=cli.apodo
    txtCliFormRazonSocial.value=cli.razon_social
    cboCliFormRubro.value=cli.rubro.id
    txtCliFormId.value=cli.id
}
function fillProveedorForm(pro){
    txtProFormApodo.value=pro.apodo
    txtProFormNombre.value=pro.nombre
    txtProFormApellido.value=pro.apellido
    txtProFormId.value=pro.id
    cboProFormTipo.value=pro.tipo.id
}
//Tablas
function fillTableResponsable(table,lista){
    table.tBodies[0].innerHTML=''
    

    lista.forEach(res=>{
        let row=document.createElement('tr')
        let td_apodo=document.createElement('td')
        td_apodo.innerHTML=res.nombre
        row.addEventListener('click',(e)=>{
            
            fillResponsableForm(res)
            
        })
        row.appendChild(td_apodo)

        table.tBodies[0].appendChild(row)
        
    })
}

//
class PersonasMonitor{
    constructor(){
        this.dvPersonas=document.getElementById('dvMainPersonas')
        this.dvPersonas.style.display='none'
        getAllResponsables().then(responsables=>{main_data.responsables=responsables})
        getAllRubros().then(rubros=>{main_data.rubros=rubros})
        getAllTipoProveedor().then(tipos=>{main_data.tipo_proveedores=tipos})
        getALLTipoEgresos().then(tipos=>main_data.tipo_egresos=tipos)
        getAllUnidades().then(us=>main_data.unidades=us)
        esconder_personas()
        
    }
    cambiar_estado(){
        let x =this.dvPersonas
        if (x.style.display === "none") {
            let nav=document.getElementById('navPersonasVolver')
            nav.style.display='block'
            x.style.display = "block";
        } else {
            esconder_personas()
            x.style.display = "none";
        }
    }
}