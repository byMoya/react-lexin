import 'core-js/fn/object/assign';

/* 引入react */
import React,{Component,PropTypes} from 'react';
import ReactDOM,{render} from 'react-dom';

/* 引入路由 */
import route from './router/route'

/* 引入redux */
import {Provider} from 'react-redux'

/* 引入store */
import store from './redux/store/store'

/* 引入css */
import './styles/app.less'

/* mock模拟数据 */
// import mock from "./lib/mock/mock.js";


/* 监听store变化 */
store.subscribe(()=>{
	// console.log(store.geState());
});

render(
	<Provider store={store}>
		{route}
	</Provider>,
	document.getElementById('app')
);