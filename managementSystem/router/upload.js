var fs = require('fs');
var express = require('express');
var multer  = require('multer');
var router = express.Router();

var upload = multer({dest: 'public/uploads/upload'});
router.post('/add_file', upload.any(), function(req, res, next) {
    //console.log(req.files[0]);  // 上传的文件信息
    var des_file = "./public/uploads/image/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                res.errors(err)
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname,
                    filepath:'\/api\/uploads\/image\/' + req.files[0].originalname
                };
                res.send({
                    status:0,
                    message:'上传成功',
                    response
                })
            }
        });
    });
});

module.exports = router;