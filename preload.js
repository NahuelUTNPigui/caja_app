const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld("SimpleAPI",{
    getAll:(model)=>ipcRenderer.invoke(model+":getAll"),
    add:(model,obj)=>ipcRenderer.send(model+":add",obj),
    mod:(model,id,obj)=>ipcRenderer.send(model+":mod",id,obj),
    del:(model,id)=>ipcRenderer.send(model+":del",id),
    getWhere:(model,where,offset,limit)=>ipcRenderer.invoke(model+":get:where",where,offset,limit),
    getLast:(model)=>ipcRenderer.invoke(model+":getLast"),
    getCount:(model,where)=>ipcRenderer.invoke(model+":count",where),
    getPk:(model,id)=>ipcRenderer.invoke(model+":get:id",id)
})