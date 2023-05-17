/**
 * Wrap an image tag as a React component to allow router linking.
 */

 import React from 'react';
 import { useHistory } from 'react-router-dom';
 
 const NavImage = (props) => {
     const navigate = useHistory();
     return <img alt={props.alt} src={props.src} onClick={() => navigate.push(props.to)} />;
 }
 export default NavImage;