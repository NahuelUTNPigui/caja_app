
function  tecla(e){
    if(e.code=='Escape'){
        if(main_monitor.visible===WinState.INIT){
            esconder()
        }
    }
    if(e.code=='Backspace'){
        console.log("atras")
    }
    
}
document.addEventListener('keydown', tecla);
let main_monitor=new Monitor()
let main_data=new DATA()
let modal_data=new Modal_data()
function reloadSaldo(saldo){
    main_data.saldo=saldo
}
function reloadUltimoEgreso(ultimo_egreso){
    main_data.ultimos_egresos.unshift(ultimo_egreso)
    if(main_data.ultimos_egresos.length>5){
        main_data.ultimos_egresos.pop()
    }
}
function reloadUltimoingreso(ultimo_ingreso){
    main_data.ultimos_ingresos.unshift(ultimo_ingreso)
    if(main_data.ultimos_ingresos.length>5){
        main_data.ultimos_ingresos.pop()
    }
}
function ACCION_ADD(){
    console.log("add")
    main_data.accion=ACCION.ADD
}
function ACCION_LEER(){
    console.log("leer")
    main_data.accion=ACCION.LEER
}
function ACCION_MOD(){
    console.log("mod")
    main_data.accion=ACCION.MOD
}
function ACCION_DEL(){
    console.log("del")
    main_data.accion=ACCION.DEL
}
//Me da la sensacion que aca va a estar la interacccion con la electronAPI y la entrada y salida de datos
