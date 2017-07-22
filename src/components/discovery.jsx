import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Header,template,Footer,Swiper} from './common/mixin';


class Main extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            swiperListData:[]
        }
        this.getBanner = () => {
            this.props.getData('/discovery/banner',{},res => {
                this.setState({
                    swiperListData:res
                });
            },'GetGroupBanner');
        }
    }

    componentWillMount(){
        this.getBanner();
    }
    componentDidMount(){

    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;
        }
    }
   
    render() {
        let {swiperListData} = this.state;

        return (
            <div className='page-contain'>
                <Header title='发现' />
                <Swiper list={swiperListData} interval={5000} defstyle={{"width":"100%","height":"1.2rem"}}/>
                <Footer path={this.props.route.path} />
            </div>
        )
    }
    
    componentWillUnmount() {
        cancelAnimationFrame(this.state.requestID);
    }
}

export default template({
    id: 'index',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

