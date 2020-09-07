import React, { Component } from 'react';
const context = React.createContext({counter: 0})
const { Provider, Consumer } = context


const Child = (props) => {
    return (
        <div onClick={props.add}>{props.counter}</div>
    );
}


class ContextTest extends Component {
    state = {
        counter: 0
    }
    add = () => {
        console.log(111);
        this.setState(
            {counter : this.state.counter +1}
        )
    }
    render() {
        return (
            <Provider value={{ counter: this.state.counter, add: this.add }}>
                <Consumer>
                    {(value) => <Child {...value}/>}
                </Consumer>
                <Consumer>
                    {(value) => <Child {...value}/>}
                </Consumer>
                <Consumer>
                    {(value) => <Child {...value}/>}
                </Consumer>
            </Provider>
        );
    }
}

export default ContextTest;