/* const nano = require('nano')('http://${process.env.DBUSER}:${process.env.DBPASS}@localhost:5984');
const db = nano.db.use('stocks');

const authenticateUser = async (username, password) => {
    const doc = await db.find({
        "selector":{
            "username":{
                "$eq": username
            },
            "password": {
                "$eq": password
            }
        }
    });

    return doc.docs[0];
}

module.exports = {
    authenticateUser,
} */

// --------------------------------------------------------------------------------------------
// Authentication/auth-repo
// I would suggest commenting out the db call for right now and return
// something like below.  It doesn't have to be exactly this but it should
// be something you both agree on
const nano = require('nano')('http://${process.env.DBUSER}:${process.env.DBPASS}@localhost:5984');
const db = nano.db.use('stocks');
const authenticateUser = async (username, password) => {
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
           return {};
       }
}
module.exports = {
    authenticateUser,
}