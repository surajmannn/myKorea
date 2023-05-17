// Review card instances

import React from 'react';
import { Card } from 'antd'; 
import { Rate} from 'antd';

// Renders review card layout with defined propertis from reviews of API call
class ReviewCard extends React.Component { 
    
    render() {
        return ( 
            <Card
                style={{ width: 250 }}>
                <p>User: {this.props.username}</p> 
                <p>Review: {this.props.review}</p> 
                <p>Rating: {this.props.rating}</p>
                <Rate value={this.props.rating} disabled />
            </Card>
        ); 
    }
}

export default ReviewCard;