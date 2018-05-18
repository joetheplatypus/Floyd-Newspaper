const NewsController = require('./controllers/NewsController');
const UserController = require('./controllers/UserController');

//checks for login, if not sends error
const CheckToken = require('./middleware/CheckToken')

module.exports = function(app) {
  //news items
  app.get('/posts', NewsController.index)
  app.get('/posts/:itemId', NewsController.get)
  app.post('/posts', CheckToken, NewsController.post)
  app.put('/posts/:itemId', CheckToken, NewsController.put)
  app.delete('/posts/:itemId', CheckToken, NewsController.delete)

  //users
  app.post('/login', UserController.login)
  app.post('/register', UserController.register)
}