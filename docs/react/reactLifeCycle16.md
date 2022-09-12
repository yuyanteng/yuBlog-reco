---
title: react V16 父子组件生命周期执行顺序
date: 2022/09/12
tags:
 - React
categories:
-  React
---
# react V16 父子组件生命周期执行顺序

>转载于 <a href="https://segmentfault.com/a/1190000040199436)" target="_blank">https://segmentfault.com/a/1190000040199436)</a>
>如有侵权，提示既删。（448709355@qq.com）

::: tip
执行顺序:
* 1.父类的ComponentWillMount
* 2.父类的render
* 3.子类1的ComponentWillMount
* 4.子类1的render
* 5.子类2的ComponentWillMount
* 6.子类2的render
* 7.子类1的ComponentDidMount
* 8.子类2的ComponentDidMount
* 9.父类的ComponentDidMount

:::

## 组件挂载的过程
初始化props，通过类的静态属性defaultProps或者getDefaultProps函数，初始化的props会与父组件指定的props合并，最后赋值给this.props
constructor()，或者getInitialState
componentWillMount()，此时dom还没渲染，在这里执行的setState不会导致重绘，执行无效果
render()
componentDidMount()，在这里执行的setState会导致重绘（或称为二次渲染）
被动更新流程（父组件调用setState）

componentWillReceiveProps()，这时子组件的props仍然是旧的，可以在这里把新的props通过setState设置进state中，不会触发二次渲染
shouldComponentUpdate()，这里读取到的state是以上更新后的state
componentWillUpdate()，不能在这里执行setState，执行了无效果
render()
componentDidUpdate()，可以在这里进行异步的setState
主动更新流程（当前组件调用setState）

执行的函数相比上面的被动更新流程，少了一个componentWillReceiveProps方法，其余的都一样。
卸载

componentWillUnmount()，用于清除定时器、事件绑定；React 官方不建议在 componentWillMount() 修改 state ，通常建议在 componentDidMount(), 如果需要设置 state 的初始状态，可以在 (es6:)constructor() 或者 (es5:)getInitialState() 中设置。

setState是一个异步操作，修改的state必能通过this.state.xxx来马上读取，但可以在setState的第二个参数（回调函数）中读取更新后的值。执行这个函数的时候，新状态会被存放进队列中，稍后才进行状态合并，接着触发shouldComponentUpdate和render，所以连续多次的setState不会影响效率，只会触发一次render

### 渲染代码
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
const buildClass = (name)=>{
    return class extends React.Component{
        constructor(props) {
            super(props);
            console.log( name + ' constructor');
        }
        componentWillMount() {
            console.log( name + ' componentWillMount');
        }
        componentDidMount() {
            console.log( name + ' componentDidMount');
        }
        componentWillUnmount() {
            console.log( name + ' componentWillUnmount');
        }
        componentWillReceiveProps(nextProps) {
            console.log( name + ' componentWillReceiveProps(nextProps)');
        }
        shouldComponentUpdate(nextProps, nextState) {
            console.log( name + ' shouldComponentUpdate(nextProps, nextState)');
            return true;
        }
        componentWillUpdate(nextProps, nextState) {
            console.log( name + ' componentWillUpdate(nextProps, nextState)');
        }
        componentDidUpdate(prevProps, prevState) {
            console.log( name + ' componetDidUpdate(prevProps, prevState)');
        }
    }
}
class Child extends buildClass('Child'){
    render(){
        console.log('Child render')
        return (
            <div>child</div>
        )
    }
}
class Parent extends buildClass('Parent'){
    render(){
        console.log('Parent render')
        return (
            <Child />
        )
    }
}
ReactDOM.render(
    <Parent />,
    document.getElementById('root')
}
```

#### 执行结果

* Parent constructor
* Parent componentWillMount
* Parent render
* Child constructor
* Child componentWillMount
* Child render
* Child componentDidMount
* Parent componentDidMount

#### 总结
当执行render子组件的时候，才会进入子组件的生命周期，子组件的周期结束后，再回到上级的周期。

## 更新组件的两种方式
### 1.主动更新
组件通过setState修改自己的状态。修改子组件的代码：

```javascript

class Child extends buildClass('Child'){
    render(){
        console.log('Child render')
        return (
            <button onClick={()=>{this.setState({data:123})}}>child</button>
        )
    }
}

```
#### 执行结果
Child shouldComponentUpdate(nextProps, nextState)
Child componentWillUpdate(nextProps, nextState)
Child render
Child componetDidUpdate(prevProps, prevState)


### 2.被动更新
父组件通过props把自己的state传递给子组件，父组件执行setState更新状态还原子组件的代码，修改父组件代码如下：

```javascript
class Parent extends buildClass('Parent'){
    render(){
        console.log('Parent render')
        return (
            <div>
                <Child />
                <button onClick={()=>{this.setState({data:123})}}>Parent</button>
            </div>
        )
    }
```
#### 执行结果
* Parent shouldComponentUpdate(nextProps, nextState)
* Parent componentWillUpdate(nextProps, nextState)
* Parent render
* Child componentWillReceiveProps(nextProps)
* Child shouldComponentUpdate(nextProps, nextState)
* Child componentWillUpdate(nextProps, nextState)
* Child render
* Child componetDidUpdate(prevProps, prevState)
* Parent componetDidUpdate(prevProps, prevState)


## 总结
不管父组件有没有把数据传递给子组件，只要父组件setState，都会走一遍子组件的更新周期。而且子组件被动更新会比主动更新所执行的流程多出来一个componentWillReceiveProps 方法。

如果在以上被动更新的基础上，修改buildClass中的代码，使 shouldComponentUpdate返回false，代码如下：

```javascript
shouldComponentUpdate(nextProps, nextState) {
    console.log( name + ' shouldComponentUpdate(nextProps, nextState)');
    return false;
}
```
点击parent中的更新按钮，仅仅输出一句：
Parent shouldComponentUpdate(nextProps, nextState)

## 结论
只要组件在以上函数中返回false，则子组件不会进行更新re-render，所有更新流程都不执行了。

### 我的解决方案
* 父类ComponentDidMount发请求
* render中判断数据是否拿到
* 拿到之后再挂载子类组件
* 并且为了保证如果当前组件被封成一个Component之后其他人能够正常使用
* 因此根据无状态组件的特点
* 在当前组件的外层封装无状态组件（用来根据数据是否获取确定组件的加载时机）
* 这时候直接在父类中引入这个无状态组件
* 保证父类不会知道这个组件被延迟加载

### 其他解决方案
* 父组件仍然在componentDidMount里面发送请求
* 子组件在componentWillReceiveProps中判断数据是否存在
* 存在的话就在子类的componentWillReceiveProps中发送请求