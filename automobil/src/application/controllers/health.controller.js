const { Router } = require("express");

const router = Router();

router.get('/ping', (_req, res) => {
    res.sendStatus(200);
})

module.exports = router
