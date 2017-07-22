import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

import index from '../components/index'; //销售录入

class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;


const welcome = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/welcome').default)
    },'welcome')
}

const scene = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/scene').default)
    },'scene')
}

const group = (location,cb) =>{
    require.ensure([],require => {
        cb(null,require('../components/group').default)
    },'group');
}

const user = (location,cb)=>{
    require.ensure([],require=>{
        cb(null,require('../components/user').default)
    },'user');
}

const discovery = (location,cb)=>{
    require.ensure([],require=>{
        cb(null,require('../components/discovery').default)
    },'discovery');
}

const groupDetail = (location,cb)=>{
    require.ensure([],require=>{
        cb(null,require('../components/group.detail').default)
    },'groupDetail');
}

const RouteConfig = (
    <Router history={history}>
        <Route path='/' component={Roots}>
            <IndexRoute component={index} />

            <Route path='index' component={index} />
            <Route path='welcome' getComponent={welcome} />
            <Route path='scene' getComponent={scene} />
            <Route path='group' getComponent={group} />
            <Route path='user' getComponent={user} />
            <Route path='discovery' getComponent={discovery} />

            <Route path='group/detail' getComponent={groupDetail} />

            <Redirect from='*' to='/'  />
        </Route>
    </Router>
);

export default RouteConfig;