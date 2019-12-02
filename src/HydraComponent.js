import React from 'react'
//import Hydra from 'hydra-synth'
import repl from './repl.js'

export default class HydraComponent extends React.Component {
  constructor() {
         super();
         this.dome = null
     }

     componentDidMount () {
       this.hydraCanvas.width = window.innerWidth
       this.hydraCanvas.height = window.innerHeight
       this.hydra  = new window.Hydra({
          canvas: this.hydraCanvas
        })
        repl.eval(`render()`)
        this.props.channels.forEach((history, index) => {
          if(history.length > 0) {
            repl.eval(`${history[history.length - 1].code}.out(o${index})`)
          }
        })
       // this.dome = Dome(this.threeRootElement)
       // this.dome.triggerAnimation(5, this.props.domeState)
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
       // console.log('comp did update', prevProps, this.props)
       // if(prevProps.domeState !== this.props.domeState) {
       //   this.dome.triggerAnimation(5, this.props.domeState)
       // }
     }

     render() {

         return (
             <canvas className="fixed pin-t pin-l w-full h-full" style={{zIndex:0}} ref={element => this.hydraCanvas = element} />
         );
     }
 }
