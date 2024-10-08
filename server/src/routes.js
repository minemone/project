const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const AgentController = require('./controllers/AgentController');

module.exports = (app) => {
    app.get('/users', isAuthenController, UserController.index);
    app.get('/user/:userId', UserController.show);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);
    app.post('/login', UserAuthenController.login);
    app.post('/agent', AgentController.create);
    app.put('/agent/:agentId', AgentController.put);
    app.delete('/agent/:agentId', AgentController.remove);
    app.get('/agent/:agentId', AgentController.show);
    app.get('/agents', AgentController.index);
}