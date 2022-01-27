const router = require('express').Router();
// const { note } = require('../db/db.json');
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
    // const { newNote } = req;
    req.body.id = UUID.v1();
    // console.log(newNote);
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        let oldData = JSON.parse(data);
        oldData.push(req.body);
        // const oldData=JSON.parse(data);
        // // add id to req.body, another key value pair
        // const newNote=req.body;
        // const newData=[newNote, ...oldData];
        // res.send(newData);
    fs.writeFile("./db/db.json", JSON.stringify(oldData), (err) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(req.body);
    });
    })
});

router.delete("/notes/:id", (req, res) => {
    // read db.json, filter and write db.json
    const { id } = req.params;
    let doNotDel;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        const oldData = JSON.parse(data);
        // oldData = oldData.filter(note => note.id !== req.params.id);
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
        // res.json("Success!");
    });  
});
module.exports = router;