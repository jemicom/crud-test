 const  path =require( 'path'); 

// // database
// let users = [
//   { id:1,  name  : 'kim',  age  : 30  }, 
//   { id:2,  name  : 'park',  age  : 33  }, 
//   { id:3,  name  : 'you',  age  : 20  }, 
//   { id:4,  name  : 'lee',  age  : 23  }, 
//   { id:5,  name  : 'lim',  age  : 19  }, 
// ]
let users = require(path.join(__dirname,"..", 'data', 'data.json'));
console.log(users);

const getRoot = (req, res)=>{
  console.log( `getRoot 요청 url : ${req.url}` );
  res.sendFile( path.resolve( 'views' , 'index.html'));
                        // '../view/index.html'
}

const getUser = (req, res)=>{
  console.log( `요청 url : ${req.url}` );
  res.json({ 
    name : 'kim',
    age : 30 
  })  
}

const getUsers = (req, res)=>{
  console.log( `요청 url : ${req.url}` );
  res.json(users) ;
}

// post user 회원가입
const createUser = (req, res)=>{
  console.log(`request : ${req.url}`);
  const { name, age } = req.body; 

  //[4] { id:5,  name  : 'lim',  age  : 19  }, 
  users.push({
        id: users.length ? users[users.length-1].id + 1 : 1 ,
        name:name,
        age:age      
  })

  console.log( users );
  // res.send(`정상적으로 생성됨 이름 : ${name} , 나이 : ${ age}`);
  res.json(users);
}

const searchUser = (req, res)=>{
  const id = req.params.id;
  console.log( `요청 url : ${req.url}  ${id}` );
  // javascript 로 배열(db)에 있는 데이터를 찾아서 출력( db에서 찾으려면 sql 필요) 
  const findUser = users.find( user => user.id.toString() === id); // 엄격한 검사 

  if( !findUser ){  // 데이터 찾기를 실폐한 경우 처리
      res.send({
        id : 'file not Found'
      })
  }
  res.send(findUser) ;
}

const deleteUser = (req, res)=>{
  const id = req.params.id;
  console.log( `요청 url : ${req.url}  ${id}` );

  users = users.filter( user => user.id != id );
  // 배열이 들어 있음 
  
  res.send(users) ;
  // 서버를 on/off하면 다시 5개 데이터가 존재함 
}

const updateUser = (req, res)=>{
  const id = req.params.id;
  const { name, age } = req.body; 

  console.log( `요청 url : ${req.url}  ${id}` );
  // 수정할 모양 만들기 : { id:4,  name  : 'lee',  age  : 23  }, 

  users = users.map( user => {
      if( user.id.toString() === id ){
        return {
            id , 
            name , 
            age 
        }
      }

      return user; 
  });
   
  res.json(users) ;
  // 서버를 on/off하면 다시 5개 데이터가 존재함 
}

module.exports = {updateUser, deleteUser, searchUser, createUser, getUsers,getUser, getRoot}