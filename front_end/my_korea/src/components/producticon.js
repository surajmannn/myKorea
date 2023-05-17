import React from 'react';
import MessageOutlined from '@ant-design/icons/MessageOutlined'; 
import MessageFilled from '@ant-design/icons/MessageFilled'; 
import ShoppingBagOutlined from '@ant-design/icons/ShoppingOutlined';
import ShoppingBagFilled from '@ant-design/icons/ShoppingFilled';
import { Rate } from 'antd';

import { status, json } from '../utilities/requestHandlers';

// Helper function to determine what icon to render
function getIcon (theme, iconType) {
    let Icon;
  
    if (theme === 'filled') {
        if (iconType === 'review') {
            Icon = MessageFilled
        } else if (iconType === 'cart') {
            Icon = ShoppingBagFilled;
        } else if (iconType === 'rating') {
            Icon = Rate;
        }
    } else if (theme === 'outlined') {
        if (iconType === 'review') {
            Icon = MessageOutlined
        } else if (iconType === 'cart') {
            Icon = ShoppingBagOutlined
        } else if (iconType === 'rating') {
            Icon = Rate;
        } 
    }
  
    return Icon;
  }

// Class to keep track of icon state
class ProductIcon extends React.Component { 
    constructor(props){
        super(props); 
        this.state = {
            selected: props.selected,
            count: 0
        };
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() { 
        fetch(this.props.reviewLink) 
        .then(status)
        .then(json)
        .then(count => { 
            this.setState({count:count})
            console.log(count);
        })
        .catch(err => {
            console.log(`${this.props.type} icon error for product ${this.props.id}`)
        });
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.selected !== this.state.selected) {
          //run the handler passed in by the parent component
          this.props.handleToggle(this.state.selected);
        }
      }

    onClick() {
        //reverse the selected state with every click 
        this.setState({selected: !this.state.selected});
    }

    // Render icon output based on output of helper function
    render(){
        const theme = this.state.selected ? 'filled' : 'outlined'; 
        const iconType = this.props.type;
        const Icon = getIcon(theme, iconType);
        if (Icon === Rate) {
            return (
                <span>
                    <Rate allowHalf value={this.state.count} disabled />
                </span>
            );
        } else {
            return ( 
                <span>
                    <Icon
                        onClick={this.onClick}
                        style={{color:'steelblue'}} />
                    {this.state.count} 
                </span>
            );
        }
    }
}

export default ProductIcon;