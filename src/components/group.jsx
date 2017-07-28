import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Header,Footer,template,Swiper} from './common/mixin';


class Main extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            swiperListData:[],
            groupData:[]
        };
        this.getBanner = () => {
            this.props.getData('/group/banner',{},res => {
                this.setState({
                    swiperListData:res
                });
            },'GetGroupBanner');
        }
        this.getGroup = () => {
            var _groupData = this.state.groupData;
            this.props.getData('/group/list/',{},res => {
                this.setState({
                    groupData:_groupData.concat(res)
                });
            },"GetGroupData");
        }
        this.toGroupDetail = (id)=>{
            this.props.history.push({
                pathname:'group/detail',
                state:{
                    id:id,
                    groupName:'组测试详情_'+id
                }
            });
        }
    }

    componentWillMount(){
        
    }
    componentDidMount(){
        this.getBanner();
        this.state.groupTimer = setTimeout(()=>{
            this.getGroup();
        },0);
    }

    componentWillReceiveProps(nextProps){
        // debugger;
        // alert('componentWillReceiveProps');
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
        debugger;
        console.log("redner",(new Date).getTime());

        let btngroups = [
            {name:'fa fa-search',handleClick:function(){alert('fuck wjh')}},
            {name:'fa fa-list-ul',handleClick:function(){alert('fuck wjh')}}
        ];

        let {swiperListData,groupData} = this.state;

        return (
            <div className='page-contain'>
                <Header title='群组' btngroups={btngroups}/>
                <Swiper list={swiperListData} interval={5000} defstyle={{"width":"100%","height":"1.2rem"}}/>
                <div className='row-cell'>
                    <i className='fa fa-address-book-o' style={{'color':'#7651f6'}}></i>
                    我的群组&nbsp;(1)
                </div>
                {
                    groupData.map((item,idx)=>{
                        return (
                            <div className='card' key={'group_'+idx} onClick={this.toGroupDetail.bind(this,item.id)}>
                                <dl className='card-item'>
                                    <dt className='card-item-img' style={{'width':'.8rem','height':'.8rem'}}>
                                        <div className='card-item-bgimg' style={{'backgroundImage':`url(${item.img})`}}></div>
                                    </dt>
                                    <dd className='card-item-con'>
                                        <p className='font-M m-b-s'>{item.name}</p>
                                        <p className='m-b-s'>
                                            {
                                                item.tips.split(',').map(function(tipItem,tipIdx){
                                                    return <span className='tip' style={{'marginRight':'.05rem'}} key={'group_'+idx+'_tip'+tipIdx}>{tipItem}</span>
                                                })
                                            }
                                        </p>
                                        <p className='font-gray font-M'>
                                            <i className='fa fa-user-circle'></i>&nbsp;{item.members}&emsp;
                                            <i className='fa fa-location-arrow'></i>&nbsp;{item.city + '.' + item.area}
                                        </p>
                                    </dd>
                                </dl>
                            </div>
                        )
                    })
                }
                <Footer path={this.props.route.path}/>
            </div>
        )
    }
    
    componentWillUnmount() {
        cancelAnimationFrame(this.state.requestID);
        if(this.state.groupTimer){
            clearInterval(this.state.groupTimer);
        }
    }
}

export default template({
    id: 'index',  //应用关联使用的redux
    component: Main //接收数据的组件入口
});

