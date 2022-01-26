const express = require('express')
const {createRootFolder,createFolder,getFolders} = require('../controllers/folder')

const router = express.Router();

router.route('/createRoot').post(createRootFolder);
router.route('/createSub').post(createFolder);
router.route('/:id').get(getFolders);

module.exports = router;