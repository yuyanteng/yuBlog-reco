---
title: 服务端与客户端渲染不一致
date: 2022/09/12
tags:
 - moreKonw
categories:
 - 百家齐放
---
<!-- more -->

## <table><tr><td bgcolor="#eaf3d4">服务端与客户端渲染不一致</td></tr></table>

### 一、DOM元素渲染不一致
::: warning
服务端渲染时生成的DOM元素与客户端渲染生成的DOM元素不一致,表现为生成的DOM节点标签或者属性不一致
:::

#### 1、产生原因(并不全是)

生成DOM元素一般与判断条件有关，在服务端已经渲染了好了组件，客户端条件变更，渲染其他组件时会导致原组件并没有被渲染

#### 2、产生的条件(可能还有其他)

* 本地代码没有重新启动服务

* react组件使用了。类组件中的PureComponent(组件自动触发shouldComponentDidUpdate生命周期，但是服务端前后传入的 props和state没变，只是其他判断条件改变，不会触发渲染，导致前后不一致)

#### 3、通常的解决方法:

```javascript
state =(
client:false;

//在componentDidMount更改值 componentDidMount(){
this.setstate(l
clientitrue})

// 在render里写判断 if(lelient){
return null:
```

