import React, { Component } from 'react';

class LifeCircle extends Component {
    constructor(props) {
        console.log('constructor: ');
        super(props);
        this.state = {
            list: "0"
        }
    }

    componentDidMount(){
        console.log("componentDidMount");
        this.setState({
            list: "1"
        })
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        console.log("getDerivedStateFromProps");
        // console.log('nextProps nextState: ', nextProps, nextState);
        if(nextState.list !== nextProps.list){
           return {
               list: nextProps.list
           }
        }
        

    }

   getSnapshotBeforeUpdate(prevProps, prevState){
       console.log('getSnapshotBeforeUpdate');
        // if(prevProps.list.length < this.props.list.length){
        //     const list = this.listRef.current
        //     return list.scrollHeight - list.scrollTop
        // }
        return null
   }

//    shouldComponentUpdate(){
//        console.log('shouldComponentUpdate');
//        return true
//    }

   componentDidUpdate(prevProps, prevState, snapShot){
       console.log("componentDidUpdate");
    //    setTimeout(()=> {
        // this.setState({
        //     list : 'after did Update'
        // })
    //    }, 1000)
   }

    render() { 
        console.log('render', this.state.list);
        return ( 
            <div ref={this.listRef}></div>
         );
    }
}
 
export default LifeCircle;