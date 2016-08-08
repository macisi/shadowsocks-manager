import React from 'react';
import ReactDOM from 'react-dom';
import ajax from '@fdaciuk/ajax';
import Head from '../../components/head/index.jsx';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.toggleServer = this.toggleServer.bind(this);
    this.state = {
      status: 'stoped',
    };
  }
  componentWillMount() {
    this.getServerStatus();
  }
  getServerStatus() {
    ajax().get('/api/server/status')
      .then((res) => {
        if (!res.hasError && res.content.status) {
          this.setState({
            status: res.content.status,
          });
        }
      });
  }
  toggleServer() {
    let actionUrl;
    if (this.state.status === 'started') {
      actionUrl = '/api/server/stop';
    } else {
      actionUrl = '/api/server/start';
    }
    ajax().get(actionUrl)
      .then((res) => {
        if (!res.hasError) {
          this.setState({
            status: res.content.status,
          });
        } else {
          alert(res.errorMsg);
        }
      });
  }
  render() {
    let buttonText;
    if (this.state.status === 'started') {
      buttonText = 'Stop Server';
    } else {
      buttonText = 'Start Server';
    }
    return (
      <div>
        <Head />
        <button onClick={this.toggleServer}>{buttonText}</button>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('J_Content'));
