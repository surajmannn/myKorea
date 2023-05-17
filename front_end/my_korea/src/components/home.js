import React from 'react';
import { Input } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import DisplayGrid from './displaygrid';

const { Search } = Input;

// Home page for the SPA. Takes display grid to display product cards on home page
function Home(props) {
  return (
    <>
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <Search placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={null}/>
          <PageHeader className="site-page-header"
            title="My Korea"
            subTitle="All your favourite Korean Ramen Products"/>
        </div>  
        <DisplayGrid />
      </div>
    </>  
  );
}

export default Home;