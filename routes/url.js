const express = require("express");
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require("shortid");
const URL = require("../DB/models/url");
router.use(express.urlencoded({ extended: false }));


router.post('/', async (req, res) => {

    const { longUrl } = req.body;
    const baseUrl = "https://mern-urlshortner-app.herokuapp.com/";

    // check base url mean page url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json("Invalid base URL");
    }

    // create url code aka user submitted url
    const urlCode = shortId.generate();

    // check long url
    if (!validUrl.isUri(longUrl)) {
        return res.status(401).json("Invalid long URL");
    }

    try {
        let fetchdata = await URL.findOne({ longUrl })

        if (fetchdata) {
            return res.json({ shortenLink: fetchdata.urlCode, domain: fetchdata.shortUrl, newlongUrl: fetchdata.longUrl })
        }
        else {
            const shortUrl = baseUrl + urlCode;

            url = new URL({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date()
            });

            url.save();

            res.json({ shortenLink: url.urlCode, domain: url.shortUrl, newlongUrl: url.longUrl })
        }
    }
    catch (e) {
        console.error(e)
        res.status(500).json("Server error");
    }


})


module.exports = router;