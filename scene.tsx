import * as DCL from 'metaverse-api'

// This is an interface, you can use it to enforce the types of your state
export interface IState {
  isDoorClosed: boolean
  spinning : number
}

export default class HouseScene extends DCL.ScriptableScene<any, IState> {
  // This is your initial state and it respects the given IState interface
  state = {
    isDoorClosed: false,
    spinning : 0.0
  }

  sceneDidMount() {

   setInterval(() => { this.setState({spinning: Date.now()*(1/60) / (2*Math.PI)})}, 16)

    this.eventSubscriber.on('door_click', () => {
      // setState() will update the state and trigger an update, causing the scene to rerender
      this.setState({ isDoorClosed: !this.state.isDoorClosed })
    })
  }



  async render() {
    const doorRotation = {
      x: 0,
      y: this.state.isDoorClosed ? 0 : 90,
      z: 0
    }

    return (
      <scene position={{ x: 5, y: 0, z: 5 }}>
        <entity rotation={doorRotation} transition={{ rotation: { duration: 10000, timing: 'ease-in' } }}>
          <box id="door" scale={{ x: 1, y: 2, z: 0.05 }} position={{ x: 0.5, y: 1, z: 0 }} color="#00FF00" />
        </entity>
        <box position={{ x: 2, y: 1, z: 0 }} scale={{ x: 2, y: 2, z: 0.05 }} color="#0000FF" />
        <box position={{ x: -1, y: 1, z: 0 }} scale={{ x: 2, y: 2, z: 0.05 }} color="#0000FF" />
        <box rotation={{ x: 0, y: this.state.spinning*180/Math.PI, z:0 }} 
             position={{ x: Math.sin(this.state.spinning)*4.0, y:4, z: Math.cos(this.state.spinning)*4.0 }}
             scale={{ x: 1, y: 1, z: 0.05 }} color="#FF00FF" /> 
      </scene>
    )
  }
}
