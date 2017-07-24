/**
 * 
 * @authors dong (you@example.org)
 * @date    2016-12-26 11:05:00
 * @version $Id$
 */

var Mock = require("mockjs");

Mock.mock(/\/index\/statement/,{
	code:200,
	data:{
		heart:82,
		weight:72.5,
		sleep:320,
		walk:82,
		walkCurrent:123,
		calorie:238,
		walkTarget:8000,
		walkCount:2633
	}
});

Mock.mock(/\/group\/banner/,{
	code:200,
	data:[
	    {src:"http://127.0.0.1/images/b1.jpg"},
	    {src:"http://127.0.0.1/images/b2.jpg"},
	    {src:"http://127.0.0.1/images/b3.jpg"},
	    {src:"http://127.0.0.1/images/b4.jpg"}
	]
});

Mock.mock(/\/group\/list/,{
	code:200,
	data:(function(){
		var list = [];
		for(var i=0;i<10;i++){
			list.push({
				id:i,
		    	img:"http://127.0.0.1/images/p1.jpg",
		    	name:"测试跑步群"+i,
		    	tips:"夜跑,跑步,活动",
		    	province:"广东",
		    	city:"广州",
		    	area:"天河区",
		    	members:parseInt(Math.random()*1000)
		    });
		}
		// debugger;
		return list;
	})()
});

Mock.mock(/\/discovery\/banner/,{
	code:200,
	data:[
	    {src:"http://127.0.0.1/images/b5.jpg"},
	    {src:"http://127.0.0.1/images/b6.jpg"},
	    {src:"http://127.0.0.1/images/b7.jpg"}
	]
});

Mock.mock(/\/user\/info/,{
	code:200,
	data:{
		userName:'测试账号',
        userId:'70939455',
        level:3,
		walkTarget:8000,
		weightTarget:72.5,
		devices:[
			{name:'乐心手环MAMBO 2',connect:'1'}
		],
		/*score:(Math.random()*100).toFixed(1),*/
		score:89,
		isWechat:'1',
		isQQ:'0',
		isApple:'1'
	}
});
