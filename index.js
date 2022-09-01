const { app, BrowserWindow,ipcMain,dialog } = require('electron')
const{APP_DATA}=require("./data_helper.js")
const toy_files={idxhtml:"toy_index.html",pload:"toy_preload.js"}
const real_files={idxhtml:"index.html",pload:"preload.js"}
const path = require('path')

function createWindow () {
    const win = new BrowserWindow({
      width: 1200,
      height: 900,
      webPreferences: {
        preload: path.join(__dirname, real_files.pload)
      }
    })
    
    win.loadFile(real_files.idxhtml)
}

function agregarCliente(cliente){
  APP_DATA.data.clientes.push(cliente)
}

function agregarIngreso(ingreso){
  APP_DATA.data.ingresos.push(ingreso)
}
function modificarRubro(rubro){
  APP_DATA.modifyRubro(rubro)
}
function modificarCliente(cliente){
  APP_DATA.modifyCliente(cliente)
}
function modificarIngreso(ingreso){
  
  APP_DATA.modifyIngreso(ingreso)
}
app.whenReady().then(() => {
    
    APP_DATA.sync().then(()=>{
      APP_DATA.fakeData()}
    )
    createWindow()
   
    ipcMain.handle("rubros:getAll",async ()=>{return await APP_DATA.getAllRubros()})    
    ipcMain.handle("responsables:getAll",async()=>{return await APP_DATA.getAllResponsable()})
    ipcMain.handle("clientes:getAll",async()=>{return await APP_DATA.getAllClientes()})
    ipcMain.handle("tipo_proveedores:getAll",async()=>{return await APP_DATA.getAllTipoProveedor()})
    ipcMain.handle("proveedores:getAll",async()=>{return await APP_DATA.getAllProveedores()})
    ipcMain.handle("tipo_egresos:getAll",async()=>{return await APP_DATA.getAllTipoEgreso()})
    ipcMain.handle("unidades:getAll",async()=>{return await APP_DATA.getAllUnidades()})
    ipcMain.handle("egresos:getAll",async()=>{return await APP_DATA.getAllEgresos()})
    ipcMain.handle("egresos:getLast",async()=>{return await APP_DATA.getLastEgresos()})
    ipcMain.handle("ingresos:getAll",async()=>{return await APP_DATA.getAllIngresos()})
    ipcMain.handle("ingresos:getLast",async()=>{return await APP_DATA.getLastIngresos()})
    ipcMain.handle("saldo:getAll",async()=>{let saldo=await APP_DATA.getSaldo();return saldo})
    //where
    ipcMain.handle("clientes:get:where",async(evento,where,offset,limit)=>{return await APP_DATA.getClienteWhere(where,offset,limit)})
    ipcMain.handle("proveedores:get:where",async(evento,where,offset,limit)=>{return await APP_DATA.getProveedorWhere(where,offset,limit)})
    ipcMain.handle("egresos:get:where",async(evento,where,offset,limit)=>{return await APP_DATA.getEgresosWhere(where,offset,limit)})
    ipcMain.handle("ingresos:get:where",async(evento,where,offset,limit)=>{return await APP_DATA.getIngresosWhere(where,offset,limit)})
    //id
    ipcMain.handle("proveedores:get:id",async(evento,id)=>{return await APP_DATA.getProveedorId(id)})
    ipcMain.handle("clientes:get:id",async(evento,id)=>{return await APP_DATA.getClienteId(id)})
    //modify
    ipcMain.on("rubros:mod",async (evento,id,rubro)=>{return await APP_DATA.mod("Rubro",id,rubro)})
    ipcMain.on("tipo_egresos:mod",async (evento,id,tipo_egreso)=>{return await APP_DATA.mod("TipoEgreso",id,tipo_egreso)})
    ipcMain.on("tipo_proveedores:mod",async(evento,id,tipo_proveedor)=>{return await APP_DATA.mod("TipoProveedor",id,tipo_proveedor)})
    ipcMain.on("unidades:mod",async(evento,id,unidad)=>{return await APP_DATA.mod("Unidad",id,unidad)})
    ipcMain.on("clientes:mod",async (evento,id,cliente)=>{await APP_DATA.modCliente(id,cliente)})
    ipcMain.on("proveedores:mod",async (evento,id,proveedor)=>{await APP_DATA.modProveedor(id,proveedor)})
    ipcMain.on("responsables:mod",async (evento,id,responsable)=>{await APP_DATA.modResponsable(id,responsable)})
    
    ipcMain.on("egresos:mod",async(evento,id,egreso)=>{await APP_DATA.mod("Egreso",id,egreso)})
    ipcMain.on("ingresos:mod",async(evento,id,ingreso)=>{await APP_DATA.mod("Ingreso",id,ingreso)})
    //counts
    ipcMain.handle("clientes:count",async(evento,where)=>{return await APP_DATA.count("Cliente")})
    ipcMain.handle("proveedores:count",async(evento,where)=>{return await APP_DATA.count("Proveedor")})
    ipcMain.handle("egresos:count",async(evento,where)=>{return await APP_DATA.countWhere("Egreso",where)})
    //ADD
    ipcMain.on("rubros:add",async(evento,rubro)=>{return await APP_DATA.addRubro(rubro)})
    ipcMain.on("tipo_egresos:add",async(evento,tipo_egreso)=>await APP_DATA.addTipoEgreso(tipo_egreso))
    ipcMain.on("tipo_proveedores:add",async(evento,tipo_proveedor)=>await APP_DATA.addTipoProveedor(tipo_proveedor))
    ipcMain.on("unidades:add",async(evento,unidad)=>await APP_DATA.addUnidad(unidad))
    ipcMain.on("responsables:add",async (evento,responsable)=>{await APP_DATA.addResponsable(responsable)})
    ipcMain.on("clientes:add",async (evento,cliente)=>{await APP_DATA.addCliente(cliente)})
    ipcMain.on("proveedores:add",async (evento,proveedor)=>{await APP_DATA.addProveedor(proveedor)})
    
    ipcMain.on("egresos:add",async(evento,egreso)=>{await APP_DATA.addEgreso(egreso)})
    ipcMain.on("ingresos:add",async(evento,ingreso)=>await APP_DATA.addIngreso(ingreso  ))


    
    //Delete
    ipcMain.on("rubros:del",async(evento,id)=>await APP_DATA.del("Rubro",id))
    ipcMain.on("tipo_egresos:del",async(evento,id)=>await APP_DATA.del("TipoEgreso",id))
    ipcMain.on("tipo_proveedores:del",async(evento,id)=>await APP_DATA.del("TipoProveedor",id))
    ipcMain.on("unidades:del",async(evento,id)=>await APP_DATA.del("Unidad",id))
    ipcMain.on("responsables:del",async(evento,id)=>{await APP_DATA.delResponsable(id)})
    ipcMain.on("clientes:del",async(evento,id)=>{await APP_DATA.delCliente(id)})
    ipcMain.on("proveedores:del",async(evento,id)=>{await APP_DATA.delProveedor(id)})

    ipcMain.on("egresos:del",async(evento,id)=>await APP_DATA.del("Egreso",id))
  }
)