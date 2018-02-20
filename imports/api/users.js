import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((newUser)=>{
    const email = newUser.emails[0].address;

    try {
      new SimpleSchema({
        email:{
          type:String,
        regEx:SimpleSchema.RegEx.EmailWithTLD
        }
      }).validate({email:email});
      
    } catch (error) {
      throw new Meteor.Error(400,error.message);
    }

    console.log("new user",newUser);
    return true;
  });