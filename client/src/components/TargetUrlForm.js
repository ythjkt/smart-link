import React, { Component } from 'react';
import SmartLinkService from '../services/smartLinkService';

export default class TargetUrlForm extends Component {
  constructor(props) {
    super(props);
    this.smartLinkService = new SmartLinkService();
    
    this.state = {
      targetUrl: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({targetUrl: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();

    //Update in database
    this.smartLinkService.post(
      this.state.targetUrl,
      (res) => {
        if (!res) {
          this.props.onGenerate(res.data.smartLink);
        } else {
          this.props.onInvalidUrl(res);
        }
      }
    );
  }

  render() {
    return (
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div className="panel panel-default">
              <div className="panel-body">
              <p>Target URL</p>
                <input
                  type="text"
                  value={this.state.targetUrl}
                  onChange={this.onChange}
                  />
              </div>
              <div>
                <button type="submit" >Generate</button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}
