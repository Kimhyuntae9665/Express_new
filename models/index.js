const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV  ||  'development';
const config = require(path.join(__dirname,'..','config','config.json'))[env];
const db={};

const sequelize = new Sequelize(config.database,config.username,config.password,config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// ? sequelize를 이용해서 sequelize : 데이터베이스의 아이디 , 데이터베이스, 아이디,비번을 설정하는 거고 
// ? Sequelize를 이용해서 Sequelize : Sequelize 모듈을 사용해서 데이터베이스와 자바스크립트의 객체를 Mapping 해 준다
db.User = require('./user.js')(sequelize,Sequelize);
db.Comment = require('./comment')(sequelize,Sequelize);

db.User.hasMany(db.Comment,{foreignKey:'commenter',sourceKey:'id'});
db.Comment.belongsTo(db.User,{foreignKey:'commenter',targetKey:'id'});

module.exports = db;