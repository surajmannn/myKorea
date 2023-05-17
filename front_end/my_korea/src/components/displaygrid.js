import React from 'react';
import { Col, Row } from 'antd'; 
import ProductCard from './productcard';
import { status, json } from '../utilities/requestHandlers';

// Sets the product card grid for as many instances present in data
class DisplayGrid extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = { 
            products: []
        } 
    } 

    // Fetch products data from API
    componentDidMount() {
        fetch('https://veronaparking-westernorinoco-3000.codio-box.uk/myKorea/products')
        .then(status)
        .then(json)
        .then(data => {
          this.setState({ products: data })
        })
        .catch(err => console.log("Error fetching products"));
    }

    render() {
        if (!this.state.products.length) {
            return <h3>Loading products...</h3>
        } 
        // the next line does the Array.map() operation on the products 
        // to create an array of React elements to be rendered 
        const cardList = this.state.products.map(product => {
            return (
                <div style={{padding:"10px"}} key={product.ID}>
                    <Col span={8}>
                        <ProductCard {...product} />
                    </Col>
                </div>
            )
        }); 
        return (
            <Row type="flex" justify="space-around"> 
                {cardList}
            </Row>
        );
    }
}

export default DisplayGrid;