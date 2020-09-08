import React, { useState, useEffect, useReducer, useContext } from 'react'

// 创建上下文
const Context = React.createContext();

function FruitList(props) {
    const {fruits} = useContext(Context)
    return (
        <ul>
            {fruits && fruits.map((fruit => (
                <li key={fruit}>{fruit}</li>
            )))}
        </ul>
    )
}

// 用户输入处理
function FruitAdd(props) {
    const [pname, setPname] = useState('');
    // 输入内容及设置内容状态的方法
    const {dispatch} = useContext(Context)
    // 键盘事件处理
    const onAddFruit = e => {
        if (e.key === "Enter") {
           // 直接派发动作修改状态
           dispatch({type: "add", payload: pname})
           setPname('')
        }
    }
    return (
        <div>
            <input
                type="text"
                value={pname}
                onChange={e => setPname(e.target.value)}
                onKeyDown={onAddFruit}
            />
        </div>
    )
}

// 添加fruit状态维护fruitReducer
function fruitReducer(state, action) {
    switch (action.type) {
        case "init":
            return action.payload;
        case 'add':
            return [...state, action.payload];
        default:
            return state
    }
}


export default function HooksTest() {
    // useState(initialState) 接收初始状态，返回一个由状态和更新函数组成的数组
    // const [fruits, setFruit] = useState(["香蕉", "西瓜"])
    // useReducer(reducer, initstate)
    const [fruits, dispatch] = useReducer(fruitReducer, [])

    useEffect(() => {
        console.log(11111);
        setTimeout(() => {
            // setFruit(['香蕉', '草莓', '黑布林'])
            dispatch({type: 'init', payload: ['香蕉', '草莓', '黑布林']})
        }, 1000)
    }, [])


    return (
        <div>
            <Context.Provider value = {{fruits, dispatch}}>
            {/* <FruitAdd onAddFruit={pname => dispatch({type: 'add', payload: pname})} /> */}
            <FruitAdd />
            <FruitList />

            </Context.Provider>
           
        </div>
    )
}
