const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');

const port = 3000
const filepath = 'results.txt'

let count = {}

app.use(cors())
app.use(bodyParser.json());

app.post('/', (request, response) => {
    response.send('Hello from Express!')
    let arr = request.body;
    for (let item of arr) {
        if (count[item]) {
            count[item]++;
        } else {
            count[item] = 1;
        }
    }
    console.log(count);
    fs.writeFileSync(filepath, JSON.stringify(count, null, 2) , 'utf-8')
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

