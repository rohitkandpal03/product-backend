
const express = require('express');

const router = express.Router();
const userCred = [{
    userName: 'Rohit',
    password: '123456',
}];

router.get('/userDetail', ( req, res ) => {
    const { userName, password } = JSON.parse(req.query.userDetail);

    if(userName && password){
        const isUserExists = userCred.find( user => user.userName === userName && user.password === password );
        if(isUserExists){
            return res.send({ sucess: true, data: "User Found."})
        }
        return res.send({ sucess: false, data: "Incorrect UserName or Password."})
    }
    return res.send({ sucess: false, data: "Please provide UserName or Password."})
});

module.exports = router;