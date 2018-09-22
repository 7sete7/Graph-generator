import Nightmare from 'nightmare';
import express from 'express';
import generateChart, {size} from './generateChart';

const app = express();


const PORT = 3200;
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

app.listen(3200, () => {
    console.log("Server rodando na porta 3200");
});

const getImage = async (query) => {
    let nightmare = Nightmare({show: false, width: size.width + 50, height: size.height + 50});
    
    return new Promise((resolve, reject) => {
        nightmare
            .goto(CHARTURL + query)
            .wait("svg")
            .screenshot()
            .end()
            .then(resolve)
            .catch(reject);
    });
}

