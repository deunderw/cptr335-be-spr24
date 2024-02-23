const nano = require('nano')('http://${process.env.DBUSER}:${process.env.DBPASS}@localhost:5984');
const db = nano.db.use('stocks');

console.log('auth-repo file'); // debug
const authenticateUser = async (username, password) => {
    console.log('authenticateUser in auth-repo'); //debug
//    const doc = await db.find({
//        "selector":{
//            "username":{
//                "$eq": username
//            },
//            "password": {
//                "$eq": password
//            }
//        }
//    });
//    return doc.docs[0];
      if (password == 'P@ssw0rd') {
         return 
             {
                 firstName = 'John',
                 lastName = 'Doe',
                 email = 'john@example.com',
                 clientId = '1'
             };    
       } else {
           return null;
       }
}
module.exports = {
    authenticateUser,
}