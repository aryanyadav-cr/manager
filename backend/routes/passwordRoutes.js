import express from 'express'
import {createpassword,getpassword , deletepassword,updatepassword} from '../controllers/passwordControllers.js'
const router= express.Router();

router.get('/', getpassword)
router.post('/',createpassword)
router.put('/:id',updatepassword)
router.delete('/:id',deletepassword)


export default router