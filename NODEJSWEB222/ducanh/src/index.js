const path = require('path')
const express = require('express')
const methodOverride = require('method-override');
const app = express()
const session = require('express-session');
const flash = require('express-flash');
app.use(session({
  secret: 'your-secret-key', // Thay đổi thành chuỗi bí mật riêng của bạn
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const handlebars = require('express-handlebars')


const port = 3000
const route = require('./routes')
app.use(express.static(path.join(__dirname, 'public')));
const db = require('./config/db');
db.connect();
app.use(methodOverride('_method'))
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      // 4 cái dưới để phân trang
      lt: (a, b) => a < b,   
      inc: (value) => parseInt(value) + 1,  
      gt: (value1, value2) => value1 > value2,
      dec: (value) => value - 1,
      sub: (a, b) => a - b, 
      ne: (a, b) => a !== b,
      eq: (a, b) => a === b, 
      add: (a, b) => a + b,
    }
  }));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'));
console.log(path.join(__dirname, 'resources', 'views'))
route(app);
app.listen(port, () =>
  console.log(` app listening on port http://localhost:${port}`)
)


