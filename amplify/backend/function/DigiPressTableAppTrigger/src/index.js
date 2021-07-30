/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_DIGIPRESSIDENTITYMANAGER_NAME
	FUNCTION_DIGIPRESSSEARCHMANAGER_NAME
	FUNCTION_DIGIPRESSSTORAGEMANAGER_NAME
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var functionArenaIdentityManagerName = process.env.FUNCTION_DIGIPRESSIDENTITYMANAGER_NAME
var functionArenaSearchManagerName = process.env.FUNCTION_DIGIPRESSSEARCHMANAGER_NAME

Amplify Params - DO NOT EDIT */

const User = require("./model/User")
const Account = require("./model/Account")
const Tag = require("./model/Tag")
const Category = require("./model/Category")
const Article = require("./model/Article")
const Classroom = require("./model/Classroom")
const Lesson = require("./model/Lesson")
const Comment = require("./model/Comment")
const Qna = require("./model/Qna")

exports.handler = (event,context,callback) => {

  event.Records.forEach((record)=>{
    
      //console.log("Stream Records : ",JSON.stringify(record,null,2))

      if(record.eventName=="INSERT"){
      
        var newType = typeof record.dynamodb.NewImage.__typename !="undefined" ? record.dynamodb.NewImage.__typename.S : "unknown"

        switch(newType){

          case 'User'             :   User.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Account'          :   Account.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Tag'              :   Tag.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;
                                      
          case 'Category'         :   Category.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Article'          :   Article.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Classroom'        :   Classroom.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Lesson'           :   Lesson.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Comment'          :   Comment.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Qna'              :   Qna.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          default                 :   callback(null,"Unknown Field"); break;

        }  
      
      }
      else if(record.eventName=="MODIFY"){

        var newType = typeof record.dynamodb.NewImage.__typename !="undefined" ? record.dynamodb.NewImage.__typename.S : "unknown"
        
        switch(newType){

          case 'User'             :   User.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Account'          :   Account.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Tag'              :   Tag.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;
                                      
          case 'Category'         :   Category.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Article'          :   Article.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;
         
          case 'Classroom'        :   Classroom.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Lesson'           :   Lesson.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Comment'          :   Comment.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Qna'              :   Qna.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;


          default                 :   callback(null,"Unknown Field"); break;

        }

      }
      else if(record.eventName=="REMOVE"){

        var oldType = typeof record.dynamodb.OldImage.__typename !="undefined" ? record.dynamodb.OldImage.__typename.S : "unknown"

        switch(oldType){

          case 'User'             :   User.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Account'          :   Account.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;                       

          case 'Tag'              :   Tag.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;
                                      
          case 'Category'         :   Category.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Article'          :   Article.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;
          
          case 'Classroom'        :   Classroom.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;
          
          case 'Lesson'           :   Lesson.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Comment'          :   Comment.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Qna'              :   Qna.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

                                      
          default                 :   callback(null,"Unknown Field"); break;

        }  

      }
      
  })
  
};