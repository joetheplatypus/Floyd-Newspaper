const NewsController = require('./controllers/NewsController');
const UserController = require('./controllers/UserController');
const upload = require('./upload')



//checks for login, if not sends error
const CheckToken = require('./middleware/CheckToken')

module.exports = function(app) {
  //news items
  app.get('/posts', NewsController.index)
  app.get('/posts/featured', NewsController.indexFeatured)
  app.get('/posts/:itemId', NewsController.get)
  app.post('/posts', CheckToken, NewsController.post)
  app.put('/posts/:itemId', CheckToken, NewsController.put)
  app.delete('/posts/:itemId', CheckToken, NewsController.delete)
  app.get('/posts/:itemId/preview', CheckToken, NewsController.getPreview)
  app.post('/uploadImg', CheckToken, upload.single('img'), NewsController.uploadImg)

  //users
  app.post('/login', UserController.login)
  app.post('/register', UserController.register)
  app.get('/userInfo', CheckToken, UserController.info)
  app.get('/user/:id', UserController.get)
  app.get('/dashboard', CheckToken, UserController.dash)
}