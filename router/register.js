const express = require('express')
const isAuth=require("../middleware/is-user")
const isAdmin=require("../middleware/is-admin")
const router = express.Router();
const taskController= require('../controller/tasks')
const registerController= require('../controller/register');
const userController=require('../controller/users')
// const adminController=require('../controller/register')
router.post('/register',registerController.register);
router.get('/auth-user',isAuth,registerController.getAuthUser);
router.post('/login',registerController.login);
router.post('/adminlogin',registerController.adminlogin);
router.get('/auth-admin',isAdmin,registerController.getAdminAuthUser);

router.post('/tasks', taskController.createTask);
router.put('/tasks/:id',taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.get('/tasks', taskController.getAllTasks);
 router.get('/tasks/:id', taskController.getOneTask);

router.get('/users',userController.getUsers);
router.get('/tasksUser/:id',taskController.getUserTask)
router.get('/usertask',taskController.getSpecificTasks);

module.exports=router;