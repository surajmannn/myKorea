import React from 'react';
import { Col, Row } from 'antd'; 
import OrderCard from './ordercard';
import { status, json } from '../utilities/requestHandlers';
import { withRouter } from 'react-router';
import UserContext from '../contexts/user';

// Sets the product card grid for as many instances present in data
class OrderGrid extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = { 
            orders: []
        } 
    } 

    // Fetch products data from API
    componentDidMount() {
        const user = this.context.user;
        let headers = new Headers();
        let id = this.context.user.id;
        console.log("ID: ", id);
        headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));
        console.log("headers: ", headers);
        fetch(`https://veronaparking-westernorinoco-3000.codio-box.uk/myKorea/users/${id}/orders`, {headers:headers})
        .then(status)
        .then(json)
        .then(data => {
          this.setState({ orders: data })
          console.log(data);
        })
        .catch(err => console.log("Error fetching reviews", err));
    }

    render() {
        if (!this.state.orders.length) {
            return <h3>No orders yet...</h3>
        } 
        // the next line does the Array.map() operation on the products 
        // to create an array of React elements to be rendered 
        const orderList = this.state.orders.map(order => {
            return (
                <div style={{padding:"10px"}} key={order.userID}>
                    <Col span={6}>
                        <OrderCard {...order} />
                    </Col>
                </div>
            )
        }); 
        return (
            <Row type="flex" justify="space-around"> 
                {orderList}
            </Row>
        );
    }
}

OrderGrid.contextType = UserContext;

export default withRouter(OrderGrid);