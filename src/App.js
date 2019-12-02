import React from 'react';
import Channel from './Channel.js'
import Landing from './Landing.js'
//import LogHandler from './LogHandler.js'
import Hydra from './HydraComponent.js'
import repl from './repl.js'


export default class App extends React.Component {
  state = {
    user: '',
    showLanding: true,
    color: `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
    channels: [ [], [], [] ]
  };

//  handle

// handleClick = buttonName => {
// //  this.setState(calculate(this.state, buttonName));
// };,

componentDidMount = () => {
  this.log = new window.LogHandler()
  this.log.on('log history', (logs) => {
  //  console.log('got history', logs)
    let channelHistory = this.state.channels.map( (ch, index) => logs.filter((el) => el.channel===index).reverse())
     console.log('LOG HISTORY', channelHistory)
    this.setState({ channels: channelHistory })
    channelHistory.forEach((history, index) => {
      if(history.length > 0) {
        repl.eval(`${history[history.length - 1].code}.out(o${index})`)
      }
    })
  })
//  this.log.appendToLog('TESTING')
}

closeIntro = () => {
  this.setState({ showLanding: false})
}

updateUser = e => { this.setState({ user: e.target.value})}

render() {
  console.log('log is', this.log)
  let inner = null
  if (this.state.showLanding) {
    inner = <Landing user={this.state.user} closeIntro={this.closeIntro} updateUser={this.updateUser} color={this.state.color}/>
  } else {
    inner =  <div className="flex fixed h-full bottom-0 w-full">
         {this.state.channels.map((channel, index) => <Channel history={channel} key={index} index={index} user={this.state.user} color={this.state.color} log={this.log}/>)}
      </div>
  }
  return <div className = "main bg-black text-white font-mono h-screen w-screen">
      <Hydra channels= {this.state.channels}/>
      {inner}
    </div>
}
}
