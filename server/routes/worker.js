const axios = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models');
const data = require("../data");

router.post("/request", async (req, res) => {
    const { minute, count, firstCharge, secondCharge, callPut } = req.body;
    let reqCount = 0;
    let ms = 60000;

    const getData = async () => {
        let orderedAmount = Math.floor(Math.random() * (secondCharge - firstCharge + 1) + firstCharge);
        let term = 1;
        let now = new Date().getTime();
        let expireTime = now - (now % 60000) + (60000 * term);
        const galaxyReq = await axios.post('https://api.galaxy365.biz/api/v1/trade/create', {
            optionCode: 'Bitcoin',
            expireTime: expireTime,
            orderedAmount: orderedAmount,
            currency: 840,
            callPut: callPut,
            minute: minute,
            count: count
        })
        
        const createNewData = await db.galaxydata.create({
            optionCode: 'Bitcoin',
            expireTime: expireTime,
            orderedAmount: orderedAmount,
            currency: 840,
            callPut: callPut,
            result: galaxyReq.status
        })

        reqCount++;
        
        if (reqCount === Number(count)) {
            console.log("생성 완료")
            res.json({ result: '생성완료' })
            clearInterval(interval_getData)
            reqCount = 0

        }

        data.set([...data.get(), createNewData]);
    }

    getData();
    interval_getData = setInterval(getData, Number(minute) * ms);
})



module.exports = router;