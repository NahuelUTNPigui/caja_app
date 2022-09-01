//PROBABLEMENTE HAYA PAGINACION
//Main div
let dvMainSubcategorias= document.getElementById('dvMainSubcategorias')
//divs de las diferentes subcategorias
let dvTipoEgresos=document.getElementById('dvTipoEgresos')
let dvTipoProveedores=document.getElementById('dvTipoProveedores')
let dvRubros=document.getElementById('dvRubros')
let dvUnidades=document.getElementById('dvUnidades')
let dvs_subcategorias=document.getElementsByClassName('dvSubcategorias')
//Tablas
let tblTipoEgresos=document.getElementById('tblTipoEgresos')
let tblTipoProveedores=document.getElementById('tblTipoProveedores')
let tblRubros=document.getElementById('tblRubros')
let tblUnidades=document.getElementById('tblUnidades')
//Botones Tipo Egreso
let aAddTipoEgreso=document.getElementById('aAddTipoEgreso')
let aModTipoEgreso=document.getElementById('aModTipoEgreso')
let aDelTipoEgreso=document.getElementById('aDelTipoEgreso')
let btnFormTE=document.getElementById('btnFormTE')
let spnFormTE=document.getElementById('spnFormTE')
//Form Tipo Egreso
let txtFormTENombre=document.getElementById('txtTEFormNombre')
let txtFormTEId=document.getElementById('txtTEFormId')

//Botones Tipo Proveedor
let aAddTipoProveedor=document.getElementById('aAddTipoProveedor')
let aModTipoProveedor=document.getElementById('aModTipoProveedor')
let aDelTipoProveedor=document.getElementById('aDelTipoProveedor')
let btnFormTP=document.getElementById('btnFormTP')
let spnFormTP=document.getElementById('spnFormTP')
//Form tipo proveedor
let txtFormTPNombre=document.getElementById('txtTPFormNombre')
let txtFormTPId=document.getElementById('txtTPFormId')

//Botones rubro
let aAddRubro=document.getElementById('aAddRubro')
let aModRubro=document.getElementById('aModRubro')
let aDelRubro=document.getElementById('aDelRubro')
let btnFormRubro=document.getElementById('btnFormRubro')
let spnFormRubro=document.getElementById('spnFormRubro')
//Form rubro
let txtFormRubroNombre=document.getElementById('txtRubroFormNombre')
let txtFormRubroId=document.getElementById('txtRubroFormId')

//Botones Unidades
let aAddUni=document.getElementById('aAddUni')
let aModUni=document.getElementById('aModUni')
let aDelUni=document.getElementById('aDelUni')
let btnFormUni=document.getElementById('btnFormUni')
let spnFormUni=document.getElementById('spnFormUni')
//Form rubro
let txtFormUniNombre=document.getElementById('txtUniFormNombre')
let txtFormUniId=document.getElementById('txtUniFormId')


//Funcionalidad
//Tipo egreso
aAddTipoEgreso.onclick=function(){
    
    fillSimpleForm({nombre:'',id:''},txtFormTENombre,txtFormTEId)
    ACCION_ADD()
    spnFormTE.innerHTML="Guardar"
}
aModTipoEgreso.onclick=function(){
    ACCION_MOD()
    spnFormTE.innerHTML="Modificar"
}
aDelTipoEgreso.onclick=function(){
    ACCION_DEL()
    spnFormTE.innerHTML="Eliminar"
}
btnFormTE.onclick=function(e){
    e.preventDefault()
    let id=(ACCION.ADD===main_data.accion)?0:parseInt(txtFormTEId.value)
    let TE={
        nombre:txtFormTENombre.value,
        id:id
    }
    
    if(main_data.accion===ACCION.ADD){
        
        window.SimpleAPI.add("tipo_egresos",TE)
        getALLTipoEgresos().then(tes=>{main_data.tipo_egresos=tes;fillTableSimple(tblTipoEgresos,tes,txtFormTENombre,txtFormTEId)})
        txtFormTENombre.value=''
        txtFormTEId.value=''

    }
    else if(main_data.accion===ACCION.MOD){
        window.SimpleAPI.mod("tipo_egresos",id,TE)
        getALLTipoEgresos().then(tes=>{main_data.tipo_egresos=tes;fillTableSimple(tblTipoEgresos,tes,txtFormTENombre,txtFormTEId)})
        
        
    }
    else{
        window.SimpleAPI.del("tipo_egresos",id)
        getALLTipoEgresos().then(tes=>{main_data.tipo_egresos=tes;fillTableSimple(tblTipoEgresos,tes,txtFormTENombre,txtFormTEId)})
        txtFormTENombre.value=''
        txtFormTEId.value=''
    }
}
//Tipo proveedor
aAddTipoProveedor.onclick=function(){
    
    fillSimpleForm({nombre:'',id:''},txtFormTPNombre,txtFormTPId)
    ACCION_ADD()
    spnFormTP.innerHTML="Guardar"
}
aModTipoProveedor.onclick=function(){
    ACCION_MOD()
    spnFormTP.innerHTML="Modificar"
}
aDelTipoProveedor.onclick=function(){
    ACCION_DEL()
    spnFormTP.innerHTML="Eliminar"
}
btnFormTP.onclick=function(e){
    e.preventDefault()
    let id=(ACCION.ADD===main_data.accion)?0:parseInt(txtFormTPId.value)
    let TP={
        nombre:txtFormTPNombre.value,
        id:id
    }
    
    if(main_data.accion===ACCION.ADD){
        
        window.SimpleAPI.add("tipo_proveedores",TP)
        getAllTipoProveedor().then(tps=>{main_data.tipo_proveedores=tps;fillTableSimple(tblTipoProveedores,tps,txtFormTPNombre,txtFormTPId)})
        txtFormTPNombre.value=''
        txtFormTPId.value=''

    }
    else if(main_data.accion===ACCION.MOD){
        window.SimpleAPI.mod("tipo_proveedores",id,TP)
        getAllTipoProveedor().then(tps=>{main_data.tipo_proveedores=tps;fillTableSimple(tblTipoProveedores,tps,txtFormTPNombre,txtFormTPId)})
        
        
    }
    else{
        window.SimpleAPI.del("tipo_proveedores",id)
        getAllTipoProveedor().then(tps=>{main_data.tipo_proveedores=tps;fillTableSimple(tblTipoProveedores,tps,txtFormTPNombre,txtFormTPId)})
        txtFormTPNombre.value=''
        txtFormTPId.value=''
        
    }
}
//Rubro
aAddRubro.onclick=function(){
    
    fillSimpleForm({nombre:'',id:''},txtFormRubroNombre,txtFormRubroId)
    ACCION_ADD()
    spnFormRubro.innerHTML="Guardar"
}
aModRubro.onclick=function(){
    ACCION_MOD()
    spnFormRubro.innerHTML="Modificar"
}
aDelRubro.onclick=function(){
    ACCION_DEL()
    spnFormRubro.innerHTML="Eliminar"
}
btnFormRubro.onclick=function(e){
    e.preventDefault()
    let id=(ACCION.ADD===main_data.accion)?0:parseInt(txtFormRubroId.value)
    let rubro={
        nombre:txtFormRubroNombre.value,
        id:id
    }
    
    if(main_data.accion===ACCION.ADD){
        
        window.SimpleAPI.add("rubros",rubro)
        getAllRubros().then(rs=>{main_data.rubros=rs;fillTableSimple(tblRubros,rs,txtFormRubroNombre,txtFormRubroId)})
        

    }
    else if(main_data.accion===ACCION.MOD){
        window.SimpleAPI.mod("rubros",id,rubro)
        getAllRubros().then(rs=>{main_data.rubros=rs;fillTableSimple(tblRubros,rs,txtFormRubroNombre,txtFormRubroId)})        
        
    }
    else{
        window.SimpleAPI.del("rubros",id)
        getAllRubros().then(rs=>{main_data.rubros=rs;fillTableSimple(tblRubros,rs,txtFormRubroNombre,txtFormRubroId)})        
    }
}
//Unidad
aAddUni.onclick=function(){
    
    fillSimpleForm({nombre:'',id:''},txtFormUniNombre,txtFormUniId)
    ACCION_ADD()
    spnFormUni.innerHTML="Guardar"
}
aModUni.onclick=function(){
    ACCION_MOD()
    spnFormUni.innerHTML="Modificar"
}
aDelUni.onclick=function(){
    ACCION_DEL()
    spnFormUni.innerHTML="Eliminar"
}
btnFormUni.onclick=function(e){
    e.preventDefault()
    let id=(ACCION.ADD===main_data.accion)?0:parseInt(txtFormUniId.value)
    let unidad={
        nombre:txtFormUniNombre.value,
        id:id
    }
    
    if(main_data.accion===ACCION.ADD){
        
        window.SimpleAPI.add("unidades",unidad)
        getAllUnidades().then(us=>{main_data.unidades=us;fillTableSimple(tblUnidades,us,txtFormUniNombre,txtFormUniId)})
        txtFormUniNombre.value=''
        txtFormUniId.value=''


    }
    else if(main_data.accion===ACCION.MOD){
        window.SimpleAPI.mod("unidades",id,unidad)
        getAllUnidades().then(us=>{main_data.unidades=us;fillTableSimple(tblUnidades,us,txtFormUniNombre,txtFormUniId)})        
    }
    else{
        window.SimpleAPI.del("unidades",id)
        getAllUnidades().then(us=>{main_data.unidades=us;fillTableSimple(tblUnidades,us,txtFormUniNombre,txtFormUniId)})    }
}

//volver topvar
let aVolverSubcategorias=document.getElementById('aVolverSubcategorias')
//metodos top var
function cambiar_estado_sub_categorias(){
    let x =dvMainSubcategorias
    if (x.style.display === "none") {
        let nav=document.getElementById('navSubcategoriasVolver')
        nav.style.display='block'
        x.style.display = "block";
    } else {
        esconder_subcategorias()
        x.style.display = "none";
    }

}
//metodos de divs de las diferentes subcategorias
function esconder_subcategorias(){
    for(let i=0;i<dvs_subcategorias.length;i++){
        dvs_subcategorias[i].style.display='none'
        fillSimpleForm({nombre:'',id:''},txtFormTENombre,txtFormTEId)
        fillSimpleForm({nombre:'',id:''},txtFormTPNombre,txtFormTPId)
        fillSimpleForm({nombre:'',id:''},txtFormRubroNombre,txtFormRubroId)
        fillSimpleForm({nombre:'',id:''},txtFormUniNombre,txtFormUniId)
    }
}
function show_tipo_egresos_dv(){
    esconder_subcategorias()
    dvTipoEgresos.style.display='block'
    fillTableSimple(tblTipoEgresos,main_data.tipo_egresos,txtFormTENombre,txtFormTEId)
}
function show_tipo_proveedores_dv(){
    esconder_subcategorias()
    dvTipoProveedores.style.display='block'
    fillTableSimple(tblTipoProveedores,main_data.tipo_proveedores,txtFormTPNombre,txtFormTPId)
}
function show_rubros_dv(){
    esconder_subcategorias()
    dvRubros.style.display='block'
    fillTableSimple(tblRubros,main_data.rubros,txtFormRubroNombre,txtFormRubroId)
}
function show_unidades_dv(){
    esconder_subcategorias()
    dvUnidades.style.display='block'
    fillTableSimple(tblUnidades,main_data.unidades,txtFormUniNombre,txtFormUniId)

}
//Funcionalidad volver
cambiar_estado_sub_categorias()
aVolverSubcategorias.addEventListener('click',()=>{
    main_monitor.volver_init_subcategorias()
})