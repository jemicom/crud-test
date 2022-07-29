const express = require('express');
const router  = require( './routes/users.js');
const dotenv  = require( 'dotenv');
dotenv.config({path:'.env'});
// 공통 모듈 방식
const  path =require('path'); 
console.log( process.env.PORT)


const cors  =require('cors');
// 크로스 오리진 : 백엔드의 데이터는 백엔드에서만 사용가능, 사용권한을 모두로 설정

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())

 
app.use(express.json());
app.use(express.urlencoded({extended : false}));
// form 데이터를 인코딩해서  전달함 
app.use( express.static(path.join(__dirname, 'views'))); 
app.use( express.static(path.join(__dirname, 'controls'))); 
// 뷰단을 자동으로 사용할 수 있도록 설정 
// console.log( __dirname );
app.listen(PORT, ()=>{
    console.log( `server start ${PORT}`)
})
 
// 모든 처리를  router가 할 수 있도록 넘김 
app.use('/', router);

// express 서버로 직접 데이터를 처리하는 방식 get, post, delete, put, patch
// express 미들웨어(함수) : use