import React, { Component } from 'react'

// 声明一个dialog组件定义组件的外观和行为

function Dialog(props) {
    const messages = {
        "foo": { title: "foo", content: "foo~~~~~" },
        "bar": { title: 'bar', content: 'bar~' },
    }
    // 获取显示内容
    const children = props.children(messages[props.msg])
    const {header, footer}  = children
    return <div style={{ border: '1px solid blue' }}>
        {header}
        <div>{footer}</div>
    </div>
}



export default class CompositionTest extends Component {
    render() {
        return (
            <div>
                <Dialog msg='foo'>

                    {/* 方法1: jsx
                     <h1>组件复合</h1>
                    <p>复合组件给与你⾜足够的敏敏捷去定义⾃自定义组件的外观和⾏行行为</p> 
                    */}
                    {/* 
                    方法2: 对象
                    {{
                        default:
                            (<>
                                <h1>组件复合</h1>
                                <p>复合组件给与你⾜足够的敏敏捷去定义⾃自定义组件的外观和⾏行行为</p>
                            </>),
                        footer: <button onClick={() => alert('react composition')}>确认</button>
                    }} 
                    */}
                    
                    {({title, content}) => (
                        {
                            header:
                                (<>
                                    <h1>{title}</h1>
                                    <p>{content}</p>
                                </>),
                            footer: <button onClick={() => alert('react composition')}>确认</button>
                        }
                    

                    )}
                </Dialog>
            </div>
        )
    }
}
