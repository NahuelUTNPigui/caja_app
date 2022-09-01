//Me da la sensacion que para los ingresos voy a usar dos pages
//clientes y proveedores traigo todos los necesarios
class Modal_data{
    constructor(){
        this.limit=5
        this.cliente_offset=0
        this.proveedor_offset=0
        this.clientes_page=1
        this.proveedores_page=1
        this.prev_state=WinState.INIT
        this.ingresos_offset=0
        this.ingresos_page=1
        this.egresos_offset=0
        this.egresos_page=1
        this.egresos_rep_offset=0
        this.egresos_rep_page=1
        this.ingresos_rep_offset=0
        this.ingresos_rep_page=1
        this.saldo_offset=0
        this.saldo_page=1
    }
    
    restart(){
        this.cliente_offset=0
        this.proveedor_offset=0
        this.clientes_page=1
        this.proveedores_page=1
        main_data.clientes=[]
        main_data.proveedores=[]
        this.ingresos_offset=0
        this.ingresos_page=1
        this.egresos_offset=0
        this.egresos_page=1
        main_data.egresos=[]
        main_data.ingresos=[]
    }
    next_clientes(){
        if((this.cliente_offset+this.limit)<=main_data.clientes.length){
            this.cliente_offset+=this.limit
            this.clientes_page+=1
        }

    }
    prev_clientes(){
        if((this.cliente_offset-this.limit)>=0){
            this.cliente_offset-=this.limit
            this.clientes_page-=1
        }
    }
    next_proveedores(){
        if((this.proveedor_offset+this.limit)<=main_data.proveedores.length){
            
            this.proveedor_offset+=this.limit
            this.proveedores_page+=1
        }
    }
    prev_proveedores(){
        if((this.proveedor_offset-this.limit)>=0){
            this.proveedor_offset-=this.limit
            this.proveedores_page-=1
        }
    }
    //Va por aca 
    next_egresos(){
        if((this.egresos_offset+this.limit)<=main_data.egresos.length){
            
            this.egresos_offset+=this.limit
            this.egresos_page+=1
        }
    }
    next_ingresos(){
        if((this.ingresos_offset+this.limit)<=main_data.ingresos.length){
            
            this.ingresos_offset+=this.limit
            this.ingresos_page+=1
        }
    }
    prev_egresos(){
        if((this.egresos_offset-this.limit)>=0){
            this.egresos_offset-=this.limit
            this.egresos_page-=1
        }
    }
    prev_ingresos(){}
    llenar_tabla_clientes(){
        fillTableClientes(main_data.clientes.slice(this.cliente_offset,this.cliente_offset+this.limit+1))
    }
    llenar_tabla_proveedores(){
        fillTableProveedores(main_data.proveedores.slice(this.proveedor_offset,this.proveedor_offset+this.limit+1))
    }
    llenar_tabla_ingresos(){
        fillTableIngresos(main_data.ingresos.slice(this.ingresos_offset,this.ingresos_offset+this.limit+1))
    }
    llenar_tabla_egresos(){
        fillTableEgresos(main_data.egresos.slice(this.egresos_offset,this.egresos_offset+this.limit+1))
    }
}

//Modals
// Get the modal cliente
var modalCliente = document.getElementById("modalClientes");
// Get the modal cliente
var modalProveedor = document.getElementById("modalProveedores");
//Get modal ingreso
var modalIngreso=document.getElementById('modalIngresos')
//Get modal egreso
var modalEgreso=document.getElementById('modalEgresos')

// Get the cruz element that closes the modal
var cruzCliente = document.getElementById("btnCruzCliente");
// Get the cruz element that closes the modal
var cruzProveedor = document.getElementById("btnCruzProveedor");
// Get the cruz element that closes the modal
var cruzIngreso = document.getElementById("btnCruzIngreso");
// Get the cruz element that closes the modal
var cruzEgreso = document.getElementById("btnCruzEgreso");


//Form
//Cliente
let cboCliRubro=document.getElementById('cboCliRubro')
let aPrevPageCli=document.getElementById('aPrevPageCli')
let aPageNumberCli=document.getElementById('aPageNumberCli')
let aNextPageCli=document.getElementById('aNextPageCli')
let txtCliApodo=document.getElementById('txtCliApodo')
let txtCliRazonSocial=document.getElementById('txtCliRazonSocial')
let btnBuscarClienteModal=document.getElementById('btnBuscarClienteModal')
let txtModalCliElegido=document.getElementById('txtModalCliElegido')
//Proveedor
let aPrevPagePro=document.getElementById('aPrevPagePro')
let aPageNumberPro=document.getElementById('aPageNumberPro')
let aNextPagePro=document.getElementById('aNextPagePro')
let txtProApodo=document.getElementById('txtProApodo')
let txtProNombre=document.getElementById('txtProNombre')
let txtProApellido=document.getElementById('txtProApellido')
let cboProTipo=document.getElementById('cboProTipo')
let txtModalProElegido=document.getElementById('txtModalProElegido')
//Egresos
let txtEgModalIdProveedor = document.getElementById("txtEgModalIdProveedor")
let txtEgModalApodoProveedor = document.getElementById("txtEgModalApodoProveedor")
let txtEgModalPriFact= document.getElementById("txtEgModalPriFact")
let txtEgModalSecFact = document.getElementById("txtEgModalSecFact")
let dtpModalEgFechaDesde = document.getElementById("dtpModalEgFechaDesde")
let dtpModalEgFechaHasta = document.getElementById("dtpModalEgFechaHasta")
let aPageNumberEg =document.getElementById("aPageNumberEg")
let txtModalEgElegido = document.getElementById("txtModalEgElegido")
//buttons
let btnEgModalBuscarIdProveedor =document.getElementById("btnEgModalBuscarIdProveedor")
let btnModalEgBuscarEgreso = document.getElementById("btnModalEgBuscarEgreso")
let aPrevPageEg = document.getElementById("aPrevPageEg")
let aNextPageEg = document.getElementById("aNextPageEg")
//Ingresos
let txtModalIngIdCliente = document.getElementById("txtModalIngIdCliente")
let txtModalIngApodoCliente = document.getElementById("txtModalIngApodoCliente")
let dtpModalIngPriFact= document.getElementById("dtpModalIngPriFact")
let dtpModalIngSecFact = document.getElementById("dtpModalIngSecFact")
let dtpModalIngFechaDesde = document.getElementById("dtpModalIngFechaDesde")
let dtpModalIngFechaHasta = document.getElementById("dtpModalIngFechaHasta")
let aPageNumberIng = document.getElementById("aPageNumberIng")
let txtModalIngElegido = document.getElementById("txtModalIngElegido")
//Buttons
let btnModalIngBuscarIdCliente = document.getElementById("btnModalIngBuscarIdCliente")
let btnModalIngBuscarIngreso = document.getElementById("btnModalIngBuscarIngreso")
let aPrevPageIng = document.getElementById("aPrevPageIng")
let aNextPageIng = document.getElementById("aNextPageIng")
//Tables
let tblClientes=document.getElementById('tblClientes')
let tblProveedores=document.getElementById('tblProveedores')
let tblIngresos=document.getElementById('tblingresos')
let tblEgresos=document.getElementById('tblEgresos')

//metodos
function fillTableClientes(lista){
    tblClientes.tBodies[0].innerHTML=''
    lista.forEach(element => {
        let row=document.createElement('tr')
        let td_id=document.createElement('td')
        td_id.innerHTML=element.id
        let td_apodo=document.createElement('td')
        td_apodo.innerHTML=element.apodo
        let td_razon_social=document.createElement('td')
        td_razon_social.innerHTML=element.razon_social
        let td_rubro=document.createElement('td')
        td_rubro.innerHTML=element.rubro.nombre
        row.appendChild(td_id)
        row.onclick=function(){
            if(main_monitor.visible===WinState.CLIENTES){
                txtCliFormApodo.value=element.apodo
                txtCliFormRazonSocial.value=element.razon_social
                txtCliFormId.value=element.id
                cboCliFormRubro.value=element.rubro.id
                
                txtModalCliElegido.value=element.id
            }
            if(main_monitor.visible===WinState.INGRESO){
                txtIngApodoCliente.value=element.apodo
                txtIngFormIdCliente.value=element.id
                txtModalCliElegido.value=element.id
            }
            if(main_monitor.visible===WinState.MODAL_INGRESO){
                txtModalIngIdCliente.value=element.id
                txtModalIngApodoCliente.value=element.apodo
                txtModalCliElegido.value=element.id
            }
        }
        row.appendChild(td_apodo)
        row.appendChild(td_razon_social)
        row.appendChild(td_rubro)
        tblClientes.tBodies[0].appendChild(row)
    });
}
function fillTableProveedores(lista){
    tblProveedores.tBodies[0].innerHTML=''
    lista.forEach(element=>{
        let row=document.createElement('tr')
        let td_id=document.createElement('td')
        td_id.innerHTML=element.id
        let td_apodo=document.createElement('td')
        td_apodo.innerHTML=element.apodo
        let td_nombre=document.createElement('td')
        td_nombre.innerHTML=element.nombre
        let td_apellido=document.createElement('td')
        td_apellido.innerHTML=element.apellido
        let td_tipo=document.createElement('td')
        td_tipo.innerHTML=element.tipo.nombre     
        row.onclick=function(){
            if(main_monitor.visible===WinState.PROVEEDORES){
                txtProFormApodo.value=element.apodo
                txtProFormNombre.value=element.nombre
                txtProFormApellido.value=element.apellido
                txtProFormId.value=element.id
                cboProFormTipo.value=element.tipo.id
                txtModalProElegido.value=element.id
            }
            if(main_monitor.visible===WinState.EGRESO){
                txtEgFormApodoProveedor.value=element.apodo
                txtEgFormIdProveedor.value=element.id
                txtModalProElegido.value=element.id
            }
            if(main_monitor.visible===WinState.MODAL_EGRESO){
                txtEgModalApodoProveedor.value=element.apodo
                txtEgModalIdProveedor.value=element.id
                txtModalProElegido.value=element.id
            }
        }
        row.appendChild(td_id)
        row.appendChild(td_apodo)
        row.appendChild(td_nombre)
        row.appendChild(td_apellido)
        row.appendChild(td_tipo)
        tblProveedores.tBodies[0].appendChild(row)        
    })
}
function fillTableEgresos(lista){
    tblEgresos.tBodies[0].innerHTML=''
    lista.forEach(eg=>{
        let row=document.createElement('tr')
        let td_id=document.createElement('td')
        td_id.innerHTML=eg.id
        let td_monto=document.createElement('td')
        td_monto.innerHTML=eg.monto
        let td_proveedor=document.createElement('td')
        td_proveedor.innerHTML=eg.proveedor.apodo
        let td_tipo_egreso=document.createElement('td')
        td_tipo_egreso.innerHTML=eg.tipo_egreso.nombre
        let td_factura=document.createElement('td')
        td_factura.innerHTML=eg.numero_factura.slice(0,4)+"-"+eg.numero_factura.slice(4)
        let td_observacion=document.createElement('td')
        td_observacion.innerHTML=eg.observacion
        let td_fecha=document.createElement('td')
        td_fecha.innerHTML=eg.fecha
        row.addEventListener('click',function(){
            txtEgFormMonto.value=eg.monto
            
            txtEgFormIdProveedor.value =eg.proveedor.id
            txtEgFormApodoProveedor.value =eg.proveedor.apodo
            txtEgFormProFact.value =eg.numero_factura.slice(0,4)
            txtEgFormSecFact.value=eg.numero_factura.slice(4)
            cboEgFormUnidades.value = eg.unidad.id
            cboEgFormTE.value = eg.tipo_egreso.id
            cboEgFormResponsables.value = eg.responsable.id
            txtaEgFormObservacion.value = eg.observacion
            dptEgFormFecha.value = eg.fecha
            txtEgFormId.value=eg.id
            txtModalEgElegido.value=eg.id
        })
        row.appendChild(td_id)
        row.appendChild(td_monto)
        row.appendChild(td_proveedor)
        row.appendChild(td_tipo_egreso)
        row.appendChild(td_factura)
        row.appendChild(td_observacion)
        row.appendChild(td_fecha)
        tblEgresos.tBodies[0].appendChild(row)
    })
}
function fillTableIngresos(lista){
    tblIngresos.tBodies[0].innerHTML=''
    lista.forEach(ig=>{
        let row=document.createElement('tr')
        let td_id=document.createElement('td')
        td_id.innerHTML=ig.id
        let td_monto=document.createElement("td")
        td_monto.innerHTML=ig.monto
        let td_cliente=document.createElement('td')
        td_cliente.innerHTML=ig.cliente.apodo
        let td_numero_factura=document.createElement('td')
        td_numero_factura.innerHTML=ig.numero_factura.slice(0,4)+"-"+ig.numero_factura.slice(4)
        let td_observacion=document.createElement('td')
        td_observacion.innerHTML=ig.observacion
        let td_fecha=document.createElement('td')
        td_fecha.innerHTML=ig.fecha
        row.addEventListener('click',function(){
            txtIngFormId.value=ig.id
            txtIngFormMonto.value=ig.monto
            txtIngFormIdCliente.value=ig.cliente.id
            txtIngApodoCliente.value=ig.cliente.apodo
            txtIngFormPriFact.value=ig.numero_factura.slice(0,4)
            txtIngFormSecFact.value=ig.numero_factura.slice(4)
            cboIngFormResponsable.value=ig.responsable.id
            cboIngFormUnidades.value=ig.unidad.id
            txtaIngFormObservacion.value=ig.observacion
            dptIngFormFecha.value=ig.fecha
            txtModalIngElegido.value=ig.id
            console.log(ig)
            
        })
        row.appendChild(td_id)
        row.appendChild(td_monto)
        row.appendChild(td_cliente)
        row.appendChild(td_numero_factura)
        row.appendChild(td_observacion)
        row.appendChild(td_fecha)
        tblIngresos.tBodies[0].appendChild(row)
    })
}
function voidEgresoModal(){
    txtEgModalIdProveedor.value=""
    txtEgModalApodoProveedor.value=""
    txtEgModalPriFact.value=""
    txtEgModalSecFact.value = ""
    dtpModalEgFechaDesde.value =""
    dtpModalEgFechaHasta.value = ""
    txtModalEgElegido.value=""
}
function voidIngresoModal(){
    txtModalIngIdCliente.value = ""
    txtModalIngApodoCliente.value =""
    dtpModalIngPriFact.value= ""
    dtpModalIngSecFact.value = ""
    dtpModalIngFechaDesde.value = ""
    dtpModalIngFechaHasta.value = ""
    txtModalIngElegido.value=""
}
//Funcionalidad modal cliente
btnBuscarClienteModal.addEventListener('click',function(){
    let where={}
    modal_data.restart()
    aPageNumberCli.innerHTML=modal_data.clientes_page
    if(txtCliApodo.value){
        where.apodo=txtCliApodo.value
    }
    if(txtCliRazonSocial.value){
        where.razon_social=txtCliRazonSocial.value
    }
    where.cod_rubro=cboCliRubro.value
    getClientesWhere(where,0,0).then(clientes=>{main_data.clientes=clientes;modal_data.llenar_tabla_clientes()})
})
aNextPageCli.onclick=function(){
    modal_data.next_clientes()
    aPageNumberCli.innerHTML=modal_data.clientes_page
    modal_data.llenar_tabla_clientes()
}
aPrevPageCli.onclick=function(){
    modal_data.prev_clientes()
    aPageNumberCli.innerHTML=modal_data.clientes_page
    modal_data.llenar_tabla_clientes()

}
//funcionalidad modal proveedor
btnBuscarProveedorModel.onclick=function(){
    let where={}
    modal_data.restart()
    aPageNumberPro.innerHTML=modal_data.proveedores_page
    if(txtProApodo.value){
        where.apodo=txtProApodo.value
    }
    if(txtProNombre.value){
        where.nombre=txtProNombre.value
    }
    if(txtProApellido.value){
        where.apellido=txtProApellido.value
    }

    where.tipo=cboProTipo.value
    
    getProveedoresWhere(where,0,0).then(prvs=>{main_data.proveedores=prvs;modal_data.llenar_tabla_proveedores()})
}
aNextPagePro.onclick=function(){
    modal_data.next_proveedores()
    aPageNumberPro.innerHTML=modal_data.proveedores_page
    modal_data.llenar_tabla_proveedores()
}
aPrevPagePro.onclick=function(){
    modal_data.prev_proveedores()
    aPageNumberPro.innerHTML=modal_data.proveedores_page
    modal_data.llenar_tabla_proveedores()
}
//Funcionalidad modal elgreso
btnEgModalBuscarIdProveedor.addEventListener('click',function(){
    id=txtEgModalIdProveedor.value
    if(id){
        getProveedorId(id).then(p=>fillFormPersona(txtEgModalIdProveedor,txtEgModalApodoProveedor,p))
    }
})
btnModalEgBuscarEgreso.addEventListener('click',function(){
    let where={
        id_prov:txtEgModalIdProveedor.value,
        numero_factura:{
            pri:txtEgModalPriFact.value,
            sec:dtpModalIngSecFact.value,
        },
        fecha_desde:dtpModalEgFechaDesde.value,
        fecha_hasta:dtpModalEgFechaHasta.value

    }
    
    getEgresosWhere(where,0,0).then(egresos=>{
        main_data.egresos=egresos;
        modal_data.llenar_tabla_egresos()}
    )
    

})
aNextPageEg.addEventListener('click',function(){
    modal_data.next_egresos()
    aPageNumberEg.innerHTML=modal_data.egresos_page
    modal_data.llenar_tabla_egresos()
})
aPrevPageEg.addEventListener('click',function(){
    modal_data.prev_egresos()
    aPageNumberEg.innerHTML=modal_data.egresos_page
    modal_data.llenar_tabla_egresos()
})
//Funcionalidad modal ingreso
btnIngBuscarIdCliente.addEventListener('click',function(){
    let id=txtModalIngIdCliente.id
    if(id){
        getClienteId(id).then(p=>fillFormPersona(txtModalIngIdCliente,txtModalIngApodoCliente,p))
    }
})
btnModalIngBuscarIngreso.addEventListener('click',function(e){
    e.preventDefault()
    let where={
        id_cliente:txtModalIngIdCliente.value,
        numero_factura:{
            pri:dtpModalIngPriFact.value,
            sec:txtEgModalSecFact.value,
        },
        fecha_desde:dtpModalIngFechaDesde.value,
        fecha_hasta:dtpModalIngFechaHasta.value

    }
    getIngresosWhere(where,0,0).then(ing=>{
        main_data.ingresos=ing
        modal_data.llenar_tabla_ingresos()
    })
})
aPrevPageIng.addEventListener('click',function(){
    modal_data.prev_ingresos()
    aPageNumberIng.innerHTML=modal_data.ingresos_page
    modal_data.llenar_tabla_ingresos()
})
aNextPageIng.addEventListener('click',function(){
    modal_data.next_ingresos()
    aPageNumberIng.innerHTML=modal_data.ingresos_page
    modal_data.llenar_tabla_ingresos()
})

//Modals funcionalidad
// When the user clicks the button, open the modal 
let cliente_modals=document.getElementsByClassName('eleBuscarCliente')
for(let i=0;i<cliente_modals.length;i++){
    cliente_modals[i].addEventListener('click',function(){
        cboCliRubro.innerHTML=''
        fillCbo(cboCliRubro,main_data.rubros)
        modalCliente.style.display='block'

    })
}
let proveedor_modals=document.getElementsByClassName('eleBuscarProveedor')
for(let i=0;i<proveedor_modals.length;i++){
    proveedor_modals[i].addEventListener('click',function(){
        cboProTipo.innerHTML=''
        fillCbo(cboProTipo,main_data.tipo_proveedores)
        modalProveedor.style.display='block'
    })
}
let ingresos_modal=document.getElementsByClassName('eleBuscarIngreso')
for(let i=0;i<ingresos_modal.length;i++){
    ingresos_modal[i].addEventListener('click',function(){
        modalIngreso.style.display='block'
    })
}
//Cuantas veces lo uso a esta clase
let egresos_modal=document.getElementsByClassName('eleBuscarEgreso')
for(let i=0;i<egresos_modal.length;i++){
    egresos_modal[i].addEventListener('click',function(){
        main_monitor.visible=WinState.MODAL_EGRESO
        modalEgreso.style.display='block'
    })
}
// When the user clicks on cruz (x), close the modal
cruzCliente.onclick = function() {
  modalCliente.style.display = "none";
  modal_data.restart()
  fillTableClientes([])
  txtModalCliElegido.value=''
  aPageNumberCli.innerHTML=modal_data.clientes_page
  
}
cruzProveedor.onclick = function() {
    modalProveedor.style.display = "none";
    modal_data.restart()
    fillTableProveedores([])
    txtModalProElegido.value=''
    aPageNumberPro.innerHTML=modal_data.clientes_page
}
cruzIngreso.onclick=function(){
    modalIngreso.style.display="none"
    modal_data.restart()
    fillTableIngresos([])
    main_monitor.visible=modal_data.prev_state
    voidIngresoModal()
}
cruzEgreso.onclick=function(){
    modalEgreso.style.display="none"
    modal_data.restart()
    fillTableEgresos([])
    main_monitor.visible=modal_data.prev_state
    txtModalEgElegido.value=''
    voidEgresoModal()
}