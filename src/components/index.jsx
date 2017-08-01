import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Header,Footer,template} from './common/mixin';


class Main extends Component {
    constructor(props,context){
        super(props,context);
        console.log("index constructor",props,context);
        this.state = {
            heart:'',
            weight:'',
            sleep:'',
            walk:'',
            walkCurrent:'',
            calorie:'',
            walkTarget:'',
            walkCount:''
        }
    }

    componentWillMount(){

    }
    componentDidMount(){
        this.props.testMutationsCache();
        this.props.dispatch({
            type:'mutationsCache',
            path:'/test/mutations',
            data:[
                {key:'name',value:'wjh'}
            ]
        });
    }

    componentWillReceiveProps(nextProps){
        /* 把接口返回数据set进state */
        // alert('componentWillReceiveProps');
        console.log("componentWillReceiveProps 把接口返回数据set进state");
        if(!nextProps.state.isFetching){
            let result = nextProps.state.data;
            Object.assign(this.state,result);
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("index shouldComponentUpdate");
    //     return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    // }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;
        }
    }
   
    render() {

        console.log('render');
        // debugger;

        let btngroups = [
            {key:1,name:'fa fa-external-link-square',handleClick:function(){alert('fuck wjh')}}
        ];
        return (
            <div className='page-contain'>
                <Header title='乐心运动' btngroups={btngroups}/>
                <div className='home-stats'>
                    <p className='home-stats-numtitle tc'>
                        <i className='fa fa-map'></i>
                        &nbsp;步数
                    </p>
                    <p className='home-stats-num tc'>
                        {this.state.heart}
                    </p>
                    <div className='card' style={{'borderBottom':0}}>
                        <div className='home-stats-bar'>
                            <div className='home-stats-bar-item'>
                                <p className='home-stats-bar-item-title'>{this.state.calorie}</p>
                                <p>消耗卡路里</p>
                            </div>
                            <div className='home-stats-bar-item'>
                                <p className='home-stats-bar-item-title'>{this.state.walkTarget}</p>
                                <p>目标步数</p>
                            </div>
                            <div className='home-stats-bar-item'>
                                <p className='home-stats-bar-item-title'>{this.state.walkCount}</p>
                                <p>行走公里数</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <dl className='card-item'>
                        <dt className='card-item-img' style={{'backgroundColor':'#e95673'}}>
                            <i className='fa fa-heart' style={{'fontSize':'.36rem','color':'#fff'}}></i>
                        </dt>
                        <dd className='card-item-con'>
                            <p className='font-L' style={{'padding':'.05rem 0'}}>心率&emsp;<span className='font-gray'>{this.state.heart}&nbsp;次/分</span></p>
                            <p className='font-gray'>2小时前更新</p>

                            <div className='border-bottom'></div>

                            <div className='icon-right'>&gt;</div>
                        </dd>
                    </dl>
                </div>
                <div className='card'>
                    <dl className='card-item'>
                        <dt className='card-item-img' style={{'backgroundColor':'#5bc2c1'}}>
                            <i className='fa fa-user-plus' style={{'fontSize':'.36rem','color':'#fff'}}></i>
                        </dt>
                        <dd className='card-item-con'>
                            <p className='font-L' style={{'padding':'.05rem 0'}}>体重&emsp;<span className='font-gray'>{this.state.weight}&nbsp;kg</span></p>
                            <p className='font-gray'>2小时前更新</p>
                            <div className='icon-right'>&gt;</div>
                        </dd>
                    </dl>
                </div>
                <div className='card'>
                    <dl className='card-item'>
                        <dt className='card-item-img' style={{'backgroundColor':'#6d46bb'}}>
                            <i className='fa fa-bed' style={{'fontSize':'.36rem','color':'#fff'}}></i>
                        </dt>
                        <dd className='card-item-con'>
                            <p className='font-L' style={{'padding':'.05rem 0'}}>睡眠&emsp;<span className='font-gray'>{Math.floor(this.state.sleep/60)}小时{(this.state.sleep%60)}分</span></p>
                            <p className='font-gray'>2小时前更新</p>
                            <div className='icon-right'>&gt;</div>
                        </dd>
                    </dl>
                </div>
                <div className='card'>
                    <dl className='card-item'>
                        <dt className='card-item-img' style={{'backgroundColor':'#841e73'}}>
                            <i className='fa fa-blind' style={{'fontSize':'.36rem','color':'#fff'}}></i>
                        </dt>
                        <dd className='card-item-con'>
                            <p className='font-L' style={{'padding':'.05rem 0'}}>健走&emsp;<span className='font-gray'>{(this.state.walkCount/1000).toFixed(2)}&nbsp;公里</span></p>
                            <p className='font-gray'>2小时前更新</p>
                            <div className='icon-right'>&gt;</div>
                        </dd>
                    </dl>
                </div>
                <Footer path={this.props.route.path}/>
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
    url: '/index/statement'
});

