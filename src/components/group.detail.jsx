import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Header,template} from './common/mixin';


class Main extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {

        }
    }

    componentWillMount(){

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
        let btngroups = [
            {name:'fa fa-search',handleClick:function(){alert('fuck wjh')}},
            {name:'fa fa-list-ul',handleClick:function(){alert('fuck wjh')}}
        ];
        return (
            <div className='page-contain'>
                <Header title={this.props.location.state.groupName} backRoute={'/group'} />
                <div className='bg-cover' style={{'height':'1rem','backgroundImage':'url("../images/b7.jpg")'}}></div>
                <div className='tc' style={{'marginTop':'-.4rem'}}>
                    <div>
                        <img style={{'width':'.8rem','height':'.8rem','boxShadow':'0 0 0.05rem 0.02rem #ccc','border':'.05rem solid #fbf9fa'}} src={'../images/p1.jpg'} />
                    </div>
                    <p className='m-t-s'>测试测试测试</p>
                    <p className='font-gray font-M p-b'>
                        <i className='fa fa-user-circle'></i>&nbsp;{99}&emsp;
                        <i className='fa fa-location-arrow'></i>&nbsp;{'广州' + '.' + '天河'}
                    </p>
                </div>
                <div className='p-b bg-Gray'></div>
                <div className='card'>
                    <dl className='card-item'>
                        <dt className='card-item-img'>
                            <div className='card-item-bgimg' style={{'borderRadius':'100%','backgroundImage':`url("../images/p1.jpg")`}}></div>
                        </dt>
                        <dd className='card-item-con'>
                            <p className='font-M m-t-s'>{'测试账号'}</p>
                            <p className='font-S m-t-s'>{'第一名'}</p>
                        </dd>
                    </dl>
                </div>
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

