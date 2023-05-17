// Handles render format for review grid for product page

import React from 'react';
import { Col, Row } from 'antd'; 
import ReviewCard from './reviewcard';
import { status, json } from '../utilities/requestHandlers';
import { withRouter } from 'react-router';

// Sets the review card grid for as many instances present in data
class ReviewGrid extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = { 
            reviews: []
        } 
    } 

    // Fetch reviews data from API
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`https://veronaparking-westernorinoco-3000.codio-box.uk/myKorea/products/${id}/reviews`)
        .then(status)
        .then(json)
        .then(data => {
          this.setState({ reviews: data })
          console.log(data);
        })
        .catch(err => console.log("Error fetching reviews", err));
    }

    render() {
        if (!this.state.reviews.length) {
            return <h3>No reviews yet...</h3>
        } 
        // the next line does the Array.map() operation on the products 
        // to create an array of React elements to be rendered 
        const reviewList = this.state.reviews.map(review => {
            return (
                <div style={{padding:"10px"}} key={review.productID}>
                    <Col span={6}>
                        <ReviewCard {...review} />
                    </Col>
                </div>
            )
        }); 
        return (
            <Row type="flex" justify="space-around"> 
                {reviewList}
            </Row>
        );
    }
}

export default withRouter(ReviewGrid);