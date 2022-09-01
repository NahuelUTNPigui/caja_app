//Todo lo que tenga que ver con init va aca
let dvs_nav=document.getElementsByClassName('dvSec')
//Elementos top var
let aPersonas=document.getElementById('aPersonas')
let aSubCategorias=document.getElementById('aSubcategorias')
let aReportes=document.getElementById('aReportes')
let aEsconder=document.getElementById('aEsconder')
//Elementos personas
let aResponsables=document.getElementById('aResponsables')
let aClientes=document.getElementById('aClientes')
let aProveedores=document.getElementById('aProveedores')
//Elementos subcategorias
let aTipoEgreso=document.getElementById('aTipoEgreso')
let aTipoProveedor=document.getElementById('aTipoProveedor')
let aRubro=document.getElementById('aRubro')
let aUnidad=document.getElementById('aUnidad')
//Elementos reportes
let aEgreso=document.getElementById('aEgreso')
let aIngreso=document.getElementById('aIngreso')
let aSaldo=document.getElementById('aSaldo')
//Elementos del init
let lblSaldo=document.getElementById('lblSaldo')
let tblLastEg=document.getElementById('tblLastEg')
let tblLastIng=document.getElementById('tblLastIng')
//Main form
let aFormIngreso=document.getElementById('aFormIngreso')
let aFormEgreso=document.getElementById('aFormEgreso')


//metodo esconder
function esconder(){
    for(let i =0;i<dvs_nav.length;i++){
        dvs_nav[i].style.display='none'
    }
}
//metodos tov var
function show_personas(){
    
    esconder()
    let dvPersonas=document.getElementById('dvPersonas')
    dvPersonas.style.display='block'
    
}
function show_sub_categorias(){
    esconder()
    let dvSubcategorias=document.getElementById('dvSubcategorias')
    dvSubcategorias.style.display='block'
}
function show_reportes(){
    esconder()
    let dvReportes=document.getElementById('dvReportes')
    dvReportes.style.display='block'
}    
//metods de los items
function show_responsables(){
    main_monitor.show_responsables()
}
function show_clientes(){
    main_monitor.show_clientes()
}
function show_proveedores(){
    main_monitor.show_proveedores()
}
//Metods de las subcategorias
function show_tipo_egresos(){
    main_monitor.show_tipo_egresos()
}
function show_tipo_proveedores(){
    main_monitor.show_tipo_proveedores()
}
function show_rubros(){
    main_monitor.show_rubros()
}
function show_unidades(){
    main_monitor.show_unidades()
}
function show_reporte_egreso(){
    main_monitor.show_reporte_egreso()
}
function show_reporte_ingreso(){
    main_monitor.show_reporte_ingreso()
}
function show_reporte_saldo(){
    main_monitor.show_reporte_saldo()
}
//Metodo main form
function show_form_ingreso(){
    main_monitor.show_form_ingreso()
}
function show_form_egreso(){
    main_monitor.show_form_egreso()
}
function fillTableInit(table,lista,is_ing){
    table.tBodies[0].innerHTML=''
    lista.forEach(e=>{
        let row=document.createElement('tr')
        let td_monto=document.createElement('td')
        td_monto.innerHTML=e.monto
        let td_person=document.createElement('td')
        if(is_ing){
            td_person.innerHTML=e.cliente.apodo
        }
        else{
            td_person.innerHTML=e.proveedor.apodo
        }
        let td_fecha=document.createElement('td')
        td_fecha.innerHTML=e.fecha
        row.appendChild(td_monto)
        row.appendChild(td_person)
        row.appendChild(td_fecha)
        table.tBodies[0].appendChild(row)
    })
}
//Top var funcionalidad

aPersonas.addEventListener('click',show_personas)

aSubCategorias.addEventListener('click',show_sub_categorias)

aReportes.addEventListener('click',show_reportes)


aEsconder.addEventListener('click',esconder)

//Funcioonalidad Personas

aResponsables.addEventListener('click',show_responsables)

aClientes.addEventListener('click',show_clientes)

aProveedores.addEventListener('click',show_proveedores)

//Funcionalidad Subcategeorias
aTipoEgreso.addEventListener('click',show_tipo_egresos)
aTipoProveedor.addEventListener('click',show_tipo_proveedores)
aRubro.addEventListener('click',show_rubros)
aUnidad.addEventListener('click',show_unidades)
//Funcionalidad reportes
aEgreso.addEventListener('click',show_reporte_egreso)
aIngreso.addEventListener('click',show_reporte_ingreso)
aSaldo.addEventListener('click',show_reporte_saldo)
//Funcionalidad main form
aFormIngreso.addEventListener('click',show_form_ingreso)
aFormEgreso.addEventListener('click',show_form_egreso)


//Init Monitor
class InitMonitor{
    constructor(){
        this.dvInit=document.getElementById('dvInit')
        getSaldo().then(saldo=>{lblSaldo.innerHTML=saldo.monto;reloadSaldo(saldo)})
        getLastEgresos().then(egresos=>{
            fillTableInit(tblLastEg,egresos,false);
            egresos.forEach(eg=>reloadUltimoEgreso(eg))
        })
        getLastIngresos().then(ingresos=>{
            fillTableInit(tblLastIng,ingresos,true);
            ingresos.forEach(ig=>reloadUltimoingreso(ig))
        })
        //this.dvInit.style.display='none'
    }
    cambiar_estado(){
        let x =this.dvInit
        if (x.style.display === "none") {
            lblSaldo.innerHTML=''
            lblSaldo.innerHTML=main_data.saldo.monto
            fillTableInit(tblLastEg,main_data.ultimos_egresos,false);
            fillTableInit(tblLastIng,main_data.ultimos_ingresos,true);
            x.style.display = "block";
        } else {
           x.style.display = "none";
        }
    }   
}