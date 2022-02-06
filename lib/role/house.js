const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const path = require('path');
const collectionName = config.mongoDBCollection.houseCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
const houseDoc = {
    name:'',
    city:'',
    area:'',
    owner: null,
    address:'',
    price:0,
    config:{
        room:0,
        livingRoom:0,
        balcony:0,
        bathroom:0,
        buildingType:0
    },
    ping:0,
    parking:false,
    traffic:[],
    life:[],
    educate:[],
    saleType:0,
    saleInfo:{},
    photo:[],
    annex:[],
    remark:"",
    isDelete:false,
    // createTime:
    // updateTime:
}

function newHouseDoc(){
    const doc = JSON.parse(JSON.stringify(houseDoc))
    const date = new Date();
    doc.createTime = date;
    doc.updateTime = date;
    return doc;
}

function addHouse(name,city,area,owner,address,price,config,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,callback) {
    if (utilsValue.isValid(address)){
        const queryDoc = {
            'address': address,
            'isDelete' : false
        }
        mongoDB.queryFindOne(collectionName, queryDoc, (result,data)=>{
            if(result){
                if(utilsValue.isValid(data)){
                    callback(false,'house address is exist')
                }else{
                    const doc = newHouseDoc()
                    doc.name = name
                    doc.city = city
                    doc.area = area
                    doc.owner = ObjectId(owner)
                    doc.address = address
                    doc.price = price*1
                    doc.config = config
                    doc.ping = ping*1
                    doc.parking = parking
                    doc.traffic = traffic
                    doc.life = life
                    doc.educate = educate
                    doc.saleType = saleType
                    doc.saleInfo = saleInfo
                    doc.photo = photo
                    doc.annex = annex
                    doc.remark = remark
                    mongoDB.insert(collectionName, doc, callback);
                }
            }else{
                callback(false,'db query error')
            }
        })
    }else {
        callback(false, 'accout or password invalid')
    }
}

function removeHouse(ids,callback){
    let isValid = true;
    for(let i = 0;i<ids.length;i++){
        if(ids[i].length!=24){
            isValid = false;
        }
    }
    if(isValid == true){
        const objectIds = []
        for(let i = 0 ;i<ids.length;i++ ){
            objectIds.push(ObjectId(ids[i]))
        }
        const searchDoc = {
            '_id': {$in : objectIds}
        }
        const updateData = {
            isDelete:true,
            updateTime: new Date()
        }
        mongoDB.updateMany(collectionName, searchDoc, updateData, (result,data)=>{
            if(result && data.nModified>0){
                callback(true,data)
            }else{
                callback(false,data)
            }
        });
    }else{
        callback(false, 'ids is invalid')
    }
}

function editHouse(id,name,city,area,owner,address,price,config,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark, callback) {
    if (id.length == 24){
        const updateData = {
            name,
            city,
            area,
            owner:ObjectId(owner),
            address,
            price,
            config,
            ping,
            parking,
            traffic,
            life,
            educate,
            saleType,
            saleInfo,
            photo,
            annex,
            remark,
            updateTime: new Date()
        }
        const searchDoc = {
            '_id': ObjectId(id)
        }
        mongoDB.update(collectionName, searchDoc, updateData, (result,data)=>{
            if(result && data.nModified>0){
                callback(true,data)
            }else{
                callback(false,data)
            }
        });

    }else{
        callback(false, 'id or accout invalid')
    }
    
}

function getHouseList(queryInfo,skip,limit,sort,callback){
    const maxLimit = 300
    if(utilsValue.isValid(queryInfo.roles)){
        queryInfo.roles = {"$all":queryInfo.roles}
    }
    if (!utilsValue.isNumber(skip)){
        skip = 0;
    }
    if (!utilsValue.isNumber(limit) || limit>maxLimit){
        limit = maxLimit;
    }
    if (!utilsValue.isValid(sort)){
        sort = {updateTime:-1}
    }
    
    mongoDB.queryFindAll(collectionName, queryInfo , skip, limit, sort ,(result, msg) => {
        callback(result, msg);
    })
}


exports.addHouse = addHouse
exports.editHouse = editHouse
exports.removeHouse = removeHouse
exports.getHouseList = getHouseList