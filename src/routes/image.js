const router = require('express').Router();
const {getImageUrl} = require('../helper/utils');
const multer = require('multer');
const excelFilter  = multer({
    dest: 'uploads',
    fileFilter(req, file, cb){
        console.log("in file filter");
        if(!file.originalname.match(/\.(xlsx|csv)$/)){
            return cb(new Error("constant"));
        }
        cb(undefined, true);
    }
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
      },
    filename: (req, file, cb) => {
        const filename = Date.now().toString() + file.originalname;
      cb(null, filename);
    },
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(xlsx|csv)$/)){
            return cb(new Error("constant"));
        }
        cb(undefined, true);
      }

});
const upload = multer({ storage: storage, excelFilter : excelFilter  });

const image = require('../model/image');
const url = require('../helper/url');

router.post(`${url.add.replace('{{name}}', 'image')}`,upload.single('image'), async(req,res)=>{
    try {
        const file = req.file;
        if(!file){
            return res.status(400).send({message: 'Invalid  Parameter'});
        }
        console.log(file);
        const imageData = new image({
            originalName: file.originalname,
            fileName: file.filename,
            location: file.path
        });
        await imageData.save();
        return res.status(200).send({message: 'Success', data:imageData});
    } catch (error) {
        return res.status(400).send({error:error.message});
    }
});

router.get(`${url.get.replace('{{name}}', 'images')}`, async(req,res)=>{
    try {
        let data = await image.find({});
        // let imagearr = [];
        if(data.length > 0){
        data.forEach(async(item)=>{
            let a = await getImageUrl(item.fileName);
            item.location = a;
            console.log(item);
        });
            return res.status(200).send({message: 'success', data:data});
        }
        return res.status(200).send({message:'no data found'});
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
})
module.exports = router;