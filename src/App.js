import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    isLoading: false,
    data: null
  }

  // 使用setState的异步回调函数
  // fetchDate () {
  //   this.setState({
  //     isLoading: true
  //   }, () => {
  //     fetch('https://api.github.com/users/mojombo')
  //       .then(response => response.json())
  //       .then(data => {
  //         setInterval(() => {
  //           this.setState({
  //             data,
  //             isLoading: false
  //           });
  //         }, 3000);
  //       });
  //   })
  // }

  // 用Promise对象封装的setState方法
  // fetchDate () {
  //   this.setStateAsync({isLoading: true})
  //     .then(() => {
  //       fetch('https://api.github.com/users/mojombo')
  //         .then(res => res.json())
  //         .then(data => {
  //           setInterval(() => {
  //             this.setState({
  //               data,
  //               isLoading: false
  //             });
  //           }, 3000);
  //         });
  //     });
  // }
  
  // 用Promise对象封装setState方法
  setStateAsync = (state) => {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async fetchDate () {
    await this.setStateAsync({ isLoading: true });
    let res = await fetch('https://api.github.com/users/mojombo');
    let data = await res.json();
    setInterval(() => {
      this.setStateAsync({ data, isLoading: false});
    }, 3000);
  }

  render() {
    let { isLoading, data } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h3>welcome to react world</h3>
        </header>
        <button type="button" onClick={this.fetchDate.bind(this)}>获取数据</button>
        {
          isLoading ? <p>加载中...</p> : (<div>
            {
              data === null ? <p>暂无数据</p> : (<div>
                <ul>
                  <li>姓名：{data.login}</li>
                  <li>博客：{data.blog}</li>
                  <li>加入时间：{data.created_at}</li>
                </ul>
              </div>)
            }
          </div>)
        }
        
      </div>
    );
  }
}

export default App;
