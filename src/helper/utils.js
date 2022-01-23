const { alreadyExists } = require('./messages');
const tenant = require('../model/tenant');
const path = require('path');


module.exports= {contactExists: async function(mobile = "", email = ""){
try {
    const data = await tenant.findOne({$or:[{email:email}, {mobile_no:mobile}]}).select({"email":1, "mobile_no":1, "_id":0});
    if (!data) {
        return false;
    }
    if (data.email === email && data.mobile_no === mobile) {
        return alreadyExists.replace('{{name}}', 'Mobile number and email');
    }else if(data.email === email){
        return alreadyExists.replace('{{name}}', 'email');
    }else if(data.mobile_no === mobile){
        return alreadyExists.replace('{{name}}', 'mobile number');
    }
} catch (error) {
    return error.message;
}
},
getImageUrl:(async (image)=>{
    try {
        const imageUrl = path.join(__dirname, `../../uploads/${image}`) ;
        // console.log(imageUrl);
        return imageUrl;
    } catch (error) {
        return error;
    }
})}

// exports.getImageUrl(async (image)=>{
//     try {
//         const imageUrl = `${__dirname}/../${image}`;
//         return imageUrl;
//     } catch (error) {
//         return error;
//     }
// })