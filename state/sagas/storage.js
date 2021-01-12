import {Auth,Storage} from 'aws-amplify'
import AWS from 'aws-sdk'
import AWSExports from 'Src/aws-exports.js'
import {putRoutine,getRoutine,customPutRoutine,listRoutine,removeRoutine} from '../routines/storage'
import {buffers,eventChannel,END} from 'redux-saga'
import {put,call,take,takeEvery,takeLatest} from 'redux-saga/effects'
import {getBase64} from 'Helper'

AWS.config.s3 = {
    //endpoint:"http://localhost:20005",
    region:AWSExports["aws_user_files_s3_bucket_region"],
    apiVersion: '2006-03-01'
}

const putProgress = ({directory,file,level}) => {

    
    const channel = eventChannel(emitter=>{

        const key = `${directory}/${file.name}`

        Storage.put(key,file,{
            contentType:file.type,
            level,
            acl:"public-read",
            progressCallback:(progress)=>{
                const uploadProgress = progress.loaded/progress.total
                emitter({progress:uploadProgress})
            }
        })
        .then(data=>{
            emitter({data,progress:1})
            emitter(END)
        })
        .catch(error=>{
            emitter({error})
            emitter(END)
        })

        return ()=>{
            //emitter(END)
        }

    },buffers.sliding(2))


    return channel
}

// const putProgress = async ({credentials,directory,file,level}) => {

//     const key = `${level}/${directory}/${file.name}`

//     const fileBuffer = await getBase64(file)

//     var params = {
//         Bucket:AWSExports["aws_user_files_s3_bucket"],
//         Key:key,
//         Body:fileBuffer,
//         ContentType:file.type,
//         ACL:"public-read"
//     }

//     const s3 = new AWS.S3({credentials})

//     const upload = new AWS.S3.ManagedUpload({
//         params,
//         service:s3
//     })

//     const channel = eventChannel(emitter=>{

//         document.addEventListener('httpUploadProgress',function(progress){
//             console.log(progress)
//             const uploadProgress = progress.loaded/progress.total
//             emitter({progress:uploadProgress})
//         })

//         upload.promise()
//             .then(
//                 data=>{
//                     console.log(data)
//                     emitter({data,progress:1})
//                     emitter(END)
//                 },
//                 error=>{
//                     console.log(error)
//                     emitter({error})
//                     emitter(END)
//                 }
//             )

//             return ()=>{

//             }

         
//     },buffers.sliding(2))


//     return channel
// }

function* putObject(action){
    
    const {object} = action.payload
    const {directory,file,level} = object

    const credentials = yield Auth.currentCredentials()

    const channel = yield call(putProgress,({credentials,directory,file,level}))

    yield put(putRoutine.request({
        uid:file.uid,
        file,
        progress:0
    }))

    while(true){

        const {data,progress,error} = yield take(channel)

        if(data){
            yield put(putRoutine.success({
                uid:file.uid,
                file,
                progress,
                ...data,
            }))
            channel.close()
            yield put(putRoutine.fulfill())
            return
        }
        
        if(error){
            yield put(putRoutine.failure({
                uid:file.uid,
                file,
                error
            }))
            channel.close()
            yield put(putRoutine.fulfill())
            return
        }

        if(progress){
            yield put(customPutRoutine.progress({
                uid:file.uid,
                file,
                progress
            }))
        }

    }

}

export function* putObjectWatcher(){

    yield takeEvery(putRoutine.TRIGGER,putObject)

}

function* getObject(action){

    try{
        const {object} = action.payload
        const {key,level,download} = object 

        yield put(getRoutine.request())

        const data = yield Storage.get(key,{level,download})
        // const data = yield call([Storage,"get"],key)

        yield put(getRoutine.success({url:data,key,level}))

        
    }
    catch(error){
        console.log(error)
        yield put(getRoutine.failure({error}))
    }
    finally{
        yield put(getRoutine.fulfill())
    }

}

export function* getObjectWatcher(){
    yield takeEvery(getRoutine.TRIGGER,getObject)
}

function* listObjects(action){

    try{
        const {object} = action.payload
        const {directory,level,maxKeys} = object 
        
        const credentials = yield Auth.currentCredentials()

        const s3 = new AWS.S3({credentials})

        const data = yield s3.listObjectsV2({
            Bucket:AWSExports["aws_user_files_s3_bucket"],
            Prefix:`${level}/${directory}`,
            FetchOwner:true,
            MaxKeys:maxKeys,
            //ContinuationToken:"1N2uM2rSaCpMvjA6bjddgpj/rvEtYtVMo0Hdqysr0njF4tliUf643o+QAqYbwXp+Fbr3xITlXn8Hv0P5tSWeIDsS6+0eOvh/K9bYJbwILfvd0JM/nTibOXUZP2oFlQ54XeW3h7lVO2Gvm0xAVL7ZsMU7ysEDgcjMMsNPNro21W5ZE/TuPM4XLqx3aVFmvjMsRwyxk0+cPfdATg2s0iatz5w==",
            //StartAfter:"public/07112834-fea0-43c2-85e1-b9ca31cbe891/media/2016-BMW-M4-GTS-interior.jpg"
        }).promise()

        console.log(data)
        
    }
    catch(error){
        console.log(error)
    }

}

export function* listObjectsWatcher(){
    yield takeLatest(listRoutine.TRIGGER,listObjects)
}