import React, {Component, PropTypes} from 'react';
import { is, fromJS} from 'immutable';
import {bindTouchGetXY} from '../../common/io';

class Swiper extends Component{

    constructor(props,cxt){
        super(props,cxt);
        
        this.state = {
            idx:0
        };

        this.getStateIdx = ()=>{
            return this.state.idx;
        };

        this.initSwiperTimer = ()=>{
            let interval = this.props.interval?this.props.interval:1000;
            this.state.timer = setInterval(function(){
                let SwiperItemIdx = this.state.idx;
                // debugger;
                if(SwiperItemIdx < this.props.list.length-1){
                    SwiperItemIdx += 1;
                }else{
                    SwiperItemIdx = 0;
                }
                this.setState({
                    idx:SwiperItemIdx
                });
            }.bind(this),interval);
        };

        this.clearSwiperTimer = ()=>{
            clearInterval(this.state.timer);
        };
    }

    componentDidMount(){

        bindTouchGetXY({
            el:this.refs.swiper,
            efn:(x0,y0,x1,y1)=>{
                let _idx = this.state.idx;
                if(this.props.list && this.props.list.length){
                    if(x0-x1>0){
                        // alert("左")
                        _idx = _idx==this.props.list.length-1?0:_idx+1;
                    }else{
                        // alert("右")
                        _idx = _idx==0?this.props.list.length-1:_idx-1;
                    }
                    this.clearSwiperTimer();
                    this.setState({
                        idx:_idx
                    });
                    this.initSwiperTimer();
                }
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('props',!is(fromJS(this.props), fromJS(nextProps)));
        // console.log('state',!is(fromJS(this.state),fromJS(nextState)));
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    componentWillUnmount(){
        this.clearSwiperTimer();
    }

    render(){
        let {defstyle,list} = this.props;
        let SwiperItemIdx = this.state.idx;
        // console.log("Swiper render",SwiperItemIdx);
        return (
            <div className='swiper' style={defstyle} ref='swiper'>
                {
                    list.map(function(item,idx){
                        item.display = idx==SwiperItemIdx?"block":"none";
                        return <SwiperItem key={idx} defoption={item}/>
                    })
                }
                <SwiperLoops loops={list} getLoopIdx={this.getStateIdx.bind(this)} />
            </div>
        );
    }
}

class SwiperLoops extends Component{
    constructor(props,cxt){
        super(props,cxt);
    }
    render(){
        let {loops,getLoopIdx} = this.props;

        return (
            <div className='swiper-loop swiper-loop-bottom'>
                {
                    loops.map(function(item,idx){
                        return <span key={idx} className={'swiper-loop-item' + ' ' + (getLoopIdx()==idx?'swiper-loop-item-selected':'')}></span>
                    })
                }
            </div>
        );
    }
}

class SwiperItem extends Component{
    static contextTypes = {};

    constructor(props,context){
        super(props,context);
        this.state = {};
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     return !is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    // }

    render(){
        let {src,display} = this.props.defoption;
        return (
            <div className='swiper-item' style={{'display':`${display}`}}>
                <div className='swiper-item-img' style={{'backgroundImage':`url('${src}')`}}></div>
            </div>
        )
    }
}

export default Swiper;