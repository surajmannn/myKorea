import React from 'react';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import { Col, Row } from 'antd';
import OrderGrid from './ordergrid';

/* Takes current User context and displays Users Details.
  Also displays all the users orders to their account page from the OrdereGrid File*/
function Account(props) {
  const context = useContext(UserContext);
  const user = context.user;
  console.log("current user in UserContext is", user);

  const [profile, setProfile] = React.useState({});

  if (!user.loggedIn) {
    return "Please log in"
  }

  if (!profile.username) {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

    fetch(user.links.self, {headers:headers})
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.text());
      }
    })
    .then(data => {
      console.log(data);
      setProfile(data);
    })
    .catch(err => console.error(err));
  }

  return (
    <div>
      <Row type="flex" justify="space-around" align="middle">
        <Col span = {8}>
          <h1>Account</h1>
          {Object.keys(profile).map(key => <li key={key}>{key}: {profile[key]}</li>)}
        </Col>
      </Row>
      <br/>
      <Row type="flex" justify="space-around" align="middle">
        <h1>Your Orders:</h1>
      </Row>
      <br/>
      <Row type="flex" justify="space-around">
          <Col span={24}>
            <UserContext.Provider value={{ user: { id: user.ID, username: user.username, password: user.password } }}>
              <OrderGrid />
            </UserContext.Provider>
          </Col>
        </Row> 
    </div>
  );
}

export default Account;