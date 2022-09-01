//Main div
let dvMainReportes= document.getElementById('dvMainReportes')
//divs de las diferentes reportes
let dvReporteEgreso=document.getElementById('dvReporteEgreso')
let dvReporteIngreso=document.getElementById('dvReporteIngreso')
let dvReporteSaldo=document.getElementById('dvReporteSaldo')
let dvs_reportes=document.getElementsByClassName('dvReportes')
//volver topvar
let aVolverReporte=document.getElementById('aVolverReporte')
//metodos top var
function cambiar_estado_reportes(){
    let x =dvMainReportes
    if (x.style.display === "none") {
        let nav=document.getElementById('navReportes')
        nav.style.display='block'
        x.style.display = "block";
    } else {
       esconder_reportes()
       x.style.display = "none";
    }
}
//metodos de divs de los diferentes reportes
function esconder_reportes(){
    for(let i=0;i<dvs_reportes.length;i++){
        dvs_reportes[i].style.display='none'
    }
}
function show_reporte_egreso_dv(){
    esconder_reportes()
    dvReporteEgreso.style.display='block'
}
function show_reporte_ingreso_dv(){
    esconder_reportes()
    dvReporteIngreso.style.display='block'
}
function show_reporte_saldo_dv(){
    esconder_reportes()
    dvReporteSaldo.style.display='block'
}
//Funcionalidad volver

aVolverReporte.addEventListener('click',()=>{
    main_monitor.volver_init_reportes()
})
cambiar_estado_reportes()