import React, { Component } from 'react';
import axios from 'axios';
import emailRegex from 'email-regex';
import { 
  FormGroup, 
  Input, 
  Button, 
  FormControl, 
  FormControlLabel, 
  Card
} from '@material-ui/core';

const styles = {
  divMargin: {
    marginTop: '1.5em',
    marginBottom: '1.5em',
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
    const that = this;
    this.state = {
      phoneNumber: null,
      password: null,
      email: null,
      invalid: true,
      errors: {
        email: {
          messages: [],
          checkErrors(value) {
            const { errors } = that.state;
            const { email } = errors;
            email.messages = [];
            that.setState({
              errors,
              invalid: false
            });
            const splitByAmpersand = value.split('@');
            const leftSideIsNotShort = splitByAmpersand[0].length > 4;
            const isValid = emailRegex().test(value);
            const notValidMessage = 'Email is not valid';
            const tooShortMessage = 'Email is too short';
            if (!isValid) {
              email.messages.push(notValidMessage);
              that.setState({
                errors,
                invalid: true
              });
            }
            if (!leftSideIsNotShort) {
              email.messages.push(tooShortMessage);
              that.setState({
                errors,
                invalid: true
              });
            }
          }
        },
        phoneNumber: {
          messages: [],
          checkErrors(value) {

          }
        },
        password: {
          messages: []
        }
      }
    };
  }
  componentDidMount() {
    console.log('Registration has mounted');
  }
  register() {
  }
  handleErrors = (event) => {
    const { errors } = this.state;
    const item = errors[event.target.name];
    if (item.checkErrors) {
      item.checkErrors(event.target.value);
    }
  }
  handleChange = (event) => {
    this.state[event.target.name] = event.target.value;
    this.handleErrors(event);
  }
  render() {
    const { state } = this;
    const { errors: { email }, invalid } = state
    return <div>
      <Card raised>
      <FormControl component="div" style={styles.divMargin}>
        <FormGroup>
          <FormControlLabel control={
            <div>
              <Input type="text" name="phoneNumber" onChange={this.handleChange} style={styles.inputStyles} placeholder="Enter Phone Number"/>
            </div>
          }
          />
        </FormGroup>
      </FormControl>
      <FormControl component="div" style={styles.divMargin}>
        <FormGroup>
          <FormControlLabel control={
            <div>
             <Input type="email" name="email" onChange={this.handleChange} style={styles.inputStyles} placeholder="Enter Email" />
             {email.messages.length > 0 && email.messages.map((value, index) => {
               return (<div key={index}>{value}</div>);
             })}
            </div>
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
      <FormControl component="div" style={styles.divMargin}>
        <FormGroup>
          <FormControlLabel control={
            <Button disabled={invalid} size="medium" variant="contained" color="primary" onClick={() => console.log(state)}>Sign Up</Button>
          }></FormControlLabel>
        </FormGroup>
      </FormControl>
      </Card>
    </div>
  }
}
