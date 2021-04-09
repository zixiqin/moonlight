const express = require('express');
const app = express();
const port = 5000;
// localhost:5000/

app.get('/vendor', (req, res) => {
    res.status(200).json({ sucess: "true", message: "what the hell is the world" })
    console.log("a good thing")
    console.log("bad day right?")

    console.log("bad day 888888888?")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})