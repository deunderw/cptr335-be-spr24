const nano = require('nano')('http://${process.env.DBUSER}:${process.env.DBPASS}@localhost:5984');
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
}