const express = require('express');
const router = express.Router();
const db = require('../models');


router.post("/getdata", async (req, res) => {
    try {
        const allData = await db.galaxytrade.findAll(
            { order: [['id', 'DESC']] }
        );
        return res.status(200).json({ data: allData })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);

    }
})



module.exports = router;