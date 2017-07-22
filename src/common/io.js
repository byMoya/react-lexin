/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-07-18 14:01:37
 * @version $Id$
 */

export const bindTouchGetXY = (params)=>{
	let {el,sfn,efn,mfn} = params;

	let _x = 0,_y=0,_touches=[];
	el.addEventListener('touchstart',(e)=>{
		_x = e.targetTouches[0].pageX;
		_y = e.targetTouches[0].pageY;
		if(sfn){
			sfn(_x,_y);	
		}
    },false);

	el.addEventListener('touchmove',(e)=>{
		_touches = e.touches; 
		let len = e.touches.length;
		let _mx = e.targetTouches[len-1].pageX;
		let _my = e.targetTouches[len-1].pageY;
        if(mfn){
        	mfn(_x,_y,_mx,_my);
        }
    },false);

    el.addEventListener('touchend',(e)=>{
        if(efn){
        	let len = _touches.length;
        	if(len){
        		let _ex = _touches[len-1].pageX;
				let _ey = _touches[len-1].pageY;
	        	efn(_x,_y,_ex,_ey);
        	}
        }
    },false);
}

// export default {
// 	bindTouchByX
// };