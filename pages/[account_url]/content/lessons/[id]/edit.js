import React from 'react'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import { Row, Col, PageHeader} from 'antd'
import LayoutLesson from 'Templates/Layout.lesson'
import LessonController from 'Library/controllers/LessonController'
import FormLesson from 'Components/FormLesson'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getLessonRoutinePromise} from 'State/routines/lesson'
import {NextSeo} from 'next-seo'

const PageLessonEdit = props => {

    const {auth} = props

    const propsRef = React.useRef(props)
    const lessonController = React.useMemo(()=>new LessonController(propsRef.current),[propsRef])
    
    const router = useRouter()
	const id = router.query.id
    const [item,setItem] = React.useState({})
    
    const isMounted = React.useRef()

    React.useEffect(()=>{
        
        isMounted.current = true

        async function doLoad(){
            try{
                const lesson = await lessonController._get(id)
                setItem(lesson.data)

            }catch(error){
                router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.classroom && item.classroom.id}`)
                console.log(error)
            }
        }
        
        if(id && isMounted.current) doLoad()

        return ()=> isMounted.current = false

    },[id])

    
    // const links = [
    //                 ['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],
    //                 ['Ruang belajar',`/${auth.account.uniqueURL}/content/classrooms`,''],
    //                 [item.classroom && item.classroom.title,`/${auth.account.uniqueURL}/content/classrooms/${item.classroom && item.classroom.id}`,''],
    //                 ['Materi',`/${auth.account.uniqueURL}/content/classrooms/${item.classroom && item.classroom.id}`,''],
    //                 [item.title,`/${auth.account.uniqueURL}/content/classrooms/${item.classroom && item.classroom.id}/lessons/${item.id}`,''],
    //                 ['Ubah',`/${auth.account.uniqueURL}/content/classrooms/${item.id}/edit`,'active']
                // ]

    const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/lessons/${item.id}`)	
    }
    
    const onSuccess = lesson =>{
        router.push(`/${auth.account.uniqueURL}/content/lessons/${item.id}`)	
    }
    

    return(
        <LayoutLesson>
            <NextSeo title={`Konten - Ubah materi - ${item.title}`}/>
			<Row>
				<Col md={18} sm={24} xs={24}>
					<PageHeader title="Ubah materi" subTitle={item.title} ghost={false}
						onBack={()=>router.push(`/[account_ur]/content/lessons/[id]`,`/${auth.account.uniqueURL}/content/lessons/${item.id}`,{shallow:true})}
					/>
				</Col>
			</Row>
            <Row>
                <Col md={18} sm={24} xs={24} className="mt-2">
                    <FormLesson item={item} onSuccess={onSuccess} onCancel={onCancel}/>
                </Col>
            </Row>
            
		</LayoutLesson>
    )

    

}

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
                getLessonRoutinePromise
        },dispatch),dispatch
    })
)(PageLessonEdit)