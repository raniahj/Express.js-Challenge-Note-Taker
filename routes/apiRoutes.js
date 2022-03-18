const router = require('express').Router();
const UUID = require("uuid");
const fs = require('fs');
const path = require('path');

router.get("/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        let oldData = JSON.parse(data);
        res.send(oldData);
        if (err) {
            res.status(500).send(err);
        }
    });
});

router.post("/notes", (req, res) => {
    req.body.id = UUID.v1();
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        let oldData = JSON.parse(data);
        oldData.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(oldData), (err) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(req.body);
    });
    })
});

router.delete("/notes/:id", (req, res) => {
    const { id } = req.params;
    let doNotDel;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        const oldData = JSON.parse(data);
        if (err) {
            res.status(500).send(err);
        }
        doNotDel = oldData.filter((note) => {
            return note.id !== id;
        });
        console.log(oldData);
        fs.writeFile("./db/db.json", JSON.stringify(doNotDel), (err) => {
            if (err) {
                res.status(500).send(err);
            }
        });
        res.send(doNotDel)
    });  
});
module.exports = router;