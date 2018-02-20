import { Meteor } from 'meteor/meteor';
import '../imports/api/users';

Meteor.startup(() => {
  // code to run on server at startup
  // const petSchema = new SimpleSchema({
  //   name:{
  //     type:String,
  //     min:1,
  //     max:200
  //   },
  //   hourlyWage:{
  //     type:Number,
  //     min:0
  //   },
  //   contactNumber:{
  //     type:String,
  //     optional:true,
  //     regEx:SimpleSchema.RegEx.Phone
  //   },
  //   email:{
  //     type:String,
  //     regEx:SimpleSchema.RegEx.EmailWithTLD
  //   }

  // });


  // petSchema.validate({
  //   name:"ziko",
  //   hourlyWage:1,
  //   contactNumber:'757687',
  //   email:"alpah@gg.com"
  // });
  
});
