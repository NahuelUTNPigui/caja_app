const {Sequelize,Model,DataTypes }=require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')
//Si elimino una subcategoria no lo puedo usar en las categorias
//Estaria piola tener un ultimo saldo, para no tener que calcularlo innecesariamente
//pero que pasa si me guardo modifico, elimino un ingreso,egreso
//no se...
class Saldo extends Model{}
Saldo.init({
    monto:{
        type:DataTypes.DOUBLE(15,2)
    }},{
        sequelize,
        modelName:'Saldo',
        freezeTableName:true
})
//Simples
class Rubro extends Model{}
Rubro.init({
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    }},{
        sequelize,
        modelName:'Rubro',
        paranoid:true,
        deletedAt:'destroyTime',
        freezeTableName: true
})
class TipoEgreso extends Model{}
TipoEgreso.init({
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    }},{
        sequelize,
        modelName:"TipoEgreso",
        paranoid:true,
        deletedAt:'destroyTime',
        freezeTableName: true
})
class TipoProveedor extends Model{}
TipoProveedor.init({
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    }},{
        sequelize,
        modelName:"TipoProveedor",
        paranoid:true,
        deletedAt:'destroyTime',
        freezeTableName: true
})
class Unidad extends Model{}
Unidad.init({
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    }},{
        sequelize,
        modelName:"Unidad",
        paranoid:true,
        deletedAt:'destroyTime',
        freezeTableName: true
})
class Responsable extends Model{}
Responsable.init({
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rol:{
        type:DataTypes.STRING,
        allowNull:false
    }},{
        sequelize,
        modelName:"Responsable",
        paranoid:true,
        deletedAt:'destroyTime',
        freezeTableName: true
})
//Complejo
class Cliente extends Model{}
Cliente.init({
    apodo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    razon_social:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cod_rubro:{
        type:DataTypes.INTEGER,
        allowNull:false
    }},{
        sequelize,
        modelName:'Cliente',
        paranoid:true,
        deletedAt:'destroyTime',
        freezeTableName: true
})
class Proveedor extends Model{}
Proveedor.init({
    apodo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cod_tipo_proveedor:{
        type:DataTypes.INTEGER,
        allowNull:false
    }},{
        sequelize,
        modelName:'Proveedor',
        paranoid:true,
        deletedAt:'destroyTime',
        freezeTableName: true
})
class Ingreso extends Model{}
Ingreso.init({
    monto:{
        type:DataTypes.DOUBLE(10,2),
        allowNull:false
    },
    numero_factura:{
        type:DataTypes.STRING,
        allowNull:false
    },
    observacion:{
        type:DataTypes.STRING(300),
        allowNull:false
    },
    fecha:{
        type:DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull:false
    },
    cod_cliente:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cod_unidad:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cod_responsable:{
        type:DataTypes.INTEGER,
        allowNull:false
    }},{
        sequelize,
        tableName:"Ingreso",
        paranoid:true,
        deletedAt:'destroyTime',
        freezeTableName: true
})
class Egreso extends Model{}
Egreso.init({
    monto:{
        type:DataTypes.DOUBLE(10,2),
        allowNull:false
    },
    numero_factura:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fecha:{
        type:DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull:false

    },
    observacion:{
        type:DataTypes.STRING(300),
        allowNull:false
    },
    cod_proveedor:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cod_unidad:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cod_tipo_egreso:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cod_responsable:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    },{
    sequelize,
    tableName:"Egreso",
    paranoid:true,
    deletedAt:'destroyTime',
    freezeTableName: true
})
module.exports={
    sequelize
}