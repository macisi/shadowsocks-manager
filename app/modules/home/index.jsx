import React from 'react';
import ReactDOM from 'react-dom';
import ajax from '@fdaciuk/ajax';
import Head from '../../components/head/index.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    ajax().get('/api/server/status')
      .then((res) => {
        console.log(res);
      });
  }
  render() {
    return (
      <div>
        <Head />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('J_Content'));
