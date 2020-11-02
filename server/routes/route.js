const express = require('express');
const router = express.Router();
const db = require('../models');


router.post("/route", async (req, res) => {
    const { minute, count, firstCharge, secondCharge, optionCode, expireTime, orderedAmount, currency, callPut } = req.body;
    try {
        await db.galaxy.create({
            setMinute: minute,
            setCount: count,
            firstCharge: firstCharge,
            secondCharge: secondCharge,
            optionCode: optionCode,
            expireTime: expireTime,
            orderedAmount: orderedAmount,
            currency: currency,
            callPut: callPut
        })

        const allData = await db.galaxy.findAll()
        return res.status(200).json({ data: allData })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = router;