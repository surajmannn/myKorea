// order card instances

import React from 'react';
import { Card } from 'antd'; 

// Renders the order cards to be used displaying defined details of the order
class OrderCard extends React.Component { 
    
    render() {
        return ( 
            <Card
                style={{ width: 250 }}>
                <h1>Order No: {this.props.ID}</h1> 
                <p>Product ID: {this.props.productID}</p> 
                <p>Username: {this.props.username}</p>
                <p>Order Date: {this.props.dateOrdered}</p>
                <p>Quantity: {this.props.quantity}</p>
                <p>Product Price: £{this.props.productPrice}</p>
                <p>Order Total: £{this.props.totalPrice}</p>
            </Card>
        ); 
    }
}

export default OrderCard;