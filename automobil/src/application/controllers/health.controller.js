const { Router } = require("express");

const router = Router();

router.get('/ping', (req, res, next) => {
    res.sendStatus(200);
})

module.exports = router
