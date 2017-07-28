import fetch from 'isomorphic-fetch'
// import {Tool} from '../../config/tool'
import axios from 'axios';

export const SET_STATE = 'SET_STATE'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_DATA_START = 'GET_DATA_START'
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
export const TEST_DISPATCH = 'TEST_DISPATCH'

const apiPath = "127.0.0.1:8000";


//开始获取数据
const requestPosts = path => {
  return {
    type: REQUEST_POSTS,
    path
  }
}

//获取数据成功
const receivePosts = (path, json) => {
  // console.log("receivePosts",RECEIVE_POSTS,path,json);
  return {
        type: RECEIVE_POSTS,
        path ,
        json 
    }
}


// 页面初次渲染时获取数据
// export const fetchPosts = (path, postData) => {

//     // let url = target + path + Tool.paramType(postData);
//     let url = path;
//     return dispatch => {
//         dispatch(requestPosts(postData));
//         return fetch(url,{
//             mode: 'cors',
//             "Content-Type": "application/json",
//         })
//         .then(response => {
//             if (response.ok) {
//                 response.json().then(json => dispatch(receivePosts(path, json)))
//             } else {
//                 console.log("status", response.status);
//             }
//         })
//         .catch(error => console.log(error))
//     }
// }

/**
 * [fetchPosts description by axios]
 * @return {[type]} [description]
 */
export const fetchPosts = (path, postData) => {
    var url = apiPath + path;
    return dispatch => {
        dispatch(requestPosts(postData));
        return axios.post(url,postData).then(res => {
            if(res.status==200 && res.data.code==200){
                dispatch(receivePosts(path, res.data.data));
            }else{
                console.log("status",response.status);
            }
        }).catch(error => console.log(error));
    }
}

//开始获取数据
const getDataStart = path => {
    return {
        type:GET_DATA_START,
        path
    }
}

//获取数据成功
const getDataSuccess = (path, json, success, name) => {
  return {
    type: GET_DATA_SUCCESS,
    path ,
    json ,
    success ,
    name
  }
}

/**
 * [getData description 手动获取数据]
 * @return {[type]} [description]
 */
export const getData = (path,postData,success,name) => {
    let url = apiPath + path;
    return dispatch => {
        dispatch(getDataStart(postData));
        return axios.get(url,postData).then(res => {
            if(res.status==200 && res.data.code==200){
                dispatch(getDataSuccess(path,res.data.data,success,name));
            }else{
                console.log("status",response.status);
            }
        }).catch(error => console.log(error));
    }
}


