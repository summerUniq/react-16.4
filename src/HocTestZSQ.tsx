import * as React from 'react'


// 模拟数据
const lessons = [
    { stage: 'react', title: '核心API' },
    { stage: 'react', title: "组件化1" },
    { stage: "react", title: "组件化2" }
]

// 高阶组件---根据idx查找数据传给子组件

const withContent = (Comp: any) => (props: { idx: number }) => {
    const content = lessons[props.idx]
    return <Comp {...content} />
}

// 高阶类组件---在组件挂载时进行打印
const withLog = (Comp: any) => {
    return class extends React.Component {
        componentDidMount() {
            console.log('didMount', this.props);
        }
        render() {
            return (
                <Comp {...this.props} />
            )
        }
    }

}

// @withLog
// @withContent
class Lesson extends React.Component<any> {


    render() {
        return (
            <div>
                {this.props.stage} - {this.props.title}
            </div>
        )
    }
}





export default function HocTestZSQ() {
    // HocTest渲染三个LessonWithContent
    return (
        <div>
            {[0, 0, 0].map((item, index) => (<Lesson idx={index} key={index} />))}
        </div>
    )
}


