var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send("Bot up and running !!!");
});

module.exports = router;