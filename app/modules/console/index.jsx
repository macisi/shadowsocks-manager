import React from 'react';
import ReactDOM from 'react-dom';
import reactCSS from 'reactcss';
import ajax from '@fdaciuk/ajax';
import Head from '../../components/head/index.jsx';
import Nes from 'nes/client';
import './index.less';

const MaxLogLines = 50;

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
    };
  }
  componentDidMount() {
    const client = new Nes.Client('ws://localhost:3000');
    client.connect(() => {
      client.subscribe('/api/console', (update) => 
      {
        let logs = this.state.logs;
        logs.push(update.content);
        if (logs.length > MaxLogLines) {
          // console.log(logs.length - MaxLogLines);
          logs = logs.splice(logs.length - MaxLogLines);
        }
        this.setState({
          logs,
        });
      }, (err) => {
        console.log(err);
      });  
    });
  }
  render() {
    return (
      <div>
        <Head />
        <div className="console">
          <ul className="line-wrapper">
          {
            this.state.logs.map((log, i) => {
              return <li className="line" key={i}><span className="line-number">{i + 1}.</span>{log}</li>;
            })
          }
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Console />, document.getElementById('J_Content'));
