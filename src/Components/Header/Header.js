import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Text from '../Text/Text';
export default class Header extends Component {
  static propTypes = {
    list: PropTypes.array,
    isLogin: PropTypes.bool,
    user: PropTypes.shape({
      passcode: PropTypes.string,
      displayName: PropTypes.string,
      imgSrc: PropTypes.string,
    }).isRequired,
  };
  static defaultProps = {
    list: [{ name: 'Q&A', to: '/main/qa' }, { name: 'Code', to: '/main/code' }],
    isLogin: true,
  };

  state = {
    activeItem: 'Q&A',
    redirect: false,
  };

  componentDidMount() {
    const path = this.props.pathName;
    if (path === '/main/code') {
      this.setState({ activeItem: 'Code' });
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleLogin = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { list, isLogin, user } = this.props;
    const { activeItem, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
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
          <Menu.Item>
            <Text color="white">
              <Icon size="small" name="user" /> {user.displayName}
            </Text>
          </Menu.Item>
          <Menu.Item name={isLogin ? 'logout' : 'login'} onClick={this.handleLogin} />
        </Menu.Menu>
      </Menu>
    );
  }
}
