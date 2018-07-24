import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export default class Header extends Component {
  static PropTypes = {
    list: PropTypes.array,
    isLogin: PropTypes.bool,
    handleLogin: PropTypes.func,
  };
  static defaultProps = {
    list: [{ name: 'Q&A', to: '/' }, { name: 'code', to: '/gitlist' }],
    isLogin: false,
    handleLogin: () => {},
  };
  state = {
    activeItem: 'Q&A',
  };
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };
  render() {
    const { list, isLogin, handleLogin } = this.props;
    const { activeItem } = this.state;
    return (
      <Menu tabular>
        {list.map(item => {
          return (
            <Menu.Item
              key={item.name}
              as={Link}
              to={item.to}
              name={item.name}
              active={activeItem === item.name}
              onClick={this.handleItemClick}
            />
          );
        })}
        <Menu.Menu position="right">
          <Menu.Item name={isLogin ? 'logout' : 'login'} onClick={handleLogin} />
        </Menu.Menu>
      </Menu>
    );
  }
}
