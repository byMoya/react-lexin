import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Header,Footer,template} from './common/mixin';


class Main extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {

        }

        this.goback = function(){
            window.history.back()
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
        let tips = ['运动前，要热身','气温较高，注意补水'];
        let cicleStyle = {
            height:'.5rem',
            width:'.5rem',
            'display':'inline-block',
            'borderRadius':'100%',
            'color':'#fff',
            'lineHeight':'.5rem'
        }; 

        return (
            <div className='page-contain page-contain-full bg-Navy'>
                <div className='font-white tc' style={{'padding':'.8rem 0 .2rem'}}>
                    <i className='fa fa-cloud' style={{'fontSize':'.6rem'}}></i>
                </div>
                <div className='font-white tc' style={{'lineHeight':'.28rem'}}>
                    <p className='font-M'>33°C</p>
                    <p className='font-M'>广州.多云</p>
                    <p className='font-M'>PM2.5:优</p>
                </div>
                <div className='font-white tc' style={{'padding':'.6rem 0 0','lineHeight':'.28rem'}}>
                    <p className='font-M'>
                        宜室外运动
                    </p>
                    <ul style={{'color':'#92a1a8'}}>
                        {
                            tips.map(function(el,idx){
                                return <li key={idx}>{el}</li>
                            })
                        }
                    </ul>
                </div>
                <div className='font-white tc p-b' style={{'position':'fixed','bottom':'0','width':'100%'}}>
                    <div>
                        <div style={(Object.assign({'backgroundColor':'#e95a76'},cicleStyle))}>
                            <i className='fa fa-blind font-L'></i>
                            <p style={{'lineHeight':'.22rem'}}>跑步</p>
                        </div>
                    </div>
                    <div style={{'marginTop':'-.1rem'}}>
                        <div style={(Object.assign({'backgroundColor':'#03c98c'},cicleStyle))}>
                            <i className='fa fa-blind font-L'></i>
                            <p style={{'lineHeight':'.22rem'}}>健走</p>
                        </div>
                        <span style={{'padding':'0 .7rem','display':'inline-block'}}></span>
                        <div style={(Object.assign({'backgroundColor':'#ffbb1d'},cicleStyle))}>
                            <i className='fa fa-blind font-L'></i>
                            <p style={{'lineHeight':'.22rem'}}>骑行</p>
                        </div>
                    </div>
                    <div style={{'marginTop':'-.1rem'}}>
                        <div onClick={this.goback} style={(Object.assign({'backgroundColor':'#fff','transform':'scale(.8)'},cicleStyle))}>
                            <i className='fa fa-close font-L' style={{'color':'#173140','fontSize':'.26rem','lineHeight':'.5rem'}}></i>
                        </div>
                    </div>
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

