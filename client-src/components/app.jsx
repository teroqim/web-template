import React from 'react'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <div className='main' id='main'>
        <div className='header'>
          <h1>Template</h1>
          <h2>This is a template for web projects using webpack, node and react</h2>
        </div>
      </div>
    )
  }
}

export default App
