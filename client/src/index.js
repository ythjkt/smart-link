import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TargetUrlForm from './components/TargetUrlForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      smartUrl: ''
    }

    this.onGenerate = this.onGenerate.bind(this);
  }

  onGenerate(smartUrl) {
    this.setState({smartUrl})
  }

  render() {
    return (
      <div>
        <TargetUrlForm onGenerate={this.onGenerate}/>
        <SmartUrl smartUrl={this.state.smartUrl} />
      </div>
    )
  } 
}

const SmartUrl = (props) => {
  return (
    <div>
      <a href={`http://${props.smartUrl}`}>{props.smartUrl}</a>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
