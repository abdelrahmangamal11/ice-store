const{Router}=require('express');
const router=Router();
const Authcontroller=require('../controller/Authcontroller');

router.get('/sign-up',Authcontroller.signup_get)
router.post('/sign-in',Authcontroller.signin_post)
router.get('/sign-in',Authcontroller.signin_get)
router.post('/sign-up',Authcontroller.signup_post)
router.get('/logout',Authcontroller.logout)
module.exports=router;