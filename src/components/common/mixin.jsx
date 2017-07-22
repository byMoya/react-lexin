import React, {Component, PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';

import template from './template';
import Swiper from './swiper';
// console.log('template',template);

/* 输出公用组件 */
export {template,Swiper}


/**
 * 公共头部
 *
 * @export
 * @class Header
 * @extends {Component}
 */
export class Header extends Component {  //头部标题
     constructor(props,context) {
        super(props,context);
        this.state = {
            showHide :'none', // 显示右侧菜单，默认隐藏
        }

        this.showNav = () => { //显示右侧导航栏
            if (this.state.showHide == 'block') {
                this.setState({showHide:'none'})
            }else{
                this.setState({showHide:'block'})
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    render() {
        let {title,backRoute,backParams,btngroups} = this.props;
        // console.log(btngroups);
        let backNav = '',
            btngroupsDom = '';

        if(backRoute){
            backNav = (<Link className='lx-header-back' to={{pathname:backRoute,query:backParams || {}}}>&lt;</Link>);
        }

        if(btngroups){
            btngroupsDom = (
                <div className='lx-header-btngroups'>
                    {
                        btngroups.map(function(el,idx){
                            return <i key={'btngroups-'+idx} className={el.name} onClick={el.handleClick}></i>;
                        })
                    }
                </div>
            );
        }

        return (
            <header className='lx-header'>
               {backNav} 
               {title}
               {btngroupsDom}
            </header>
        );
    }
}

/**
 * 公用底部导航
 */
export class Footer extends Component{
    constructor(props,cxt){
        super(props,cxt);
        this.state = {};
    }
    render(){
        let {path} = this.props;
        
        return (
            <footer className='lx-footer'>

                <Link to='/index' className={'lx-footer-item '+ (path=='index' || path==undefined?'lx-footer-selected':'')}>
                    <i className='fa fa-home'></i>
                    <p>首页</p>
                </Link>
                <Link to='/group' className={'lx-footer-item '+ (path=='group'?'lx-footer-selected':'')}>
                    <i className='fa fa fa-group'></i>
                    <p>群组</p>
                </Link>
                <Link to='/scene' className={'lx-footer-item '+ (path=='scene'?'lx-footer-selected':'')}>
                    <i className='fa fa-paper-plane' style={{'color':'#51a6df','fontSize':'.32rem','marginTop':'.01rem'}}></i>
                    <p></p>
                </Link>
                <Link to='/discovery' className={'lx-footer-item '+ (path=='discovery'?'lx-footer-selected':'')}>
                    <i className='fa fa-search'></i>
                    <p>发现</p>
                </Link>
                <Link to='/user' className={'lx-footer-item '+ (path=='user'?'lx-footer-selected':'')}>
                    <i className='fa fa-user-circle'></i>
                    <p>我的</p>
                </Link>
            </footer>
        );
    }
}

