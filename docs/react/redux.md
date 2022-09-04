---
title: redux-状态管理器
date: 2022/08/17
tags:
 - React
categories:
-  React
---
<!-- more -->

<img src="../../.vuepress/public/redux.png" alt="image-20220904234423300" style="width: 75%;" />

# redux的认识及使用

## 学习目标

- 什么是redux?
- redux核心原理
- redux的使用流程

## 什么是redux

> redux是一个集中式状态管理工具, 和react框架结合的比较多, 但是也不局限react框架, 也可以和其他主流的前端框架结合起来使用

## redux安装

- `npm install --save redux`

## redu核心原理

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)

### 核心方法
- createStore():创建store存储对象; 需要一个reducer函数作为参数
```js
import {createStore} from 'redux';
const store=createStore(reducer)
```
- getState(): 获取state状态数据
```js
store.getState()
```
- dispatch(): 触发action, 更新数据
```js
store.dispatch(action={type:'',data:''})
```
- subscribe(): 监听数据改变, 可以用来重新渲染页面
```js
store.subscribe(function(){
    // 调用重新渲染组件的业务代码
})
```
- applyMiddleware(): 注册redux中间件
```js
import {createStore} from 'redux';
// 支持异步action的redux插件
import thunk from 'redux-thunk';
createStore(reducers,applyMiddleware(thunk))
```
- combineReducers(): 合并reducer函数
- redux/reducers.js
```js
import {combineReducers} from 'redux';

const brands=(state=[],action)=>{
    switch(action.type){
        case 'get_brands':
            return action.data;
        break;
        case 'add_brand':
            const arr = [...state];
            const id=state.length>0?state[0].id+1:1;
            arr.unshift({id,...action.data});
            return arr;
            break;
            return
        break;
        case 'del_brand':
            return state.filter((item) => item.id !== action.data);
            break;
        default:
            return state;
    }
}

export default combineReducers({
    brands
})
```

## react-redux
- 链接react和redux的一个中间件

###  核心对象

- Provider: 容器组件
```js
<Provider store={store}><App/></Provider>
```
- connect: 高阶组件; 链接react和redux, 将redux中维护的state状态和action方法传递给UI组件
```js
import App from '../Components/App'
connect(
    (state)=>({comments:state}),
    {
        get_brands,
        add_brand,
        del_brand,
        get_brands_async
    }
)(App)
```


## redux-thunk
- 一个支持异步action的redux插件

### 安装

- `npm i  redux-thunk -S`

### 使用

- redux/store.js
```js
import {applyMiddleware} from 'redux';
// 导入redux-thunk实现异步action
import thunk from 'redux-thunk';
const store=createStore(reducers,applyMiddleware(thunk));
```
- redux/actions.js
```js
// 同步action
export const get_comments=(data)>({type:'get_comments',data});
// 异步action,获取评论列表
export const get_comments_async=(data)=>{
    return (dispatch)=>{
        setTimeout(()=>{
            // 该数据一般是通过ajax请求数据接口获取的
            const data=[{
                id: 1,
                content: '我翻开这历史,这历史没有年代, 只是歪歪斜斜的每页都写着"仁义道德"四个字, 我横竖睡不着, 仔细看了半夜, 才从字缝中看出字来, 满本都写着两个字"吃人"',
                user: '鲁迅'
            }];
            // 通过dispatch()触发同步action, 进而实现通过reducer更新state状态数据
            dispatch(get_comments(data));
        },2000);
    }
}
```

## redux调试工具

### 安装

- `npm i redux-devtools-extension -D`

### 使用

- redux调试工具; 需要配合谷歌插件`redux-devtools`
- redux/store.js
```js
// 导入reducers
import reducers from 'reducers';
// 导入调试工具所需的函数
import {composeWithDevTools} from 'redux-devtools-extension';
const store=createStore(reducers,composeWithDevTools())
```

## 品牌管理案例

### redux

#### redux/store.js

```js
import { createStore, applyMiddleware } from 'redux';
// 导入redux-thunk异步插件
import thunk from 'redux-thunk'
import reducers from './reducers';
// createStore作用: 创建一个仓储对象
const store=createStore(reducers,applyMiddleware(thunk));
export default store;
```
#### redux/reducers.js

```js
import { combineReducers } from 'redux';
// state是状态数据的原始值, action={type:'add',data:{}}
function brands(state = [], action) {
    switch (action.type) {
        // 新增品牌: 不能直接修改老的状态数据, 应该根据老的状态数据, 生成一个新的状态数据, 然后返回
        case 'add_brand':
            const newAarr=[...state];
            // unshift的返回值是数组的长度
            newAarr.unshift(action.data);
            return newAarr;
            //  删除品牌
        case 'del_brand':
            const newArr = state.filter(item => item.id !== action.data);
            return newArr;
            // 修改
        case 'update_brand':
            break;
        // 获取品牌列表
        case 'get_brands':
            return action.data;
        default:
            return state;
    }
}
export default combineReducers({brands});
```
#### redux/actions.js

```js
// 同步action
export const add_brand=function(data){
    return {type:'add_brand',data}
}
export const del_brand=function(data){
    return {type:'del_brand',data}
}
export const get_brands=function(data){
    // console.log(data);
    return {type:'get_brands',data}
}

// 异步action
export const get_brands_async=function(){
    return function(dispatch){
          // 请求数据
        fetch(`http://106.13.182.88:3001/brand`).then(response=>response.json()).then(res=>{
            // 触发同步action
            dispatch(get_brands(res.message));
        });
    }
}

export const del_brand_async=function(id){
    return (dispatch)=>{
        // 请求数据接口, 实现删除操作
        fetch(`http://106.13.182.88:3001/brand/${id}`,{method:'DELETE'}).then((response)=>response.json()).then(res=>{
            // 触发同步删除action
            dispatch(del_brand(id));
        })
    }
}

export const add_brand_async=function(data){
    return (dispatch)=>{
        // 发送请求, 将品牌数据提交给数据接口
        fetch(`http://106.13.182.88:3001/brand`,{
            method:'POST',
            body:`name=${data.name}`,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(response=>response.json()).then(res=>{
            // 触发同步action
            // data={id,name,ctime}
            dispatch(add_brand(data));
        })
    }
}
```
#### redux/action-types.js

```js
// action.type常亮定义
export const GET_COMMENTS='get_comments';
export const ADD_COMMENTS='add_comments';
export const DEL_COMMENTS='del_comments';

```

### 功能组件

#### List.jsx

```js
import React, { Component } from 'react';

import { connect } from 'react-redux';
// 导入actions
import {add_brand,del_brand,get_brands_async,del_brand_async} from '../redux/actions';
class List extends Component {
    constructor(props){
        super(props);
        // 调用异步action,请求品牌列表数据
        this.props.get_brands_async();
        // 触发异步action
        // this.props.store.dispatch(get_brands_async());
    }
    del(id){
        // 调用store对象的dispatch方法, 实现品牌删除
        if(window.confirm('确认删除?')===false){
            return false;
        }
        // 通过异步action实现品牌删除
        this.props.del_brand_async(id);
    }
    render() {
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>品牌id</th>
                            <th>品牌名称</th>
                            <th>添加时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.list.map(item =>(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.ctime}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={()=>this.del(item.id)}>删除</button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    (state)=>({list:state.brands}),
    {
        add_brand,del_brand,get_brands_async,del_brand_async
    }
)(List);

```

#### Add.jsx

```js
import React, { Component } from 'react';

// 导入actions
import {add_brand,add_brand_async} from '../redux/actions';
import { connect } from 'react-redux';

class Add extends Component {
    constructor(props){
        super(props);
        this.state={
            brand:''
        }
    }
    render() {
        return (
            <div className="from">
                   <div className="form-group">
                       <input value={this.state.brand} onChange={this.inputChange.bind(this)} type="text" className="form-control" placeholder="请输入品牌名称"/>
                   </div>
                   <div className="form-group">
                       <button onClick={()=>this.addBrand()} className="btn btn-success">确认添加</button>
                   </div>
            </div>
        );
    }
    inputChange(event){
        this.setState({
            brand:event.target.value
        });
    }
    addBrand(){
        if(this.state.brand.trim()===''){
            return alert('请输入品牌名称');
        }
        // 手动构造品牌对象
        const data={
            id:Date.now(),
            name:this.state.brand,
            ctime:new Date().toLocaleDateString()
        }
        // 通过store.dispatch方法触发异步aciton:add_brand_async,完成品牌信息的添加
        this.props.add_brand_async(data);
        // 重置表单
        this.setState({
            brand:''
        });
    }
}

export default connect(
    state=>({list:state.brands}),
    {
        add_brand,add_brand_async  
    }
)(Add);

```

## 在线文档

- [redux](https://www.redux.org.cn/)
- [Redux 入门教程](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
- [品牌管理案例数据接口](http://106.13.182.88:3001/#103)