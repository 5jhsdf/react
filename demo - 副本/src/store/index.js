/*
 redux:状态管理的核心文件，创建仓库对象，创建reducer对象，创建action
 react-redux：把仓库里面状态和方法关联到组件里面
 redux-thunk：如果你在仓库里面发请求的话，把数据赋值给状态，需要使用异步处理模块

三个核心概念：
  在页面可以通过仓库对象.dispatch派发action，被reducer捕获，reducer根据action进行修改状态，最终渲染到界面上
 reducer: 定义状态和修改状态的功能
 store: 仓库对象 全局唯一的仓库对象，需要在入口文件index.js注入
 action:action对象， 通过仓库对象调用dispatch函数进行派发action，告知reducer怎么修改状态，类似于vuex中$store.dispatch函数，
*/
// createStore 创建仓库对象
// applyMiddleware 使用中间件 例如使用redux-thunk中间件
// combineReducers 合并多个reducers 类似于vuex的state和mutations
import {createStore,applyMiddleware,combineReducers} from "redux"
// 处理异步请求函数
import thunkMiddleware from "redux-thunk"


// 定义一个reducer,本质使用一个纯函数，
// 参数1位状态以及的状态的初始值
// 参数2是action对象，关于这个状态的操作的行为：例如count是加还是减等操作
// action对象{type:"加",value:参数}，例如: store.dipatch({type:'加',value:3}), store.dipatch({type:'-',value:3})
function countReducer(state=0,action){
      switch (action.type) {
        case "COUNT_ADD":
           return state+=action.value  // 如果type等于COUNT_ADD 状态新值加上value
        case "COUNT_MIN":
          return state-=action.value 
        default:
          return state
      }
}
// token:字符串的reducer {action:"SET_TOKNE",}
//  {action:"DEL_TOKNE",""}
function tokenReducer(state="",action){
     switch (action.type) {
      case "SET_TOKEN":
        return state = action.value
      case "DEL_TOKEN":
          return state = action.value
      default:
        return state
     }
}

// roomList的状态,把请求写在页面里面，不使用异步action
// 相当于同步的修改
function roomListReducer(state=[],action){
  switch (action.type) {
   case "SET_ROOM_LIST":
     return state = action.value
   default:
     return state
  }
}

// roomList创建一个异步的action 本质还是调用同步reducer进行修改的
// dispatch函数
function roomListAction(dispatch){
      window.fetch("https://autumnfish.cn/banner").then(res=>res.json()).then(res=>{
            console.log(res.banners,"1111111")
            // 通过派发action去给状态赋值
            dispatch({
                type:"SET_ROOM_LIST",
                value:res.banners
            })
        })
}

//合并多个reducer 作为创建对象的参数
var combiners =  combineReducers({
    count:countReducer,
    token:tokenReducer,
    roomList:roomListReducer
})


// 导出异步的action
export {
  roomListAction
}
//导出仓库对象
export default createStore(combiners,applyMiddleware(thunkMiddleware))


