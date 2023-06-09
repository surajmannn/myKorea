import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { Redirect } from 'react-router-dom';
import { PageHeader } from '@ant-design/pro-layout';

// form design layout
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } }, 
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const usernameRules = [
    { required: true, message: 'Please input your username!', whitespace: true }
];


/**
* login form component for app login.
*/
class LoginForm extends React.Component {


    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    state = {redirect: null}

    static contextType = UserContext;

    login(values) {
        const {username, password} = values;
        console.log(`logging in user: ${username}`)
        fetch('https://veronaparking-westernorinoco-3000.codio-box.uk/myKorea/users/login', {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            }        
        })
        .then(status)
        .then(json)
        .then(user => {
            console.log('Logged in successfully');
            console.log(user);
            user.password = password;  // store in context for future API calls
            this.context.login(user);
            this.setState({redirect:'/'});
        })
        .catch(error => {
            // TODO: show nicely formatted error message
            console.log('Login failed');
        });  
    }

    render() { 
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (

            <Form {...formItemLayout} name="login" onFinish={this.login} scrollToFirstError>
                <PageHeader title="Login Form"/>
                <br/>
                <Form.Item name="username" label="Username" rules={usernameRules}>
                    <Input /> 
                </Form.Item>

                <Form.Item name="password" label="Password" rules={passwordRules}> 
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button> 
                </Form.Item>
            </Form>
        );
    };
};

export default LoginForm;