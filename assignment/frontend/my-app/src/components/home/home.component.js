import React from 'react';
import {Layout, Row} from 'antd';
import './home.component.css'
import SearchBoxForm from "../search-box/search-box.component";
import ResultsComponent from "../results/results.component";
import {getData} from "../../helpers/finder";

const { Sider, Content} = Layout;

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      results: []
    }
  }
  
  toggleForm = () => {
    this.form.resetFields();
    this.setState({results: []});
  };
  
  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider width={500}>
        </Sider>
        <Layout>
          <Content>
            <main className="main-content">
              <Row type="flex" justify="center">
                <div className="intro">
                  <span className="logo">TripCrafter</span>
                  <p>Traveling is an exciting experience to treasure for the rest of your life and at TripCrafter Travels, we tend to work 24/7 to make sure that you simply have the best ones. Most people set up our vacations on the final moment and sometimes drop the thought solely due to hefty price of being late and at TripCrafter Travels, we tend to run an additional mile on a daily basis to transform your plans a true memory with years of experience from the travel business and provide an extraordinary travel experience. </p>
                </div>
              </Row>
              <SearchBoxForm ref={form => this.form = form}
                             findResults={results => this.setState({results})}
                             names={this.state.names}/>
              {this.state.results && this.state.results.length > 0 &&
              <ResultsComponent items={this.state.results} resetForm={this.toggleForm}/>}
            </main>
          </Content>
        </Layout>
      </Layout>)
  }
  
  componentDidMount() {
    getData().then(names => this.setState({names}));
  }
}

export default HomeComponent;