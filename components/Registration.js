import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, Input, Button, FormControl, FormControlLabel } from '@material-ui/core';

const styles = {
  divMargin: {
    marginTop: '0.5em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyles: {
    margin: '0.2em',
    padding: '10px',
    width: 400
  }
}

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      password: '',
      email: ''
    };
  }
  componentDidMount() {
    console.log('Registration has mounted');
  }
  register() {
  }
  handleChange = (event) => {
    this.state[event.target.name] = event.target.value;
    console.log(this.state);
  }
  render() {
    const { email, password, phoneNumber } = this.state;
    const splitEmailByAmpersand = email.split('@')
    const splitEmailByDotCom = email.split('.com');
    const emailHasMoreThanOneAmpersand = splitEmailByAmpersand.length > 2;
    const emailHasMoreThanOneDotCom = splitEmailByDotCom.length > 2;
    const firstItemInEmailIsShort = splitEmailByAmpersand[0].length < 4;
    const errors = {
      email: {
        isInvalid: email.indexOf('@') === -1 || 
        email.indexOf('.com') === -1 || 
        emailHasMoreThanOneAmpersand || 
        emailHasMoreThanOneDotCom || 
        firstItemInEmailIsShort,
        messages: ['Error']
      }
    };
    return <div>
      <FormControl component="div" style={styles.divMargin}>
        <FormGroup>
          <FormControlLabel control={
            <div>
              <Input type="text" name="phoneNumber" onChange={this.handleChange} style={styles.inputStyles} placeholder="Enter Phone Number"/>
              {errors.email.isInvalid && errors.email.messages.map((value) => {
                return <div>{value}</div>
              })}
            </div>
          }
          />
        </FormGroup>
      </FormControl>
      <FormControl component="div" style={styles.divMargin}>
        <FormGroup>
          <FormControlLabel control={
            <Input type="email" name="email" onChange={this.handleChange} style={styles.inputStyles} placeholder="Enter Email" />
          } />
        </FormGroup>
      </FormControl>
      <FormControl component="div" style={styles.divMargin}>
        <FormGroup>
          <FormControlLabel control={
            <Input type="password" name="password" onChange={this.handleChange} style={styles.inputStyles} placeholder="Enter Password" />
          } />
        </FormGroup>
      </FormControl>
    </div>
  }
}
