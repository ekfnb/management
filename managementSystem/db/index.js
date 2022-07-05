const mysql = require('mysql')

//创建数据库连接（连接池连接）
const db = mysql.createPool({
    host:'192.168.16.1',
    user:'root',
    password:'root',
    database:'manage',
    port:'3306'
})
//导出mysql
module.exports = db