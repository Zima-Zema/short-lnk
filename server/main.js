import {Meteor} from 'meteor/meteor';
import '../imports/api/users';
import '../imports/api/links';
import '../imports/startup/simple-schema-config';
import {WebApp} from 'meteor/webapp';
Meteor.startup(() => {
  // WebApp.connectHandlers.use((req,res,next)=>{   console.log("this is from our
  // custom middleWear");   res.statusCode = 302;
  // res.setHeader('Location','http://google.com/');   // res.write('<h1>this is
  // War</h1>');   res.end();   // next(); });

  WebApp.connectHandlers.use((req, res, next) => {
      const _id = req.url.slice(1);
      Meteor.call('links.getLink', _id, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          if (result.url) {
            //there is returned url
            res.statusCode = 302;
            res.setHeader('Location', result.url);
            res.end();
          } else {
            next();
          }
        }
      })
      console.log(req.url);
      // res.statusCode = 404; res.setHeader('the-custom-header','I am in Love With
      // Fatma'); res.write('<h1>this is War</h1>'); res.end();
      next();

    });
  // code to run on server at startup const petSchema = new SimpleSchema({
  // name:{     type:String,     min:1,     max:200   },   hourlyWage:{
  // type:Number,     min:0   },   contactNumber:{     type:String,
  // optional:true,     regEx:SimpleSchema.RegEx.Phone   },   email:{
  // type:String,     regEx:SimpleSchema.RegEx.EmailWithTLD   } });
  // petSchema.validate({   name:"ziko",   hourlyWage:1,   contactNumber:'757687',
  //   email:"alpah@gg.com" });

});
