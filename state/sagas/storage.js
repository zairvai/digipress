import {Auth,Storage} from 'aws-amplify'
import AWS from 'aws-sdk'
import {putRoutine,getRoutine,customPutRoutine,listRoutine,removeRoutine} from '../routines/storage'
import {buffers,eventChannel,END} from 'redux-saga'
import {put,call,take,takeEvery,takeLatest} from 'redux-saga/effects'

const config = {
    bucket : "baktikominfo-digipress-media",
    region : "ap-southeast-1"
}

const storageBaseURL = "https://d1wnrlqq9u8wb1.cloudfront.net"
//const storageBaseURL = "https://baktikominfo-digipress-media.s3-ap-southeast-1.amazonaws.com"

AWS.config.s3 = {
    //endpoint:"http://localhost:20005",
    region: config.region,
    apiVersion: '2006-03-01'
}

const putProgress = async ({directory,file}) => {

    const credentials = await Auth.currentCredentials()
    const s3 = new AWS.S3({credentials})

    const channel = eventChannel(emitter=>{

        s3.putObject({
                //ACL:"public-read",
                Bucket:config.bucket,
                Key:`${directory}/${file.name}`,
                ContentType:file.type,
                Body:file
            })
            .on("httpUploadProgress",progress=>{
                const uploadProgress = progress.loaded/progress.total
                emitter({progress:uploadProgress})
            })
            .promise()
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

function* putObject(action){
    
    const {object} = action.payload
    const {directory,file} = object

    const channel = yield call(putProgress,({directory,file}))

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
                baseURL :storageBaseURL,
                key:`${directory}/${file.name}`,
                progress
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

    // try{
    //     const {object} = action.payload
    //     const {key,level,download} = object 

    //     yield put(getRoutine.request())

    //     const data = yield Storage.get(key,{level,download})
    //     // const data = yield call([Storage,"get"],key)

    //     yield put(getRoutine.success({url:data,key,level}))

        
    // }
    // catch(error){
    //     console.log(error)
    //     yield put(getRoutine.failure({error}))
    // }
    // finally{
    //     yield put(getRoutine.fulfill())
    // }

}

export function* getObjectWatcher(){
    yield takeEvery(getRoutine.TRIGGER,getObject)
}

function* listObjects(action){

    try{
        const {object} = action.payload
        const {directory,maxKeys,nextToken} = object 
        
        yield put(listRoutine.request())

        const credentials = yield Auth.currentCredentials()

        const s3 = new AWS.S3({credentials})

        const data = yield s3.listObjectsV2({
            Bucket:config.bucket,
            Prefix:directory,
            MaxKeys:maxKeys,
            ContinuationToken:nextToken
            //StartAfter:"public/07112834-fea0-43c2-85e1-b9ca31cbe891/media/2016-BMW-M4-GTS-interior.jpg"
        }).promise()

        // console.log(data)

        let items=[]

        const {Contents,NextContinuationToken,Prefix,IsTruncated} = data

        if(Contents.length>0){    
            Contents.forEach(content=>{
                const item = {
                        uid:content.ETag,
                        key:content.Key,
                        baseURL:storageBaseURL}
                items.push(item)
            })
        }


        yield put(listRoutine.success({
            items,
            nextToken:NextContinuationToken,
            prefix:Prefix,
            hasMore:IsTruncated
        }))
        
    }
    catch(error){
        console.log(error)
        yield put(listRoutine.failure({error}))
    }
    finally{
        yield put(listRoutine.fulfill())
    }

}

export function* listObjectsWatcher(){
    yield takeLatest(listRoutine.TRIGGER,listObjects)
}


function* removeObject(action){

    const {object} = action.payload
    const {key,index} = object

    yield put(removeRoutine.request())

    try{
        yield put(removeRoutine.success({index}))
    }catch(error){
        yield put(removeRoutine.failure({error}))
    }
    finally{
        yield put(removeRoutine.fulfill())
    }

}

export function* removeObjectWatcher(){
    yield takeLatest(removeRoutine.TRIGGER,removeObject)
}

