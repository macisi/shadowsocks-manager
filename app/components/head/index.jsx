import React from 'react';

const MenuConfig = [
  {
    name: 'Status',
    path: '/',
  },
  {
    name: 'Control',
    path: '/control',
  },
  {
    name: 'Console',
    path: '/console',
  },
];

export default class Head extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header className="head">
        <h1 className="brand">Shadowsocks Manager</h1>
        <nav className="menu-wrapper">
          <ul className="menu">
            {
              MenuConfig.map((menu, i) => {
                return <li key={i}><a href={menu.path} className="item">{menu.name}</a></li>;
              })
            }
          </ul>
        </nav>
      </header>
    );
  }
}
