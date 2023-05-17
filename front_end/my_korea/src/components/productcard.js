// Product card instances

import React from 'react';
import { Card } from 'antd'; 
import ProductIcon from './producticon'; 
import NavImage from './navimage';
const { Meta } = Card;

/* This class creates render for product cards with 
    product Image, Amount of reviews as message icon, and its average rating */
class ProductCard extends React.Component { 
    
    render() {
        const productID = this.props.ID;
        return ( 
            <Card
                style={{ width: 450}}
                cover={<NavImage alt={`Product ${productID}`} src={this.props.imageURL} to={`/products/${productID}`} />}
                hoverable={true}
                actions={[
                    <ProductIcon type="review" reviewLink={this.props.links.reviewsCount} selected={this.props.review} 
                        id={productID} />,
                    <ProductIcon type="rating" reviewLink={this.props.links.reviewsRating} selected={this.props.rating} 
                        id={productID} />
                ]}>

                <Meta title={this.props.title} description={this.props.description} />
                <br />
                <p>Product Price: £{this.props.productPrice}</p> 
            </Card>
        ); 
    }
}

export default ProductCard;