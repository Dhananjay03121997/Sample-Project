const express = require('express');
const router = new express.Router();
const tenant = require('../model/tenant');
const url = require('../helper/url');
const { contactExists } = require('../helper/utils');
const { notFound, pleaseProvide } = require('../helper/messages');

router.post(`${url.crud.add.replace('{{name}}', 'tenant')}`, async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            mobile_no,
            password
        } = req.body;
        if (!first_name || !last_name || !email || !mobile_no || !password) {
            return res.status(400).send(`message: <<INVALID PARAMETER>>`);
        }
        const exists = await contactExists(mobile_no, email);
        if (exists) {
            return res.status(200).send({ message: a });
        }
        const newTenant = new tenant({
            first_name,
            last_name,
            email,
            mobile_no,
            password
        });
        const data = await newTenant.save();
        return res.status(200).send({
            message: `Data Added`,
            data: data
        });
    } catch (error) {
        return res.status(400).send({ message: `${error.message}` });
    }
})

router.get(`${url.crud.get.replace('{{name}}', 'tenant')}`, async (req, res) => {
    try {
        const newTenant = await tenant.find({}).select({ "first_name": 1, "last_name": 1, "email": 1, "mobile_no": 1 });
        if (newTenant.length === 0) {
            return res.status(200).send({message:notFound.replace('{{name}}', 'Tenant')});
        }
        return res.status(200).send({
            message: `Successful.`,
            data: newTenant
        });
    } catch (error) {
        return res.status(400).send({ message: `${error.message}` });
    }
});

router.put(`${url.crud.update.replace('{{name}}', 'tenant')}`, async(req,res)=>{
    try {
        const {
            id
        }= req.query;
        if (!id) {
            return res.status(400).send({message: pleaseProvide.replace('{{name}}', 'Id')
            });
        }
        let tenant = await tenant.findOne({id:id});
        if (!tenant) {
            return res.status(200).send({message: notFound.replace('{{name}}', 'tenant')});
        }
        tenant = {}
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})
module.exports = router;