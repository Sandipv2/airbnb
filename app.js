const express = require('express');
const path = require('path')

const userRouter = require('./routes/userRouter')
const rootDir = require('./utils/pathUtil')
const hostRouter = require('./routes/hostRouter')

const app = express();
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine','ejs');
app.set('views','views');

app.use('/',userRouter);
app.use('/host', hostRouter);

// Not Found
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
})