const axios = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models');

let interval_getData = null;
router.post("/worker", async (req, res) => {
    const { minute, count } = req.body;
    let reqCount = 0;
    const ms = 60000;
    const getData = async () => {
        try {
            const gaxlaxyInfo = await db.galaxy.findOne(
                { order: [['id', 'DESC']] }
            )
            console.log(reqCount)
            if (Number(count) - 1 === Number(reqCount)) {
                console.log(count, reqCount, count === reqCount, "끝 아니냐")

                clearInterval(interval_getData);

            }

            const orderedAmount = Math.floor(Math.random() * (gaxlaxyInfo.secondCharge - gaxlaxyInfo.firstCharge + 1) + gaxlaxyInfo.firstCharge);
            if (gaxlaxyInfo) {
                const galaxyReq = await axios.post('https://api.galaxy365.biz/api/v1/trade/create', {
                    optionCode: gaxlaxyInfo.optionCode,
                    expireTime: gaxlaxyInfo.expireTime,
                    orderedAmount: orderedAmount,
                    currency: gaxlaxyInfo.currency,
                    callPut: gaxlaxyInfo.callPut
                })

                await db.galaxytrade.create({
                    optionCode: gaxlaxyInfo.optionCode,
                    expireTime: gaxlaxyInfo.expireTime,
                    orderedAmount: orderedAmount,
                    currency: gaxlaxyInfo.currency,
                    callPut: gaxlaxyInfo.callPut,
                    result: galaxyReq.status
                })
                reqCount += 1;
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

    try {
        getData();
        interval_getData = setInterval(getData, Number(minute) * ms);
    } catch (error) {
        console.log(err);
    }

})



module.exports = router;