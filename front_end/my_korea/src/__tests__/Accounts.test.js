import React from 'react';
import { render, screen} from '@testing-library/react';
import UserContext from '../contexts/user';
import Account from '../components/accounts';

describe('Account component', () => {

  test('renders "Please log in" message when user is not logged in', () => {
    const user = {
      loggedIn: false,
    };

    render(
      <UserContext.Provider value={{ user }}>
        <Account />
      </UserContext.Provider>
    );

    expect(screen.getByText('Please log in')).toBeInTheDocument();
  });
});
