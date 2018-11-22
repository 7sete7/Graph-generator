import Nightmare from 'nightmare';
import express from 'express';
import {generateChart, size} from './generateChart';
import co from 'co';

const app = express();

const PORT = process.env.port || 8080;
const CHARTURL = `http://localhost:${PORT}/chart?data=`;

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

app.get('/chart', generateChart);

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});

const getImage = async (query) => {
    let nightmare = Nightmare({show: false, width: size.width + 50, height: size.height + 50});
    
    return new Promise((resolve, reject) => {
        co(function* (){
            // Get window dimension
            let dimensions = yield nightmare
                .goto(CHARTURL + query)
                .wait("svg")
                .evaluate(() => {
                    let body = document.querySelector("body");
                    return {
                        width: body.scrollWidth,
                        height: body.scrollHeight
                    }
                });

            //Take screenshot
            let sc = yield nightmare.viewport(dimensions.width, dimensions. height).wait(1000).screenshot().end();
            return sc;
        })
        .then(resolve).catch(reject);
    });
}

