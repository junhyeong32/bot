const axios = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models');


router.post("/worker", async (req, res) => {
    let io = req.app.get('socketio');
    io.on("connection", (socket) => {
    let reqCount = 0;
    
    let interval_getData = null;

    const { minute, count } = req.body;
    const ms = 60000;

    const getData = async () => {
        try {
            const gaxlaxyInfo = await db.galaxy.findOne(
                { order: [['id', 'DESC']] }
            )
            const orderedAmount = Math.floor(Math.random() * (gaxlaxyInfo.secondCharge - gaxlaxyInfo.firstCharge + 1) + gaxlaxyInfo.firstCharge);

            if (gaxlaxyInfo) {
                const galaxyReq = await axios.post('https://api.galaxy365.biz/api/v1/trade/create', {
                    optionCode: gaxlaxyInfo.optionCode,
                    expireTime: gaxlaxyInfo.expireTime,
                    orderedAmount: orderedAmount,
                    currency: gaxlaxyInfo.currency,
                    callPut: gaxlaxyInfo.callPut
                })

                const createNewData = await db.galaxytrade.create({
                    optionCode: gaxlaxyInfo.optionCode,
                    expireTime: gaxlaxyInfo.expireTime,
                    orderedAmount: orderedAmount,
                    currency: gaxlaxyInfo.currency,
                    callPut: gaxlaxyInfo.callPut,
                    result: galaxyReq.status
                })

                
                io.emit("newDataToClient", createNewData);
                reqCount += 1;
               
                
                if (Number(count) === Number(reqCount)) {
                    console.log("데이터 생성끝")
                    reqCount = 0;
                    
                        socket.emit("disconnect", "끝")
                        socket.on("disconnect", () => {
                            console.log("연결 끊김")
                        });
                   
                   
                    clearInterval(interval_getData);
                }
            // return res.json({ data: createNewData})
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
});
})



module.exports = router;