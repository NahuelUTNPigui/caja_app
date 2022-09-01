//Constantes
class WinState{
    static INIT=new WinState('init')
    static INGRESO=new WinState('ingreso')
    static MODAL_INGRESO=new WinState("modal_ingreso")
    static EGRESO=new WinState('egreso')
    static MODAL_EGRESO=new WinState('modal_egreso')
    static RESPONSABLES=new WinState('responsables')
    static UNIDADES=new WinState('unidades')
    static TIPO_EGRESO=new WinState('tipo_egreso')
    static PROVEEDORES=new WinState('proveedores')
    static TIPO_PROVEEDOR=new WinState('tipo_proveedor')
    static CLIENTES=new WinState('clientes')
    static RUBROS=new WinState('rubros')
    static REPORTE_EGRESO=new WinState('reporte_egreso')
    static REPORTE_INGRESO=new WinState('reporte_ingreso')
    static REPORTE_SALDO=new WinState('reporte_saldo')
}

class ACCION{
    static ADD=new ACCION('guardar')
    static MOD=new ACCION('modificar')
    static LEER=new ACCION('leer')
    static DEL=new ACCION('eliminar')
}
//Tecnica de memoizacion
class DATA{
    constructor(){
        this.saldo=0.0
        this.ultimos_ingresos=[]
        this.ultimos_egresos=[]
        this.responsables=[]
        this.unidades=[]
        this.tipo_egresos=[]
        this.tipo_proveedores=[]
        this.rubros=[]
        this.egresos=[]
        this.ingresos=[]
        this.clientes=[]
        this.proveedores=[]
        this.accion=ACCION.LEER
        this.clientes_count=0
        this.proveedores_count=0
    }
    getRubroValue(nombre){
        let idx_rubro=this.rubros.findIndex(r=>r.nombre===nombre)
        if(idx_rubro===-1){return -1}
        else{return this.rubros[idx_rubro].id}
        
    }

}
//Patron state, definir el diagrama de estado
//Clase encargada de manejar los datos es el controller mayor del mvc
class Monitor{
    constructor(){
        this.visible=WinState.INIT
        this.init_monitor=new InitMonitor()
        this.personas_monito=new PersonasMonitor()


    }
    setVisible(state){
        this.visible=state
    }


    volver_init_personas(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.INIT)
        this.personas_monito.cambiar_estado()
        main_data.restart_selected()
    }
    volver_init_subcategorias(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.INIT)
        cambiar_estado_sub_categorias()
        ACCION_LEER()
    }
    volver_init_reportes(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.INIT)
        cambiar_estado_reportes()        
    }
    volver_init_egreso(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.INIT)
        cambiar_estado_main_egreso()
    }
    volver_init_ingreso(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.INIT)
        cambiar_estado_main_ingreso()
    }    
    show_clientes(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.CLIENTES)
        this.personas_monito.cambiar_estado()
        show_cliente_dv()
        ACCION_ADD()
    }
    show_proveedores(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.PROVEEDORES)
        this.personas_monito.cambiar_estado()
        show_proveedor_dv()
        ACCION_ADD()
    }
    show_responsables(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.RESPONSABLES)
        this.personas_monito.cambiar_estado()
        show_responsable_dv()
        ACCION_ADD()
    }
    show_tipo_egresos(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.TIPO_EGRESO)
        cambiar_estado_sub_categorias()
        show_tipo_egresos_dv()
        ACCION_ADD()
    }
    show_tipo_proveedores(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.TIPO_PROVEEDOR)
        cambiar_estado_sub_categorias()
        show_tipo_proveedores_dv()
        ACCION_ADD()
    }
    show_rubros(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.RUBROS)
        cambiar_estado_sub_categorias()
        show_rubros_dv()
        ACCION_ADD()
    }
    show_unidades(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.UNIDADES)
        cambiar_estado_sub_categorias()
        show_unidades_dv()
        ACCION_ADD()
    }
    show_reporte_ingreso(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.REPORTE_INGRESO)
        cambiar_estado_reportes()
        show_reporte_ingreso_dv()
        ACCION_LEER()
    }
    show_reporte_egreso(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.REPORTE_EGRESO)
        cambiar_estado_reportes()
        show_reporte_egreso_dv()
        ACCION_LEER()
    }
    show_reporte_saldo(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.REPORTE_SALDO)
        cambiar_estado_reportes()
        show_reporte_saldo_dv()
        ACCION_LEER()
    }
    show_form_ingreso(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.INGRESO)
        cambiar_estado_main_ingreso()
        ACCION_ADD()
    }
    show_form_egreso(){
        this.init_monitor.cambiar_estado()
        this.setVisible(WinState.EGRESO)
        cambiar_estado_main_egreso()
        ACCION_ADD()
    }
}
//No se donde ponerlo pero va
function getSaldo(){
    return window.SimpleAPI.getAll("saldo")
}
function getLastIngresos(){
    return window.SimpleAPI.getLast("ingresos")
}
function getLastEgresos(){
    return window.SimpleAPI.getLast("egresos")
}
function getAllResponsables(){
    return window.SimpleAPI.getAll("responsables")
}
function getAllRubros(){
    return window.SimpleAPI.getAll("rubros")
}
function getAllTipoProveedor(){
    return window.SimpleAPI.getAll("tipo_proveedores")
}
function getALLTipoEgresos(){
    return window.SimpleAPI.getAll("tipo_egresos")
}
function getAllUnidades(){
    return window.SimpleAPI.getAll("unidades")
}
function getClientesWhere(where,offset,limit){
    return window.SimpleAPI.getWhere("clientes",where,offset,limit)
}
function getProveedoresWhere(where,offset,limit){
    return window.SimpleAPI.getWhere("proveedores",where,offset,limit)
}
function getProveedorId(id){
    return window.SimpleAPI.getPk("proveedores",id)
}
function getClienteId(id){
    return window.SimpleAPI.getPk("clientes",id)
}
function getIngresosWhere(where,offset,limit){
    return window.SimpleAPI.getWhere("ingresos",where,offset,limit)
}
function getIngresosWhereCount(where,offset,limit){
    return window.SimpleAPI.getCount("ingresos",where,offset,limit)
}
function getEgresosWhere(where,offset,limit){
    return window.SimpleAPI.getWhere("egresos",where,offset,limit)
}
function getEgresosWhereCount(where){
    return window.SimpleAPI.getCount("egresos",where)
}
//Cbo
function fillCbo(cbo,lista){
    let empty_opt=document.createElement('option')
    empty_opt.value=-1
    empty_opt.innerHTML=''
    cbo.appendChild(empty_opt)
    lista.forEach(elm=>{
        let opt=document.createElement('option')
        opt.value=elm.id
        opt.innerHTML=elm.nombre
        cbo.appendChild(opt)
    })
}
//Llenar id apodo de una persona
function fillFormPersona(campo_id,campo_apodo,persona){
    campo_id.value=persona.id
    campo_apodo.value=persona.apodo
}
//Simple table
function fillTableSimple(table,lista,txtNombre_target,txtId_target){
    table.tBodies[0].innerHTML=''
    lista.forEach(element => {
        let row=document.createElement('tr')
        let td_nombre=document.createElement('td')
        td_nombre.innerHTML=element.nombre
        
        row.onclick=function(){
            
            txtNombre_target.value=element.nombre
            txtId_target.value=element.id

        }
        row.appendChild(td_nombre)
        table.tBodies[0].appendChild(row)
    });
}
//Simple form
function fillSimpleForm(obj,txtNombre_target,txtId_target){
    txtNombre_target.value=obj.nombre
    txtId_target.value=obj.id
}