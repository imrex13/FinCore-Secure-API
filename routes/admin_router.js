// routes/admin_router.js
const authorize = require('../middleware/authorize');
const { verifyToken } = require('../middleware/jwtAuthorize');
const adminController = require('../controllers/adminController');

