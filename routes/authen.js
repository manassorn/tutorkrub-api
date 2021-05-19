var jwt = require('jsonwebtoken')
var axios = require('axios')
var express = require('express');
var router = express.Router();

var api = require('./api')
var crudController = require('../controllers/crud.controller')
var userController = require('../controllers/user.controller')

router.post('/fb', async (req, res, next) => {
  axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`)
    .then(async (response) => {
      const { data } = response;
      if (data.error) return api.responseUnauthorized(res, data.error.message);
      
      let account = crudController.readByUniqueField('loginAccounts', 'fbId', data.id)
      let user = undefined
      if(!account) {
        user = {
          name: data.name
        }
        const userRef = await crudController.create('users', user)
        user.id = userRef.id
        account = {
          fbId: data.id,
          userId: userRef.id
        }
        crudController.create('loginAccounts', account)

      } else {
        user = await crudController.readById('users', account.userId)
      }
      
      generateJwtToken(res, user.id)
      return api.responseOk(res, user)

  
    });
})

router.post('/email', async () => {

})

router.post('/login', async (req, res, next) => {
  const user = await userController.getUserByEmailPassword(req.body.email, req.body.password)
  if (user) {
    // Generate an access token
    const accessToken = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {expiresIn: 60});
    res.cookie('accesstoken', accessToken, { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true })
    api.responseOk(res, {accessToken})
  } else {
    api.responseError(res, 'login not success')
  }
});

router.get('/devlogin2/:userId', async (req, res, next) => {
  //hNqOKzYwhJjZTIDLUkf5
  console.log('asaaaaa')
  const userId = req.params.userId
  const token = generateJwtToken(res, userId)
  res.set('accessTokenDev', token)
  console.log('setaccesstokendev', token)
  const user = crudController.readById('user', userId)
  api.responseOk(res, user)
});

router.get('/devlogin/:userId', async (req, res, next) => {
  //hNqOKzYwhJjZTIDLUkf5
  const userId = req.params.userId
  const accessToken = jwt.sign({ userId }, process.env.TOKEN_SECRET, {expiresIn: 60});
  res.cookie('accesstoken', accessToken, { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true })
  api.responseOk(res, {accessToken})
});

router.get('/session', async (req, res, next) => {
  api.responseOk(res,req.session)
});

router.post('/logout', async (req, res, next) => {
  req.user = null
  api.responseOk(res)
});

function generateJwtToken(res, userId) {
  const accessToken = jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
  
  const d7 = 7 * 24 * 60 * 60 * 1000
  //res.cookie('accesstoken', accessToken, { expires: new Date(Date.now() + d7), httpOnly: true, secure: true })
  res.cookie('accesstoken', accessToken, { expires: new Date(Date.now() + d7), httpOnly: true })
  return accessToken
}



module.exports = router;

module.exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};