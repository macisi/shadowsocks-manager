import React from 'react';

const assetsExt = process.env.NODE_ENV === 'production' ? '.min.js' : '.js';

class Layout extends React.Component {
  render() {
    const { pageName } = this.props;
    return (
      <html lang="en">
        <head>
          <title>title</title>
          <link rel="stylesheet" href="/assets/style/app.css" />
          <link rel="stylesheet" href={`/assets/style/${pageName}.css`} />
          <script src={`//cdn.bootcss.com/react/15.3.0/react-with-addons${assetsExt}`} />
          <script src={`//cdn.bootcss.com/react/15.3.0/react-dom${assetsExt}`} />
        </head>
        <body>
          <div id="J_Content" />
          <div
            dangerouslySetInnerHTML={{ __html: this.props.children }}
          />
          <script src={`/assets/scripts/${pageName}.js`}></script>
        </body>
      </html>
    );
  }
}

module.exports = Layout;