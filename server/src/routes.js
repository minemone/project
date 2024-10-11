const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const AgentController = require('./controllers/AgentController');
const WeaponController = require('./controllers/WeaponController');
const SkillController = require('./controllers/SkillController');

let multer = require("multer")

// upload section
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        // callback(null, file.fieldname + '-' + Date.now());
        console.log(file);
        callback(null, file.originalname);
    }
})
let upload = multer({ storage: storage }).array("userPhoto", 100)

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

    app.post('/weapon', WeaponController.create);
    app.put('/weapon/:weaponId', WeaponController.put);
    app.delete('/weapon/:weaponId', WeaponController.remove);
    app.get('/weapons', WeaponController.index);
    app.get('/weapon/:weaponId', WeaponController.show);

    app.post('/skill', SkillController.create);
    app.put('/skill/:skillId', SkillController.put);
    app.delete('/skill/:skillId', SkillController.remove);
    app.get('/skills', SkillController.index);
    app.get('/skill/:skillId', SkillController.show);
    

    // upload
    app.post("/upload", function (req, res) {
        // isUserAuthenticated,
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        })
    }),

    //delete file uploaded function
    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs'); 
            console.log(req.body.filename)

            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename, (err) => {
                if (err) throw err;
                res.send("Delete sucessful")
                // console.log('successfully deleted material file');
            });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete file the material'
            })
        }
    })
}