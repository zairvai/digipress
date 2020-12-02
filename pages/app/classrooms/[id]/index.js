import React from 'react'
import {connect} from 'react-redux'
import Layout from 'Templates/ClassroomLayout'

class Index extends React.Component{

    item = this.props.classrooms.item

    render(){

        return(
            <React.Fragment>
                <Layout item={this.item}>

                </Layout>
            </React.Fragment>
        )

    }

}

export default connect(state=>state)(Index)