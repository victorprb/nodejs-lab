import { Router } from "express";

const router = Router();

router.get('/ping', (req, res, next) => {
    res.sendStatus(200);
})

export const HealthController = router;