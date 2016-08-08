import React from 'react';
import reactCSS from 'reactcss';

const MenuConfig = [
  {
    name: 'Status',
    path: '/',
  },
  {
    name: 'Control',
    path: '/control',
  },
];

export default class Head extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const styles = reactCSS({
      'default': {
        head: {
          display: 'flex',
          flexDirection: 'row',
          height: 80,
        },
        brand: {

        },
        menuWrapper: {
        },
        menu: {
          padding: 0,
          display: 'flex',
          flexDirection: 'row',
          listStyle: 'none',
        },
        item: {
          
        },
      },
    });
    return (
      <header style={styles.head}>
        <h1 style={styles.brand}>Shadowsocks Manager</h1>
        <nav style={styles.menuWrapper}>
          <ul style={styles.menu}>
            {
              MenuConfig.map((menu, i) => {
                return <li key={i}><a href={menu.path} style={styles.item}>{menu.name}</a></li>;
              })
          }
          </ul>
        </nav>
      </header>
    );
  }
}
