
const {sequelize} = require("./Database.js")
const{Op} = require("sequelize")
//saldo
async function getSaldo(saldo_model){
    let saldo_db = await saldo_model.findAll()
    
    let saldo={
        id:saldo_db[0].dataValues.id,
        monto:saldo_db[0].dataValues.monto
    }

    return saldo
}
//Rubros
async function getAllRubros(rubro_model){
    let rubros_bd=await rubro_model.findAll()
    let rubros=rubros_bd.map(rbd=>{return {
        id:rbd.id,
        nombre:rbd.nombre
    }})
    return rubros 
}

async function getPkRubro(rubro_model,id,paranoid){
    let rubro_bd= await rubro_model.findByPk(id,{paranoid:paranoid})
    return {
        id:rubro_bd.id,
        nombre:rubro_bd.nombre
    }
}

//Tipo egreso
async function getAllTipoEgreso(tipo_egreso_model){
    let tipo_egreso_bd=await tipo_egreso_model.findAll()
    let tipo_egresos=tipo_egreso_bd.map(tebd=>{
        return {
            id:tebd.id,
            nombre:tebd.nombre
        }
    })
    return tipo_egresos 

}
async function getPkTipoEgreso(tipo_egreso_model,id,paranoid){
    let tipo_egreso_bd=await tipo_egreso_model.findByPk(id,{paranoid:paranoid})
    return {
        id:tipo_egreso_bd.id,
        nombre:tipo_egreso_bd.nombre
    }
    return tipo_egreso_model.findByPk(id)
}

//Tipo proveedor
async function getAllTipoProveedor(tipo_proveedor_model){
    let tipos_proveedores_bd=await tipo_proveedor_model.findAll()
    let tipo_proveedores=tipos_proveedores_bd.map(tpbd=>{return {
        id:tpbd.id,
        nombre:tpbd.nombre
    }})
    return tipo_proveedores
}
async function getPkTipoProveedor(tipo_proveedor_model,id,paranoid){
    let tipo_proveedor_bd=await tipo_proveedor_model.findByPk(id,{paranoid:paranoid})
    return {
        id:tipo_proveedor_bd.id,
        nombre:tipo_proveedor_bd.nombre
    }

}

//Reponsable
async function getAllResponsable(responsable_model){
    let responsables_bd=await responsable_model.findAll()
    let responsables=responsables_bd.map(rbd=>{
        return {
            id:rbd.id,
            nombre:rbd.nombre,
            apellido:rbd.apellido,
            rol:rbd.rol
        }
    })
    return responsables
}
async function getPkResponsable(responsable_model,id,paranoid){
    let responsable_bd=await responsable_model.findByPk(id,{paranoid:paranoid})
    let responsable ={
        id:id,
        nombre:responsable_bd.nombre,
        apellido:responsable_bd.apellido,
        rol:responsable_bd.rol        
    }
    return responsable
}

//Unidad
async function getAllUnidades(unidad_model){
    let unidades_bd=await unidad_model.findAll()
    let unidades=unidades_bd.map(ubd=>{return {
        id:ubd.id,
        nombre:ubd.nombre
    }})
    return unidades
}
async function getPkUnidad(unidad_model,id,paranoid){
    let unidad_bd=await unidad_model.findByPk(id,{paranoid:paranoid})
    return {
        id:unidad_bd.id,
        nombre:unidad_bd.nombre
    }
}

//Cliente
function getDBAllClientes(cliente_model){
    return cliente_model.findAll()
}
function getDBPkCliente(cliente_model,id,paranoid){
    return cliente_model.findByPk(id,{paranoid:paranoid})
}
async function getPkCliente(cliente_model,rubro_model,id){
    let cliente = await getDBPkCliente(cliente_model,id)
    if(cliente===null){
        return {
            id:id,
            apodo:"no existe",
            razon_social:"no existe",
            rubro:-1
        }
    }
    let rubro = await getPkRubro(rubro_model,cliente.cod_rubro,false)
    return {
        id:cliente.id,
        apodo:cliente.apodo,
        razon_social:cliente.razon_social,
        rubro:rubro
    }
}
async function getClientes(rubro_model,clientes_bd_data){
    let clientes_bd=clientes_bd_data.map(c_bd=>c_bd.dataValues)
    let rubros_promise=clientes_bd.map(c=>getPkRubro(rubro_model,c.cod_rubro,false))
    let rubros=await Promise.all(rubros_promise)
    let clientes=[]
    for(let i=0;i<rubros.length;i++){
        let c=clientes_bd[i]
        clientes.push({
            id:c.id,
            apodo:c.apodo,
            razon_social:c.razon_social,
            rubro:rubros[i]
        })
    }
    return clientes
}
async function getDBWhereClientes(cliente_model,where_values,offset,limit){
    let where={}
    
    if(where_values.apodo){
        where.apodo={[Op.substring]:where_values.apodo}
    }
    if(where_values.razon_social){
        where.razon_social={[Op.substring]:where_values.razon_social}
    }
    if(parseInt(where_values.cod_rubro)!==-1){
        
        where.cod_rubro={[Op.eq]:where_values.cod_rubro}
    }
    
    if(limit===0){
        return await cliente_model.findAll({where:where,offset:offset})
    }
    else{
        return await cliente_model.findAll({where:where,offset:offset,limit:limit})
    }
    
}
async function getAllClientes(cliente_model,rubro_model){
    let clientes_bd_data=await getDBAllClientes(cliente_model)
    return await getClientes(rubro_model,clientes_bd_data)
}
async function getWhereClientes(cliente_model,rubro_model,where_values,offset,limit){
    let clientes_bd_data=await getDBWhereClientes(cliente_model,where_values,offset,limit)
    return await getClientes(rubro_model,clientes_bd_data)
}

//Proveedor
function getDBAllProveedores(proveedor_model){
    return proveedor_model.findAll()
}
function getDBPkProveedor(proveedor_model,id,paranoid){
    return proveedor_model.findByPk(id,{paranoid:paranoid})
}
async function getProveedores(tipo_proveedor_model,proveedor_bd_data){
    let provs_bd=proveedor_bd_data.map(p_bd=>p_bd.dataValues)
    let tipos_promises=provs_bd.map(p=>getPkTipoProveedor(tipo_proveedor_model,p.cod_tipo_proveedor,false))
    let tipos=await Promise.all(tipos_promises)
    let proveedores=[]
    for(let i=0;i<tipos.length;i++){
        let p=provs_bd[i]
        proveedores.push({
            id:p.id,
            apodo:p.apodo,
            nombre:p.nombre,
            apellido:p.apellido,
            tipo:tipos[i]
        })
    }
    return proveedores
}
async function getPkProveedor(proveedor_model,tipo_proveedor_model,id){

    let prov_bd=await getDBPkProveedor(proveedor_model,id)
    if(prov_bd===null){
        return {
            id:id,
            apodo:"no existe",
            nombre:"no existe",
            apellido:"no existe",
            tipo:-1
        }        
    }
    let tipo_bd=await getPkTipoProveedor(tipo_proveedor_model,prov_bd.cod_tipo_proveedor,false)
    return {
        id:prov_bd.id,
        apodo:prov_bd.apodo,
        nombre:prov_bd.nombre,
        apellido:prov_bd.apellido,
        tipo:tipo_bd
    }
}
//where object seria {apodo:apodo, nombre:nombre, apellido:apellido,tipo:cod_tipo_proveedor }
async function getDBWhereProveedores(proveedor_model,where_values,offset,limit){
    let where_obj={}
    if(where_values.apodo){
        where_obj.apodo={[Op.substring]:where_values.apodo}
    }
    if(where_values.nombre){
        where_obj.nombre={[Op.substring]:where_values.nombre}
    }
    if(where_values.apellido){
        where_obj.apellido={[Op.substring]:where_values.apellido}
    }
    if(parseInt(where_values.tipo)!==-1){
        where_obj.cod_tipo_proveedor=where_values.tipo
    }
    if(limit===0){
        return await proveedor_model.findAll({where:where_obj,offset:offset})
    }else{
        return await proveedor_model.findAll({where:where_obj,offset:offset,limit:limit})
    }   
}
async function getAllProveedores(proveedor_model,tipo_proveedor_model){
    let proveedor_bd_data=await getDBAllProveedores(proveedor_model)
    return await getProveedores(tipo_proveedor_model,proveedor_bd_data)
       
}
async function getWhereProveedor(proveedor_model,tipo_proveedor_model,where,offset,limit){
    let proveedor_bd_data=await getDBWhereProveedores(proveedor_model,where,offset,limit)
    
    return await getProveedores(tipo_proveedor_model,proveedor_bd_data)
}
//Ingreso
function getDBAllIngresos(ingreso_model){
    return ingreso_model.findAll()
}
function getFnLastOrderIngreso(ingreso_model){
    return ingreso_model.findAll({order:[["fecha","DESC"]],limit:4})
}
function getDBIngresosWhere(ingreso_model,where,offset,limit){
    let where_db={}
    if(where.id_cliente){
        where_db.cod_cliente=where.id_cliente
    }
    if(where.fecha_desde){
        where_db.fecha={[Op.gte]:where.fecha_desde}
    }
    if(where.fecha_hasta){
        where_db.fecha={[Op.lte]:where.fecha_hasta}
        if(where.fecha_desde){
            where_db.fecha={[Op.and]:{[Op.gte]:where.fecha_desde,[Op.lte]:where.fecha_hasta}}
        }
    }
    
    if(where.numero_factura.pri){
        where_db.numero_factura={[Op.startsWith]:where.numero_factura.pri}    
    }
    if(where.numero_factura.sec){
        where_db.numero_factura={[Op.endsWith]:where.numero_factura.sec}
        if(where.numero_factura.pri){
            where_db.numero_factura={[Op.and]:{[Op.startsWith]:where.numero_factura.pri,[Op.endsWith]:where.numero_factura.sec}}
        }
    }
    if(limit===0){
        return ingreso_model.findAll({where:where_db,offset:offset})
    }
    else{
        return ingreso_model.findAll({where:where_db,offset:offset,limit:limit})
    }

}
async function getIngresosWhere(ingreso_model,cliente_model,unidad_model,responsable_model,rubro_model,where,offset,limit){
    let ingreso_bd_data = await getDBIngresosWhere(ingreso_model,where,offset,limit)
    return getIngresos(cliente_model,unidad_model,responsable_model,rubro_model,ingreso_bd_data)
}
async function getIngresos(cliente_model,unidad_model,responsable_model,rubro_model,ingresos_bd_data){
    let ingresos_bd=ingresos_bd_data.map(i_bd=>i_bd.dataValues)
    let clientes_promise=[]
    let unidades_promise=[]
    let responsables_promise=[]
    for(let i =0;i<ingresos_bd.length;i++){
        i_bd=ingresos_bd[i]
        clientes_promise.push(getPkCliente(cliente_model,rubro_model,i_bd.cod_cliente,false))
        unidades_promise.push(getPkUnidad(unidad_model,i_bd.cod_unidad,false))
        responsables_promise.push(getPkResponsable(responsable_model,i_bd.cod_responsable,false))
    }
    let clientes=await Promise.all(clientes_promise)
    let unidades = await Promise.all(unidades_promise)
    let responsables = await Promise.all(responsables_promise)
    let ingresos=[]
    for(let i =0;i<ingresos_bd.length;i++){
        let i_bd=ingresos_bd[i]
        let c=clientes[i]
        let u = unidades[i]
        let r=responsables[i]
        ingresos.push({
            id:i_bd.id,
            monto:i_bd.monto,
            cliente:c,
            numero_factura:i_bd.numero_factura,
            observacion:i_bd.observacion,
            fecha:i_bd.fecha,
            unidad:u,
            responsable:r
        })
    }
    return ingresos
}
async function getLastOrderIngreso(ingreso_model,cliente_model,unidad_model,responsable_model,rubro_model){
    let ingresos_bd=await getFnLastOrderIngreso(ingreso_model)
    return await getIngresos(cliente_model,unidad_model,responsable_model,rubro_model,ingresos_bd)
}

//La deberia eliminar
async function getAllIngresos(ingreso_model,cliente_model,unidad_model,responsable_model,rubro_model){
    let ingresos_bd_data=await getDBAllIngresos(ingreso_model)
    return await getIngresos(cliente_model,unidad_model,responsable_model,rubro_model,ingresos_bd_data)

}
//Egresos
function getDBAllEgresos(egreso_model){
    return egreso_model.findAll()
}
function getFnLastOrderEgreso(egreso_model){
    return egreso_model.findAll({order:[["fecha","DESC"]],limit:4})
}
function getDBEgresosWhere(egreso_model,where,offset,limit){
    let where_db={}
    if(where.id_prov){
        where_db.cod_proveedor=where.id_prov
    }
    if(where.fecha_desde){
        where_db.fecha={[Op.gte]:new Date(where.fecha_desde)}
    }
    if(where.fecha_hasta){
        where_db.fecha={[Op.lte]:new Date(where.fecha_hasta)}
        if(where.fecha_desde){
            where_db.fecha={[Op.and]:{[Op.gte]:new Date(where.fecha_desde),[Op.lte]:new Date(where.fecha_hasta)}}
        }
    }
    
    if(where.numero_factura.pri){
        where_db.numero_factura={[Op.startsWith]:where.numero_factura.pri}    
    }
    if(where.numero_factura.sec){
        where_db.numero_factura={[Op.endsWith]:where.numero_factura.sec}
        if(where.numero_factura.pri){
            where_db.numero_factura={[Op.and]:{[Op.startsWith]:where.numero_factura.pri,[Op.endsWith]:where.numero_factura.sec}}
        }
    }
    if(limit===0){
        return egreso_model.findAll({where:where_db,offset:offset})
    }
    else{
        return egreso_model.findAll({where:where_db,offset:offset,limit:limit})
    }
    
}
async function getEgresos(proveedor_model,unidad_model,tipo_egreso_model,responsable_model,tipo_proveedor_model,egresos_bd_data){
    let egresos_bd=egresos_bd_data.map(e_bd=>e_bd.dataValues)
    let unidades_promise=[]
    let tipo_egresos_promise=[]
    let proveedores_promise=[]
    let responsables_promise=[]
    for(let i=0;i<egresos_bd.length;i++){
        let e_bd=egresos_bd[i]
        unidades_promise.push(getPkUnidad(unidad_model,e_bd.cod_unidad,false))
        tipo_egresos_promise.push(getPkTipoEgreso(tipo_egreso_model,e_bd.cod_tipo_egreso,false))
        proveedores_promise.push(getPkProveedor(proveedor_model,tipo_proveedor_model,e_bd.cod_proveedor,false))
        responsables_promise.push(getPkResponsable(responsable_model,e_bd.cod_responsable,false))
    }
    let unidades=await Promise.all(unidades_promise)
    let tipo_egresos=await Promise.all(tipo_egresos_promise)
    let proveedores=await Promise.all(proveedores_promise)
    let responsables=await Promise.all(responsables_promise)
    let egresos=[]
    for(let i=0;i<egresos_bd.length;i++){
        let e_bd=egresos_bd[i]
        let u=unidades[i]
        let t_e=tipo_egresos[i]
        let p=proveedores[i]
        let r = responsables[i]
        egresos.push({
            id:e_bd.id,
            monto:e_bd.monto,
            proveedor:p,
            numero_factura:e_bd.numero_factura,
            observacion:e_bd.observacion,
            fecha:e_bd.fecha,
            unidad:u,
            tipo_egreso:t_e,
            responsable:r,
            proveedor:p
        })
    }
    return egresos

}
async function getAllEgresos(egreso_model,proveedor_model,unidad_model,tipo_egreso_model,responsable_model,tipo_proveedor_model){
    let egresos_bd_data=await getDBAllEgresos(egreso_model)
    return await getEgresos(proveedor_model,unidad_model,tipo_egreso_model,responsable_model,tipo_proveedor_model,egresos_bd_data)
}
async function getLastOrderEgreso(egreso_model,proveedor_model,unidad_model,tipo_egreso_model,responsable_model,tipo_proveedor_model){
    let egresos_bd_data=await getFnLastOrderEgreso(egreso_model)
    return await getEgresos(proveedor_model,unidad_model,tipo_egreso_model,responsable_model,tipo_proveedor_model,egresos_bd_data)
}
async function getEgresosWhere(egreso_model,proveedor_model,unidad_model,tipo_egreso_model,responsable_model,tipo_proveedor_model,where,offset,limit){
    let egresos_bd_data=await getDBEgresosWhere(egreso_model,where,offset,limit)
    return await getEgresos(proveedor_model,unidad_model,tipo_egreso_model,responsable_model,tipo_proveedor_model,egresos_bd_data)
}

//Una paja el add pero me parece mas organizado
class ADD_DATA{
    constructor(data_base){
        this.data_base=data_base
    }
    //Tiene que ser igual al de la base de datos
    async add(model,obj){
        let res= await this.data_base.model(model).create(obj)
        return res
    }
    //Debe estar listos para la database
    async mod(model,id,obj){
        return await this.data_base.model(model).update(obj,{
            where:{id:id}
        })
    }
    async del(model,id){
        return await this.data_base.model(model).destroy({
            where:{id:id}
        })
    }
}
class COUNT_DATA{
    constructor(data_base){
        this.data_base=data_base
    }
    async count(model){
        return await this.data_base.model(model).count()
    }
    async countWhere(model,where){
    let where_db={}
    if(where.id_prov){
        where_db.cod_proveedor=id_prov
    }
    if(where.fecha_desde){
        where_db.fecha={[Op.gte]:new Date(where.fecha_desde)}
    }
    if(where.fecha_hasta){
        where_db.fecha={[Op.lte]:new Date(where.fecha_hasta)}
        if(where.fecha_desde){
            where_db.fecha={[Op.and]:{[Op.gte]:new Date(where.fecha_desde),[Op.lte]:new Date(where.fecha_hasta)}}
        }
    }
    
    if(where.numero_factura.pri){
        where_db.numero_factura={[Op.startsWith]:where.numero_factura.pri}    
    }
    if(where.numero_factura.sec){
        where_db.numero_factura={[Op.endsWith]:where.numero_factura.sec}
        if(where.numero_factura.pri){
            where_db.numero_factura={[Op.and]:{[Op.startsWith]:where.numero_factura.pri,[Op.endsWith]:where.numero_factura.sec}}
        }
    }
        return await this.data_base.model(model).count({where:where_db})
    }
}
class PK_DATA{
    constructor(data_base){
        this.data_base=data_base
    }
    async getPkProveedor(id){
        return await getPkProveedor(this.data_base.model("Proveedor"),this.data_base.model("TipoProveedor"),id)
    }
    async getPkCliente(id){
        return await getPkCliente(this.data_base.model("Cliente"),this.data_base.model("Rubro"),id)
    }
}



sequelize.sync().then(
    console.log("todo ok")
)
module.exports={
    sequelize,
    getAllProveedores,
    getAllClientes,
    getAllResponsable,
    getAllTipoEgreso,
    getAllTipoProveedor,
    getAllRubros,
    getAllUnidades,
    getAllUnidades,
    getAllIngresos,
    getAllEgresos,
    getSaldo,
    getLastOrderIngreso,
    getLastOrderEgreso,
    getWhereClientes,
    getWhereProveedor,
    getEgresosWhere,
    getIngresosWhere,
    ADD_DATA,
    COUNT_DATA,
    PK_DATA
}
