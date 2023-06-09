import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import Nav from './components/nav';
import Home from './components/home';
import Account from './components/accounts';
import Products from './components/products';
import Login from './components/login';
import Register from './components/register';

import UserContext from './contexts/user';

const { Header, Content, Footer } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {loggedIn: false}
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(user) {
    console.log("User is now being set on the context");
    user.loggedIn = true;
    this.setState({user:user});
  }

  logout() {
    console.log("Removing user from the app context");
    this.setState({user: {loggedIn:false}});
  }

  render () {
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout
    };

    return (
      <Layout className="layout">
        <UserContext.Provider value={context}>
          <Router>
            <Header>
              <Nav />
            </Header>

            <Content>
              <Switch>
                <Route path='/account' children={<Account />} />
                <Route path='/products/:id' children={<Products />} />
                <Route path='/login' children={<Login />} />
                <Route path='/register' children={<Register />} />
                <Route path='/' children={<Home />} />
              </Switch>
            </Content>

            <Footer style={{ textAlign: 'center' }}>My Korea</Footer> 
          </Router>
        </UserContext.Provider>
      </Layout>
    );
  }
}

export default App;