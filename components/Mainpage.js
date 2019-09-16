import React, { Component } from 'react';
import { Tabs, Tab, Paper } from '@material-ui/core';
import { Home, PersonAdd } from '@material-ui/icons';
import Landing from './Landing';
import Registration from './Registration';

const styles = {
  backgroundColor: 'mediumblue'
};

export default class Mainpage extends Component {
  state = {
    activeIndex: 0
  };
  handleChange = (_, activeIndex) => this.setState({ activeIndex });
  componentDidMount() {
    console.log('Mounted Mainpage');
  }
  render() {
    const { activeIndex } = this.state;
    return <div>
    <Paper square style={styles}>
      <Tabs 
      variant="fullWidth" 
      value={activeIndex} 
      onChange={this.handleChange}
      indicatorColor="primary"
      textColor="secondary"
      centered
      >
      <Tab label="Homepage" icon={<Home/>} />
      <Tab label="Registration" icon={<PersonAdd/>} />
      </Tabs>
    </Paper>
      {activeIndex === 0 && <Landing/>}
      {activeIndex === 1 && <Registration/>}
  </div>
  }
}
