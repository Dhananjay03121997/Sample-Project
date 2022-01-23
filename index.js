const app = require('./src/app');
require('dotenv').config();

app.listen(3000, ()=>{
    console.log(`App is running on 3000`);
});