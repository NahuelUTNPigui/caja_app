const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld("getAllAPI",{
    getAll:(model)=>{return ipcRenderer.invoke(model+":getAll")},
    getAllRubros:()=>ipcRenderer.invoke("rubros:getAll"),
    getAllResponsables:()=>ipcRenderer.invoke("responsables:getAll"),
    getAllClientes:()=>ipcRenderer.invoke("clientes:getAll"),
    getAllTipoProveedores:()=>{return ipcRenderer.invoke("tipo_proveedores:getAll")},
    getAllProveedores:()=>ipcRenderer.invoke("proveedores:getAll"),
    getAllTipoEgresos:()=>ipcRenderer.invoke("tipo_egresos:getAll"),
    getAllUnidades:()=>ipcRenderer.invoke("unidades:getAll"),
    getAllEgresos:()=>ipcRenderer.invoke("egresos:getAll"),
    getAllIngresos:()=>ipcRenderer.invoke("ingresos:getAll"),
    //getAll:()=>ipcRenderer.invoke("data:getAll")
})
contextBridge.exposeInMainWorld("modifyAllAPI",{
    addRubro:(rubro)=>ipcRenderer.send("rubros:add",rubro),
    addCliente:(cliente)=>ipcRenderer.send("clientes:add",cliente),
    addResponsable:(responsable)=>ipcRenderer.send("responsables:add",responsable),
    addIngreso:(ingreso)=>ipcRenderer.send("ingresos:add",ingreso),
    //Los modify
    modRubro:(rubro)=>ipcRenderer.send("rubros:mod",rubro),
    modCliente:(cliente)=>ipcRenderer.send("clientes:mod",cliente),
    modResponsable:(responsable)=>ipcRenderer.send("responsables:mod",responsable),
    modIngreso:(ingreso)=>ipcRenderer.send("ingresos:mod",ingreso)
})