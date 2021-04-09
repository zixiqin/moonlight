const express = require('express');
const app = express();
const port = 5000;
// localhost:5000/

app.get('/customer', (req, res) => {
        res.status(200).json({ sucess: "true", message: "what the hell is the world" })
    })
    //manu
app.get('/login', (req, res) => {
    res.status(200).json({ sucess: "true", message: "Log in page" })
})

//shjsdgidcxbic
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})