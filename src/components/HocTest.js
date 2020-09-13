import React from 'react'

// 单一函数
function Lesson(props) {
    return (
        <div>
            {props.stage} - {props.title}
        </div>
    )
}

// 模拟数据
const lessons = [
    {stage: 'react', title: '核心API'},
    {stage: 'react', title: "组件化1"},
    {stage: "react", title: "组件化2"}
]

// 高阶组件

const withContent = (Comp) => (props) => {
    const content = lessons[props.idx]
    return <Comp {...content}/>
}

// LessonWithContent是包装后的Lesson组件
const LessonWithContent = withContent(Lesson)



export default function HocTest() {
    // HocTest渲染三个LessonWithContent
    return (
        <div>
            {[0,0,0].map((item, index) => (<LessonWithContent idx={index} key={index}/>))}
        </div>
    )
}


