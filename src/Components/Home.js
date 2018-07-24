import React, { Component } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Dropdown,
} from 'semantic-ui-react';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];

class Home extends Component {
  state = {};

  handleChange = (e, { name, label, value }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = () => {
    console.log(this.state);
  };
  render() {
    const { value } = this.state;
    return (
      <div style={{ paddingLeft: '10%', paddingRight: '10%' }}>
        <Form>
          <Form.Field
            control={TextArea}
            name="question"
            // label="question"
            placeholder="Tell us more about you..."
            onChange={this.handleChange}
          />
          <Form.Group inline>
            <Form.Field
              control={Select}
              name="section"
              // label="section"
              options={options}
              placeholder="Gender"
              onChange={this.handleChange}
            />
            <Form.Field
              control={Checkbox}
              name="anonymous"
              label="anonymous"
              onChange={this.handleChange}
            />

            <Form.Field control={Button} onClick={this.handleSubmit}>
              Submit
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Home;
