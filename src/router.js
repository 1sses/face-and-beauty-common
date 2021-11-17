const Router = require('koa-router')
const multer = require('@koa/multer')
const uuid = require('uuid').v4
const { AuthController } = require('./controllers/auth.controller')
const { UserSettingsController } = require('./controllers/user.settings.controller')
const { emailValidation, passwordValidation } = require('./middlewares/auth.validation.middleware')
const { tokenValidation } = require('./middlewares/token.validation.middleware')
const { EmployeeController } = require('./controllers/employee.controller')
const { ServiceController } = require('./controllers/service.controller')
const { MessageController } = require('./controllers/message.controller')
const { AppointmentController } = require('./controllers/appointment.controller')
const { StatisticsController } = require('./controllers/statistics.controller')

const fs = require('fs')
const path = require('path')

const router = new Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.url === '/change-avatar') {
      cb(null, 'uploads/avatars')
    }
    if (req.url === '/new-employee' || req.url === '/update-employee') {
      cb(null, 'uploads/employees')
    }
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname
    cb(null, `${uuid()}-${originalName}`)
  }
})
const upload = multer({ storage })

// router.post('/is-available-email', emailValidation, AuthController.isAvailableEmail)
router.get('/api/validate', tokenValidation, AuthController.validation)
router.post('/api/registration', emailValidation, passwordValidation, AuthController.registration)
router.get('/api/new-role/:link', tokenValidation, AuthController.updateRole)
router.post('/api/login', emailValidation, passwordValidation, AuthController.login)
router.post('/api/logout', AuthController.logout)
router.get('/api/activate/:link', AuthController.activation)

router.put('/api/change-name', tokenValidation, UserSettingsController.changeName)
// router.put('/change-status', tokenValidation, UserSettingsController.changeStatus)
router.put('/api/change-avatar', tokenValidation, upload.single('avatar'), UserSettingsController.changeAvatar)
router.put('/api/change-email', tokenValidation, emailValidation, UserSettingsController.changeEmail)
router.put('/api/change-password', tokenValidation, passwordValidation, UserSettingsController.changePassword)
router.get('/api/personal-data', tokenValidation, UserSettingsController.getPersonalData)
// router.get('/user-data', (ctx) => { ctx.body = 'This is the plug' })

router.put('/api/new-employee', tokenValidation, upload.single('employee'), EmployeeController.adding)
router.get('/api/get-employees', EmployeeController.getEmployees)
router.put('/api/get-employee', tokenValidation, EmployeeController.getEmployeeById)
router.put('/api/update-employee', tokenValidation, upload.single('employee'), EmployeeController.updateEmployeeInfo)
router.put('/api/delete-employee', tokenValidation, EmployeeController.deleteEmployee)

router.put('/api/new-service', tokenValidation, ServiceController.appendService)
router.put('/api/get-group-categories', tokenValidation, ServiceController.getCategoriesByGroup)
router.get('/api/services', ServiceController.getAllGrouped)
router.get('/api/all-services', ServiceController.getAll)
router.put('/api/update-service', tokenValidation, ServiceController.updateService)
router.put('/api/delete-service', tokenValidation, ServiceController.deleteService)

router.post('/api/contacts', MessageController.appendMessage)
router.get('/api/get-messages', tokenValidation, MessageController.getMessages)
router.put('/api/delete-message', tokenValidation, MessageController.deleteMessage)

router.put('/api/new-appointment-auto', tokenValidation, AppointmentController.appendAuto)
router.put('/api/new-appointment-hard', tokenValidation, AppointmentController.appendHard)
router.get('/api/current-appointments', tokenValidation, AppointmentController.current)
router.get('/api/all-appointments', tokenValidation, AppointmentController.getAll)
router.put('/api/employee-orders', tokenValidation, AppointmentController.getEmployeeOrders)
router.get('/api/user-orders', tokenValidation, AppointmentController.getUserOrders)
router.put('/api/delete-order', tokenValidation, AppointmentController.delete)

router.get('/api/about', StatisticsController.getStatistics)

router.get('/api/', ctx => {
  ctx.body = fs.readFileSync(path.resolve(path.join('build', 'index.html')), 'utf8')
})

module.exports = router
