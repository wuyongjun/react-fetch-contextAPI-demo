import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// fetch交互案例在app.js文件中，跨域可以使用别人封装的库---fetch-jsonp

// context api v16.3.0后添加，用于统一管理状态，实现跨组件间的状态管理和修改
let { Provider, Consumer } = createContext();

// 提供一个统一管理状态的组件
class ProviderComponent extends React.Component {

    state = {
        name: 'mike',
        age: 20
    }

    changeAge = (age) => {
        this.setState({age});
    }

    render () {
        return (
            // 此处value名字为固定 redux此处的属性值可能是store
            <Provider value={{
                state: this.state,
                changeAge: this.changeAge
            }}>
                {this.props.children}
            </Provider>
        );
    }
}

class Child extends React.Component {
    constructor (props) {
        super(props);
    }

    state = {
        chlidName: 'lily',
        age: 18
    }

    changeAge (ev) {
        this.setState({age: ev.target.value})
    }

    keySend = (fn, ev) => {
        if (ev.which === 13) {
            fn(this.state.age);
        }
    }

    render () {
        return (<div>
            {/* 此处为固定写法 */}
            
            <Consumer>
                {
                    (value) => {
                        return (<div>
                            <h3>{JSON.stringify(value)}</h3>
                            {/* <button onClick={() => value.changeAge(this.state.age)}>更改年龄</button> */}
                            <input type="text" value={this.state.age} onChange={this.changeAge.bind(this)} 
                                onKeyDown={(ev) => this.keySend(value.changeAge, ev)} />
                        </div>);
                    }
                }
            </Consumer>
        </div>);
    }
}

class Child2 extends React.Component {
    render () {
        return(<div>
            <Consumer>
                {
                    (value) => (<h2>age: {value.state.age}</h2>)
                }
            </Consumer>
        </div>)
    }
}

class App extends React.Component {
    render () {
        return (<div>
            <h3>hello react</h3>
            <Child></Child>
            <Child2></Child2>
        </div>);
    }
}


ReactDOM.render((<ProviderComponent>
    <App />
</ProviderComponent>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
