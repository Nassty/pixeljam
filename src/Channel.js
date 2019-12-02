import React from 'react';
import repl from './repl.js'

export default class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      log: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.addToLog = this.addToLog.bind(this);
    this.onLogClick = this.onLogClick.bind(this)
    this.onChannelClick = this.onChannelClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.log.on(`append${this.props.index}`, (msg) => {
    //  console.log('RECEIVED MESSAGE', msg)
      this.setState({
        log: this.state.log.concat(msg)
      })
      repl.eval(`${msg.code}.out(o${this.props.index})`)
    })
     // Call our fetch function below once the component mounts
   // this.callBackendAPI()
   //   .then(res => console.log(res))
   //   .catch(err => console.log(err));
   if(this.props.history.length > 0) {
     repl.eval(`${this.props.history[this.props.history.length - 1].code}.out(o${this.props.index})`)

   }
   setTimeout( () => {
     this.codeInput.focus()
     console.log('focusing input')
   }, 1000)
 }

 componentDidUpdate(prevProps, prevState) {
   console.log('update')
   this.messagesEnd.scrollIntoView({ behavior: "smooth" })
  //setTimeout(() => this.codeInput.focus(), 100)
  }

 //  callBackendAPI = async () => {
 //   const response = await fetch('/ping');
 //   const body = await response.json();
 //
 //   if (response.status !== 200) {
 //     throw Error(body.message)
 //   }
 //   return body;
 // };

  handleChange(event) {
    this.setState({code: event.target.value})
  }


  addToLog() {
  //  console.log(code)
    var msg = { user: this.props.user, code: this.state.code, date: Date.now(), channel: this.props.index, color: this.props.color}
    this.setState({
      log: this.state.log.concat(msg)
    })
    repl.eval(`${msg.code}.out(o${this.props.index})`)
    this.props.log.appendToLog(msg)
  }

  onLogClick(contents, val) {
  //  console.log(contents, val, 'TRIGGERED CLICK', this.codeInput)
   this.setState({code: contents.code})
  //  setTimeout( () => this.codeInput.focus(), 200)
  }

  onChannelClick() {
    console.log('channel click')
    setTimeout(() => this.codeInput.focus(), 100)
  }

  onKeyPressed(e) {
    // console.log(e)
    //   this.codeInput.focus()
    // if (e.keyCode === 13) {
    //   this.addToLog()
    // //  if (e.ctrlKey) this.addToLog()
    // //  if (e.altKey) this.addToLog()
    // }
    // console.log(e.ctrlKey, e.keyCode);
  }

  handleSubmit(event) {
    event.preventDefault()
    this.addToLog()
  }
//<span>.out({this.props.name})</span>
  render() {
    return (
      <div onKeyDown={this.onKeyPressed} onMouseDown={this.onChannelClick} className="w-1/3 h-full flex">
        <div className ="h-56 p-4 pt-8 bg-black self-end w-full break-all">
          <div className="h-40 overflow-y-auto">
          {this.props.history.map((el, index) =>
            <div className="text-sm" key={index} onMouseDown={this.onLogClick.bind(null, el)}>
               <span style={{color: el.color}}>{el.user}: </span>{el.code}
           </div> )}
             {this.state.log.map((el, index) =>
               <div className="text-sm" key={index} onMouseDown={this.onLogClick.bind(null, el)}>
                  <span style={{color: el.color}}>{el.user}: </span>{el.code}
              </div> )}
              <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>
          <div className="flex">
            <span style={{color: this.props.color}} className="mr-3"> {this.props.user}:</span>
             <form onSubmit={this.handleSubmit}>
             <input autoFocus
               ref={(input) => { this.codeInput = input }}
               className="bg-black font-mono"
               type="text"
               value={this.state.code}
               placeholder='Type code here and press <Enter>'
               onChange={this.handleChange} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// <input autoFocus
//   ref={(input) => { this.codeInput = input }}
//   className="bg-black font-mono"
//   type="text"
//   value={this.state.code}
//   placeholder='Type code here and press Enter to edit buffer o0'
//   onChange={this.handleChange} />
//onMouseDown={this.onLogClick.bind(null, el)}
