import React from 'react';

const assetsExt = process.env.NODE_ENV === 'production' ? '.min.js' : '.js';

class Layout extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <title>title</title>
          <link rel="stylesheet" href="/assets/normalize.css" />
          <script src={`//cdn.bootcss.com/react/15.3.0/react-with-addons${assetsExt}`} />
          <script src={`//cdn.bootcss.com/react/15.3.0/react-dom${assetsExt}`} />
        </head>
        <body>
          <div id="J_Content" />
          <div
            dangerouslySetInnerHTML={{ __html: this.props.children }}
          />
        </body>
      </html>
    );
  }
}

module.exports = Layout;