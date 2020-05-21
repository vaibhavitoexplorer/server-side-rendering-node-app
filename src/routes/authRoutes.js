const express = require('express');
const authRouter = express.Router();
const debug = require('debug')('app:authRoutes');

function router() {
    authRouter.route('/signUp').post((req,res) => {
        debug(req.body);
        res.json(req.body);
    })

 return authRouter;   
}

module.exports = router;