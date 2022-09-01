const {
    sequelize,
    getAllProveedores,
    getAllClientes,
    getAllResponsable,
    getAllTipoEgreso,
    getAllTipoProveedor,
    getAllRubros,
    getAllUnidades,
    getAllEgresos,
    getAllIngresos,
    getSaldo,
    getLastOrderIngreso,
    getLastOrderEgreso,
    getWhereClientes,
    getWhereProveedor,
    getEgresosWhere,
    getIngresosWhere,
    ADD_DATA,
    COUNT_DATA,PK_DATA}=require("./bd/EntryPoint.js")
let fs = require('fs');
class App_data{
    constructor(nombre,data_base){
        this.name=nombre
        this.data={}
        this.data=JSON.parse(getData2())
        this.data_base=data_base
        this.ADD_DATA=new ADD_DATA(data_base)
        this.COUNT_DATA=new COUNT_DATA(data_base)
        this.PK_DATA=new PK_DATA(data_base)
        
    }
    sync(options){
        return this.data_base.sync(options)
    }
    //Get All
    async getAllProveedores(){
        return await getAllProveedores(this.data_base.model("Proveedor"),this.data_base.model("TipoProveedor"))
    }
    async getAllClientes(){
        return await getAllClientes(this.data_base.model("Cliente"),this.data_base.model("Rubro"))
    }
    async getAllResponsable(){
        return await getAllResponsable(this.data_base.model("Responsable"))
    }
    async getAllTipoEgreso(){
        return await getAllTipoEgreso(this.data_base.model("TipoEgreso"))
    }
    async getAllTipoProveedor(){
        return await getAllTipoProveedor(this.data_base.model("TipoProveedor"))
    }
    async getAllRubros(){
        return await getAllRubros(this.data_base.model("Rubro"))
    }
    async getAllUnidades(){
        return await getAllUnidades(this.data_base.model("Unidad"))
    }
    async getAllEgresos(){
        return await getAllEgresos(this.data_base.model("Egreso"),this.data_base.model("Proveedor"),this.data_base.model("Unidad"),this.data_base.model("TipoEgreso"),this.data_base.model("Responsable"),this.data_base.model("TipoProveedor"))
    }
    async getAllIngresos(){
        return await getAllIngresos(this.data_base.model("Ingreso"),this.data_base.model("Cliente"),this.data_base.model("Unidad"),this.data_base.model("Responsable"),this.data_base.model("Rubro"))
    }
    //Get LAST
    async getLastEgresos(){
        return await getLastOrderEgreso(this.data_base.model("Egreso"),this.data_base.model("Proveedor"),this.data_base.model("Unidad"),this.data_base.model("TipoEgreso"),this.data_base.model("Responsable"),this.data_base.model("TipoProveedor"))
    }
    async getLastIngresos(){
        return await getLastOrderIngreso(this.data_base.model("Ingreso"),this.data_base.model("Cliente"),this.data_base.model("Unidad"),this.data_base.model("Responsable"),this.data_base.model("Rubro"))
    }
    //GET WHERE
    async getEgresosWhere(where,offset,limit){
        return await getEgresosWhere(this.data_base.model("Egreso"),this.data_base.model("Proveedor"),this.data_base.model("Unidad"),this.data_base.model("TipoEgreso"),this.data_base.model("Responsable"),this.data_base.model("TipoProveedor"),where,offset,limit)
    }
    async getIngresosWhere(where,offset,limit){
        return await getIngresosWhere(this.data_base.model("Ingreso"),this.data_base.model("Cliente"),this.data_base.model("Unidad"),this.data_base.model("Responsable"),this.data_base.model("Rubro"),where,offset,limit)
    }
    async getSaldo(){
        return await getSaldo(this.data_base.model("Saldo"))
    }
    async getClienteWhere(where,offset,limit){
        return await getWhereClientes(this.data_base.model("Cliente"),this.data_base.model("Rubro"),where,offset,limit)
    }
    async getProveedorWhere(where,offset,limit){
        return await getWhereProveedor(this.data_base.model("Proveedor"),this.data_base.model("TipoProveedor"),where,offset,limit)
    }
    //Get ID
    async getProveedorId(id){
        return await this.PK_DATA.getPkProveedor(id)
    }
    async getClienteId(id){
        return await this.PK_DATA.getPkCliente(id)
    }
    getAll(modelo){
        let modelo_model=this.data_base.model(modelo)
        return modelo_model.findAll()
    }
    fakeData(){
        //Crear simples
        //Crear saldo
        this.data_base.model("Saldo").create({monto:6.5})
        //Crear tipo proveedor     
        let tipo_proveedor_model=this.data_base.model("TipoProveedor")

        this.data.tipo_proveedores.forEach((element)=>{
            tipo_proveedor_model.create({nombre:element.nombre})
        })
        //Crear Unidades
        let unidad_model=this.data_base.model("Unidad")
        this.data.unidades.forEach((element)=>{
            unidad_model.create({nombre:element.nombre})
        })
        //Crear  Tipo egreso
        let tipo_egreso_model=this.data_base.model("TipoEgreso")
        this.data.tipo_egresos.forEach((element)=>{
            tipo_egreso_model.create({nombre:element.nombre})
        })
        //Crear rubro
        let rubro_model=this.data_base.model("Rubro")
        this.data.rubros.forEach(((element)=>{
            rubro_model.create({nombre:element.nombre})
        }))
        //Crear responsable
        let responsable_model=this.data_base.model("Responsable")
        this.data.responsables.forEach(((element)=>{
            responsable_model.create({
                nombre:element.nombre,
                apellido:element.apellido,
                rol:element.rol
            })
        }))
        //Complex
        //Crear proveedores
        let proveedores_model=this.data_base.model("Proveedor")
        this.data.proveedores.forEach((element)=>{
            proveedores_model.create({
                apodo:element.apodo,
                nombre:element.nombre,
                apellido:element.apellido,
                cod_tipo_proveedor:element.tipo.id
            })
        })
        //Crear cliente
        let cliente_model=this.data_base.model("Cliente")
        this.data.clientes.forEach(((element)=>{
            cliente_model.create({
                apodo:element.apodo,
                razon_social:element.razon_social,
                cod_rubro:element.rubro.id
            })
        }))
        //Crear Ingreso
        let ingreso_model=this.data_base.model("Ingreso")
        this.data.ingresos.forEach(((element)=>{
            ingreso_model.create({
                monto:element.monto,
                numero_factura:element.numero_factura,
                observacion:element.observaciones,
                fecha:Date.parse(element.fecha),
                cod_cliente:element.cliente.id,
                cod_unidad:element.unidad.id,
                cod_responsable:element.responsable.id
            })
        }))
        //Crear egreso
        let egreso_model=this.data_base.model("Egreso")
        this.data.egresos.forEach(((element)=>{
            egreso_model.create({
                monto:element.monto,
                numero_factura:element.numero_factura,
                observacion:element.observaciones,
                fecha:Date.parse(element.fecha),
                cod_proveedor:element.proveedor.id,
                cod_unidad:element.unidad.id,
                cod_tipo_egreso:element.tipo_egreso.id,
                cod_responsable:element.responsable.id

            })
        }))

        
        
       
        
    }

    //Modify
    modifyRubro(rubro){
        this.data.rubros.forEach(element => {
            if(element.id===rubro.id){
                element.nombre=rubro.nombre
                return
            }
            
        });
    }
    async modResponsable(id,responsable){
        return await this.ADD_DATA.mod("Responsable",id,responsable)
    }
    async modCliente(id,cliente){
        return await this.ADD_DATA.mod("Cliente",id,cliente)
    }
    async modProveedor(id,proveedor){
        return await this.ADD_DATA.mod("Proveedor",id,proveedor)
    }
    async modTipoEgreso(id,tipo_egreso){
        return await this.ADD_DATA.mod("TipoEgreso",id,tipo_egreso)
    }
    async modTipoProveedor(id,tipo_proveedor){
        return await this.ADD_DATA.mod("TipoProveedor",id,tipo_proveedor)
    }
    async modRubro(id,rubro){
        return await this.ADD_DATA.mod("Rubro",id,rubro)
    }
    async modUnidad(id,unidad){
        return await this.ADD_DATA.mod("Unidad",id,unidad)
    }
    async mod(model,id,obj){
        return await this.ADD_DATA.mod(model,id,obj)
    }
    modifyCliente(cliente){
        this.data.clientes.forEach(element => {
            if(element.id===cliente.id){
                element.apodo=cliente.apodo
                element.razon_social=cliente.razon_social
                element.rubro=cliente.rubro
                return
            }
        });
    }
    modifyIngreso(ingreso){
        
        this.data.ingresos.forEach(element=>{
            if(element.id===ingreso.id){
                element.monto=ingreso.monto
                element.cliente=ingreso.cliente
                element.numero_factura=ingreso.numero_factura
                element.unidad=ingreso.unidad
                element.responsable=ingreso.responsable
                element.observacion=ingreso.observacion
                element.fecha=ingreso.fecha
               
                return
            }
        })
    }
    //Add
    async addRubro(rubro){
        return await this.ADD_DATA.add("Rubro",rubro)
    }
    async addTipoEgreso(tipo_egreso){
        return await this.ADD_DATA.add("TipoEgreso",tipo_egreso)
    }
    async addTipoProveedor(tipo_proveedor){
        return await this.ADD_DATA.add("TipoProveedor",tipo_proveedor)
    }
    async addUnidad(unidad){
        return await this.ADD_DATA.add("Unidad",unidad)
    }
    async addResponsable(responsable){
        return await this.ADD_DATA.add("Responsable",responsable)
    }
    async addCliente(cliente){
        let  cliente_bd={
            apodo:cliente.apodo,
            razon_social:cliente.razon_social,
            cod_rubro:cliente.cod_rubro,
        }
        return await this.ADD_DATA.add("Cliente",cliente_bd)
    }
    async addProveedor(proveedor){
        let proveedor_db={
            apodo:proveedor.apodo,
            nombre:proveedor.nombre,
            apellido:proveedor.apellido,
            cod_tipo_proveedor:proveedor.cod_tipo_proveedor
        }
        return await this.ADD_DATA.add("Proveedor",proveedor_db)
    }
    async addIngreso(ingreso){

        return await this.ADD_DATA.add("Ingreso",ingreso)
    }
    async addEgreso(egreso){

        return await this.ADD_DATA.add("Egreso",egreso)
    }   
    //Del
    async delResponsable(id){
        return await this.ADD_DATA.del("Responsable",id)
    }
    async delCliente(id){
        return await this.ADD_DATA.del("Cliente",id)
    }
    async delProveedor(id){
        return await this.ADD_DATA.del("Proveedor",id)
    }
    async delTipoEgreso(id){
        return await this.ADD_DATA.del("TipoEgreso",id)
    }
    async del(model,id){
        return await this.ADD_DATA.del(model,id)
    }
    //Counts
    async count(model){
        return await this.COUNT_DATA.count(model)
    }
    async countWhere(model,where){
        
        return await this.COUNT_DATA.countWhere(model,where)
    }
}
function getData2(){
    return fs.readFileSync("./res/toy/fake_data.json",{encoding:"utf-8",flag:'r'})
}

let APP_DATA=new App_data("nahue",sequelize)
module.exports={
    APP_DATA
}
