import React, { Component } from 'react';
import { Col, Row } from 'antd';
import './layout.scss';

class LayoutContainer extends Component {
  render() {
    return (
      <>
        <Row className='layout-container' style={{}}>
          <Col span={4}></Col>
          <Col span={10}>{this.props.children}</Col>
          <Col span={4}></Col>
        </Row>
      </>
    );
  }
}

export default LayoutContainer;
