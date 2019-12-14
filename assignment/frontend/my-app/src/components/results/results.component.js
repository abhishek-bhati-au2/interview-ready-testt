import React from 'react';
import {Button, Card, Col, Row} from 'antd';
import FormattedDuration from 'react-intl-formatted-duration';
import styled from 'styled-components';
import './results.component.css';
import ItemResultComponent from "./item-result.component";
import {IntlProvider} from 'react-intl';

const Text = styled.span``;

class ResultsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      duration: 0
    }
  }
  
  calculateTotal() {
    let total = 0;
    let duration = 0;
    this.props.items.map((item, key) => {
      if (item.deal) {
        total += item.deal.price;
        duration += item.deal.duration;
      }
      return false;
    });
    return {total, duration: duration * 60};
  }
  
  render() {
    return (
      <Row type="flex" justify="center" className="mt-10">
        <Col xs={10} sm={10} md={21} lg={12}>
          <Card style={{marginTop: 20}} title={'Search Results'}>
            <div className="result">
              {this.props.items.map((item, key) => <ItemResultComponent key={key} item={item}/>)}
              <IntlProvider locale="en">
                <div className="total">
                  <p><span className="title">Total</span>
                    <FormattedDuration seconds={this.calculateTotal().duration}
                                       textComponent={Text}
                                       format="{hours} {minutes}"/>
                    <span className="price">
                  {this.calculateTotal().total + '€'}</span></p>
                </div>
              </IntlProvider>
            </div>
            <Button size="large"
                    style={{width: '100%'}}
                    onClick={() => this.props.resetForm()}
                    type="danger"
                    icon="rollback">Reset</Button>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default ResultsComponent;
