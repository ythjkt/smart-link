import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TargetUrlForm from './components/TargetUrlForm';
import LinkList from './components/LinkList';
import SmartLinkService from './services/smartLinkService'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      smartUrl: '',
      links: []
    }

    this.smartLinkService = new SmartLinkService();
    
    // bind
    this.onGenerate = this.onGenerate.bind(this);
    this.onInvalidUrl = this.onInvalidUrl.bind(this);
    this.getAllLinks = this.getAllLinks.bind(this);
    this.onDelete = this.onDelete.bind(this);

    // Initial link fetch
    this.getAllLinks();
  }

  onDelete(event) {
    this.smartLinkService.delete(event.target.id, () => {
      this.getAllLinks();
    });
  }

  getAllLinks() {
    this.smartLinkService.all((res) => {
      if (res) {
        this.setState({links: res})
      }
    })
  }

  onGenerate(smartUrl) {
    this.setState({smartUrl});
    this.getAllLinks();
  }

  onInvalidUrl(res) {
    alert(res.data);
  }

  render() {
    return (
      <div>
        <TargetUrlForm onGenerate={this.onGenerate} onInvalidUrl={this.onInvalidUrl} />
        <SmartUrl smartUrl={this.state.smartUrl} />
        <LinkList links={this.state.links} onDelete={this.onDelete} />
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
