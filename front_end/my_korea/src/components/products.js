// Defines the individual product page based on the product clicked

import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import ReviewGrid from './reviewgrid';
import { Form, Input, Button } from 'antd';

import UserContext from '../contexts/user';

const { Title, Paragraph } = Typography;

const formItemLayout = {
  wrapperCol: { span: 2 }
};

/* Defines the individual product page and adds all reviews for current product
  Also checks user context, if user present, user can fulfil Buy order. 
  The form allows a logged in user to define quantity and buy, creating order */
function Product(props) {
  const [product, setProduct] = useState(undefined);
  const { user } = useContext(UserContext);

  // Creates order if a user is logged in. Rejects if not logged in.
  const onFinish = (values) => {
    if (!user.password) {
      alert("You need to be logged in to make an order.");
    }
    const idString = props.match.params.id;
    const id = parseInt(idString);
    const { quantity} = values; 

    const newQuantity = parseInt(quantity);
    const totalPrice = newQuantity * product.productPrice; // calculate total price
    const roundedPrice = parseFloat(totalPrice.toFixed(2));
    let order = {

      productID: id, 
      userID: user.ID,
      username: user.username.toString(),
      quantity: newQuantity,
      productPrice: product.productPrice,
      totalPrice: roundedPrice
    };

    const { confirm, ...data } = order;

    // POST API request for creating an order
    fetch('https://veronaparking-westernorinoco-3000.codio-box.uk/myKorea/orders', {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 
        'Content-Type' : 'application/json',
        'Authorization' : "Basic " + btoa(user.username + ":" + user.password) 
        }
    })
      .then(status)
      .then(json)
      .then(data => {
        console.log(data);
        alert("Checkout Successful! Your order number is: " + data.ID + 
              "\nYou can view your order on your account page.")
      })
      .catch(err => {
        alert("Error completing order");
      });
  };

  useEffect(() => {
    const id = props.match.params.id;
    fetch(`https://veronaparking-westernorinoco-3000.codio-box.uk/myKorea/products/${id}`)
      .then(status)
      .then(json)
      .then(product => {
        setProduct(product);
      })
      .catch(err => {
        console.log(`Fetch error for product ${id}`);
      });
  }, [props.match.params.id]);

  if (!product) {
    return <h3>Loading post...</h3>;
  }

  return (
    <div>
      <Row type="flex" justify="space-around" align="middle">
        <Col span={12} align="center">
          <Image width={500} height={500} alt="Product" src={product.imageURL} />
        </Col>
        <Col span={12}>
          <Title>{product.title}</Title>
          <Paragraph>{product.description}</Paragraph>
          <br />
          <p>Product Price: £{product.productPrice}</p>
          <br />
          <Form name="buy" onFinish={onFinish}>
            <Form.Item {...formItemLayout} name="quantity" label="Quantity">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Buy
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span={24}>
          <ReviewGrid />
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Product);
