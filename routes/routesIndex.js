const express = require("express");
const URL = require("../DB/models/url");
const router = express.Router();
router.use(express.urlencoded({ extended: false }))

/*
    @route GET /
    @desc redirect the user to the original url
*/


router.get("/:code", async (req, res) => {
    try {
        const mainUrl = await URL.findOne({ urlCode: req.params.code });
        console.log(mainUrl)
        if (mainUrl) {
            res.redirect(mainUrl.longUrl);
        }
        else {
            return res.status(404).send("Url not found");
        }
    }
    catch (e) {
        res.status(500).send("Internal server Error");
    }

})



module.exports = router;