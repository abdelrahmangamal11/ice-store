const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');
const schema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'plz entre an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'the email is not valid']
    },
    password:{
        type:String,
        required:[true,'plz entre a password'],
        minlength:[6,'the password should be more than 6 characters']

    }
});



schema.post('save',(doc,next)=>{
console.log('the doc saved to the db',doc);

next();
})/*post doesnot refer to (post request) but refere to something happens after an event happenns*/

schema.pre('save', async function(next){
 const salt= await bcrypt.genSalt();
 this.password= await bcrypt.hash(this.password,salt)  

// console.log(this,'about to save');
next();
})

schema.statics.login= async function(email,password){
  const user =await this.findOne({email});
    console.log(user,'df');  
  if(user){
    const auth=await bcrypt.compare(password,user.password)
    if(auth){
        return user;
      }
    throw Error('incorrect password')
  }
    throw Error('incorrect email')

};

const User=mongoose.model('user',schema);
module.exports=User

