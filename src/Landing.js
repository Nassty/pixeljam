import React from 'react';

//import Terminal from 'terminal-in-react';
import ReactTerminal from 'react-terminal-component';

export default class Landing extends React.Component {
  // render() {
  //   return (
  //     <div  className="fixed w-full">>
  //       <ReactTerminal/>
  //     </div>
  //   );
  // }
  //state =

//<span>.out({this.props.name})</span>

componentDidUpdate(prevProps, prevState) {
  console.log('update')
 this.userInput.focus()
 }

 componentDidMount(prevProps, prevState) {
   console.log('update')
  this.userInput.focus()
  }
  render() {
    return (
      <div className="fixed w-full h-full flex items-center justify-center h-screen">
        <div className="fixed bg-black p-16 w-2/3 ">
           <div>WELCOME TO PIXELJAM</div>
           <div>This is a collaborative REPL for hydra synth.</div>
           <div>There are three channels or buffers that are changed by writing code in the text boxes beneath them.</div>
           <div>Pressing 'Enter' executes the code.</div> 
           <form onSubmit={this.props.closeIntro}>
             <div>
                To join, enter your name:
              </div>
              <input autoFocus style={{borderColor: this.props.color}} ref={(input) => {this.userInput = input}} className="appearance-none border-solid border-2 border-white bg-black" type="text" value={this.props.user} onChange={this.props.updateUser} />

              <div><input type="submit" value="START" /></div>
            </form>
        </div>
      </div>
    );
  }

// this.props.closeIntro
  //   <span className="mr-4" style={{color:this.props.color}}>$</span>
  //    <span className="text-teal">{this.props.user}$</span>
  // showMsg = () => 'Hello World'
  //
  // render() {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh"
  //       }}
  //     >
  //       <Terminal watchConsoleLogging
  //         color='green'
  //         backgroundColor='black'
  //         barColor='black'
  //         style={{ fontWeight: "bold", fontSize: "1em" }}
  //         commands={{
  //           'open-google': () => window.open('https://www.google.com/', '_blank'),
  //           showmsg: this.showMsg,
  //           popup: () => alert('Terminal in React')
  //         }}
  //         descriptions={{
  //           'open-google': 'opens google.com',
  //           showmsg: 'shows a message',
  //           alert: 'alert', popup: 'alert'
  //         }}
  //         msg='WELCOME TO PIXELJAM'
  //       />
  //     </div>
  //   );
  // }
}
