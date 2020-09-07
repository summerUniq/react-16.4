import React, { Component } from 'react';
const context = React.createContext({ counter: 0 })
const { Provider, Consumer } = context

// 接受consumer返回一个高阶组件
function withConsumer(Consumer) {
    return (Comp) => (props) => (<Consumer>{(value) => (<Comp {...value} {...props} />)}</Consumer>)
}


const Child = (props) => {
    return (
        <div onClick={props.add}>{props.counter + "  " + (props.name || "")}</div>
    );
}

const ChildHoc = withConsumer(Consumer)(Child)

class ContextTest extends Component {
    state = {
        counter: 0
    }
    add = () => {
        console.log(111);
        this.setState(
            { counter: this.state.counter + 1 }
        )
    }
    render() {
        return (
            <Provider value={{ counter: this.state.counter, add: this.add }}>
                <ChildHoc name="first" />
                <ChildHoc />
                <ChildHoc />
            </Provider>
        );
    }
}

export default ContextTest;