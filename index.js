import Nightmare from 'nightmare';
import express from 'express';

import './generateChart';
const app = express();
const nightmare = Nightmare({show: false, width: 750, height: 490});

const URL = "http://localhost:3201/?data=";

app.get('/', (req, res) => {
    getImage(req.query.data)
        .then(imgBuffer => {
            res.setHeader("Content-type", "text/html");
            res.send(`
                <img src='data:image/jpeg;base64, ${imgBuffer.toString("base64")}' width='100%' height='100%'/>
            `);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

app.listen(3200, () => {
    console.log("Server rodando na porta 3200");
});

const getImage = async (query) => {
    return new Promise((resolve, reject) => {
        nightmare
            .goto(URL + query)
            .wait("svg")
            .screenshot()
            .end()
            .then(resolve)
            .catch(reject);
    });
}

