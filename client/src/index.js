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
    this.onInvalidUrl = this.onInvalidUrl.bind(this);
  }

  onGenerate(smartUrl) {
    this.setState({smartUrl})
  }

  onInvalidUrl(res) {
    alert(res.data);
  }

  render() {
    return (
      <div>
        <TargetUrlForm onGenerate={this.onGenerate} onInvalidUrl={this.onInvalidUrl} />
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
