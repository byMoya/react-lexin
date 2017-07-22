import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Header,template,Footer} from './common/mixin';


class Main extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            userName:'',
            userId:'',
            level:null,
            walkTarget:'',
            weightTarget:'',
            devices:[],
            score:'',
            isWechat:null,
            isQQ:null,
            isApple:null,
            shouldUpdata:undefined
        }
    }

    componentWillMount(){

    }
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){ 
        let result = nextProps.state.data;
        if(this.state.shouldUpdata == undefined){
            this.setState({
                shouldUpdata:true
            })
            this.setState(result);
        }
        // Object.assign(this.state,result);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('nextProps',fromJS(this.props),fromJS(nextProps),!is(fromJS(this.props), fromJS(nextProps)) );
        // console.log('nextState',!is(fromJS(this.state),fromJS(nextState)) );
        // debugger;
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;
        }
    }
   
    render() {
        let {devices} = this.state;
        return (
            <div className='page-contain'>
                <Header title='我的' />
                <div className='card'>
                    <dl className='card-item'>
                        <dt className='card-item-img'>
                            <div className='card-item-bgimg' style={{'borderRadius':'100%','backgroundImage':`url('http://localhost:8000/images/p1.jpg')`}}></div>
                        </dt>
                        <dd className='card-item-con'>
                            <p className='font-L' style={{'padding':'.05rem 0'}}>{this.state.userName}</p>
                            <p className='font-gray'>ID:{this.state.userId}</p>
                            <div className='icon-right'>
                                <i className='fa fa-lightbulb-o'></i>
                                &nbsp;{this.state.level}
                            </div>
                        </dd>
                    </dl>
                </div>
                <div className='row-cell' style={{'padding':'.25rem 0 .1rem'}}>
                    <div className='row-cell-item'>
                        <p className='font-lineHight-none font-gray'>活动目标</p>
                        <p style={{'fontSize':'.24rem','paddingTop':'.05rem'}}>{this.state.walkTarget}步</p>
                    </div>
                    <div className='row-cell-item'>
                        <p className='font-lineHight-none font-gray'>体重目标</p>
                        <p style={{'fontSize':'.24rem','paddingTop':'.05rem'}}>{this.state.weightTarget}KG</p>
                    </div>
                </div>
                <div className='bg-Gray p-t'></div>
                <div className='card'>
                    {
                        devices.map(function(item,idx){
                            return  <dl key={'devices_'+idx} className='card-item'>
                                        <dt className='card-item-img' style={{'width':'.4rem','height':'.4rem'}}>
                                            <div className='card-item-bgimg' style={{'borderRadius':'100%','backgroundImage':`url('http://localhost:8000/images/p2.jpg')`}}></div>
                                        </dt>
                                        <dd className='card-item-con'>
                                            <p className='p-b-s'>{item.name}</p>
                                            <p className='font-S font-gray'>{item.connect=='0'?'未连接':'已连接'}</p>
                                            <div className='icon-right'>&gt;</div>
                                        </dd>
                                    </dl>
                        })
                    }
                </div>
                <div className='row-cell'>
                    <div className='row-cell-item'>
                        <p className='font-gray'><i className='fa fa-crosshairs'></i>添加新设备</p>
                    </div>
                </div>
                <div className='bg-Gray p-t'></div>

                <div className='row-cell'>
                    <div className='row-cell-left'>
                        <i className='fa fa-github'></i>
                        我的积分
                    </div>
                    <div className='row-cell-right'>
                        {this.state.score}分&nbsp;&gt;
                    </div>
                </div>
                <div className='row-cell'>
                    <div className='row-cell-left'>
                        <i className='fa fa-shopping-cart'></i>
                        乐心商城
                    </div>
                    <div className='row-cell-right'>
                        &nbsp;&gt;
                    </div>
                </div>
                <div className='bg-Gray p-t'></div>

                <div className='row-cell'>
                    <div className='row-cell-left'>
                        <i className='fa fa-wechat'></i>
                        微信排行版
                    </div>
                    <div className='row-cell-right'>
                        {this.state.isWechat=='1'?'已绑定':'未绑定'}&nbsp;&gt;
                    </div>
                </div>
                <div className='row-cell'>
                    <div className='row-cell-left'>
                        <i className='fa fa-qq'></i>
                        QQ排行版
                    </div>
                    <div className='row-cell-right'>
                        {this.state.isQQ=='1'?'已绑定':"未绑定"}&nbsp;&gt;
                    </div>
                </div>
                <div className='row-cell'>
                    <div className='row-cell-left'>
                        <i className='fa fa-heart'></i>
                        连接苹果健康
                    </div>
                    <div className='row-cell-right'>
                        {this.state.isApple=='1'?'已连接':'未连接'}&nbsp;&gt;
                    </div>
                </div>
                <div className='row-cell'>
                    <div className='row-cell-left'>
                        <i className='fa fa-commenting'></i>
                        意见反馈
                    </div>
                    <div className='row-cell-right'>
                        &nbsp;&gt;
                    </div>
                </div>
                <div className='row-cell'>
                    <div className='row-cell-left'>
                        <i className='fa fa-cog'></i>
                        设置
                    </div>
                    <div className='row-cell-right'>
                        &nbsp;&gt;
                    </div>
                </div>

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
    url: '/user/info'
});

