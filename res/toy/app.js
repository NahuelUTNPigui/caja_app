const nombres_rubros=["transporte","alimento","peligros"]
const nombres=["marcos","agustin","sergio","laura","sancha","juana"]
const apellidos=["suarez","perez","esquivel","trota","london"]
const iniciales=["ACA","IC","DA","SSAS","PY","TC","YT"]
let data={}
//IN line function
(function() {console.log("hola");console.log("hola hola")}())

// Selecting all elements
//Respsssss
let addRes=document.getElementById("addRes")
let modRes=document.getElementById("modRes")
let txtIdRes=document.getElementById("txtIdRes")
let listRes=document.getElementById("listRes")
//Rubros
let addRu=document.getElementById("addRu")
let modRu=document.getElementById("modRu")
let txtIdRu=document.getElementById("txtIdRu")
let listRu=document.getElementById("listRu")
//Cliente
let addC=document.getElementById("addC")
let modC=document.getElementById("modC")
let txtIdC=document.getElementById("txtIdC")
let listC=document.getElementById("listC")
//Tipo proveedores
let addTP=document.getElementById("addTP")
let modTP=document.getElementById("modTP")
let txtIdTP=document.getElementById("txtIdTP")
let listTP=document.getElementById("listTP")
//Proveedores
let addP=document.getElementById("addP")
let modP=document.getElementById("modP")
let txtIdP=document.getElementById("txtIdP")
let listP=document.getElementById("listP")
//tipo egresos
let addTE=document.getElementById("addTE")
let modTE=document.getElementById("modTE")
let txtIdTE=document.getElementById("txtIdTE")
let listTE=document.getElementById("listTE")
//unidades
let addU=document.getElementById("addU")
let modU=document.getElementById("modU")
let txtIdU=document.getElementById("txtIdU")
let listU=document.getElementById("listU")
//egEos
let addE=document.getElementById("addE")
let modE=document.getElementById("modE")
let txtIdE=document.getElementById("txtIdE")
let listE=document.getElementById("listE")
//ingresos
let addI=document.getElementById("addI")
let modI=document.getElementById("modI")
let txtIdI=document.getElementById("txtIdI")
let listI=document.getElementById("listI")
function getAll(){
    let apis=[
        ["responsables",listRes],
        ["rubros",listRu],
        ["clientes",listC],
        ["proveedores",listP],
        ["tipo_proveedores",listTP],
        ["tipo_egresos",listTE],
        ["unidades",listU],
        ["ingresos",listI],
        ["egresos",listE]

    ]
    apis.forEach(tuple=>window.getAllAPI.getAll(tuple[0])
                        .then(lista=>crearLista(tuple[1],lista))
                        .catch(err=>console.log(err)))
    
    
}   
    

//Metodos en general
//metodos para crear filas
function rowear(obj){
    let ul= document.createElement("ul")
    ul.classList.add("row")
    
    for(const atributo in obj){
        
        const li= document.createElement("li")
        const liText=document.createTextNode(obj[atributo])
        li.appendChild(liText)
        ul.appendChild(li)
    }
    return ul
}
//metodos para crear listas para un elemento html
function crearLista(htmlelemento,lista){
    htmlelemento.innerHTML=''
    lista.forEach(element => {
        
        let row=rowear(element)
        htmlelemento.appendChild(row)
    });
}
//metodos para randomizar
function rand_list(lista){
    return lista[Math.floor(Math.random()*lista.length)]
}
function crearRubroAlea(){
    return {id:Math.floor(Math.random()*200),nombre:rand_list(nombres_rubros)}
}
function crearResAlea(){
    return {id:Math.floor(Math.random()*100),nombre:rand_list(nombres_rubros),apellido:rand_list(apellidos),rol:"fake"}
}
function crearClienteAlea(){
    return {id:Math.floor(Math.random()*100),apodo:rand_list(nombres),razon_social:rand_list(nombres_rubros)+rand_list(apellidos),rubro:rand_list(data.rubros)}
}
function crearIngresoAlea(){
    return {id:Math.floor(Math.random()*100),monto:Math.random()*100,cliente:rand_list(data.clientes),unidad:rand_list(data.unidades),responsable:rand_list(data.responsables),observaciones:"todo que decir",fecha:"2000-02-02"}
}
//Metodos de los listener
//For rubro
function addRubro(){
    let new_rubro=crearRubroAlea()
    window.modifyAllAPI.addRubro(new_rubro)
    getAll()
}
function modRubro(){
    let new_rubro=crearRubroAlea()
    let id=txtIdRu.value
    new_rubro.id=parseInt(id)
    window.modifyAllAPI.modRubro(new_rubro)
    getAll()
}
//For Responsable
function addResponsable(){
    let new_res=crearResAlea()
    window.modifyAllAPI.addResponsable(new_res)
    getAll()
}
function modResponsable(){
    let new_res=crearResAlea()
    let id=txtIdRes.value
    new_res.id=parseInt(id)
    window.modifyAllAPI.modResponsable(new_res)
    getAll()
}
//For cliente
function addCliente(){
    let new_cli=crearClienteAlea()
    window.modifyAllAPI.addCliente(new_cli)
    getAll()
}
function modCliente(){
    let new_cli=crearClienteAlea()
    let id=txtIdC.value
    new_cli.id=parseInt(id)
    window.modifyAllAPI.modCliente(new_cli)
    getAll()
}
//For ingreso
function addIngreso(){
    let new_ing=crearIngresoAlea()
    window.modifyAllAPI.addIngreso(new_ing)
    getAll()
}
function modIngreso(){
    let new_ing=crearIngresoAlea()
    let id=txtIdI.value
    
    new_ing.id=parseInt(id)
    
    window.modifyAllAPI.modIngreso(new_ing)
    getAll()
    
}

//Aplicar metodos
getAll()
//rubro
addRu.addEventListener('click',(event)=>{
    addRubro()
})
modRu.addEventListener('click',(event)=>{
    modRubro()
})
//Responsable
addRes.addEventListener('click',(e)=>{
    addResponsable()
})
modRes.addEventListener('click',(e)=>{
    modResponsable()
})
//Cliente
addC.addEventListener('click',(e)=>{
    addCliente()
})
modC.addEventListener('click',(e)=>{
    
    modCliente()
})
//ingreso
addI.addEventListener('click',(event)=>{
    addIngreso()
})
modI.addEventListener('click',(event)=>{
    console.log("mod i")
    modIngreso()
})