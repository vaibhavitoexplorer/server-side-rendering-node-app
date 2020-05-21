const express = require('express');
const chalk = require('chalk');//log msg coloring
const debug = require('debug')('app');
const morgan = require('morgan');// api call anaylsis
const path = require('path');// fix path issues
const bodyParser = require('body-parser');//to parser the req body and load it in req obj

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/fonts')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{ link: '/books', title: 'Books' },
{ title: 'Authors', link: '/authors' }];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes');
const authRouter = require('./src/routes/authRoutes');


app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('index', {
        nav,
        title: 'Book Store'
    });
})

app.listen(port, function () {
    debug(`listening on port ${chalk.green('3000')}`);
    debug(`listening at port ${chalk.green('3000')}`);
})