import React, { Component } from 'react';
import { Button, Form, Select, TextArea } from 'semantic-ui-react';
import { Flex, Box, Image } from 'rebass';
import PropTypes from 'prop-types';

class QuestionForm extends Component {
  static propTypes = {
    handleFormSubmit: PropTypes.func,
    imgSrc: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        text: PropTypes.string,
        value: PropTypes.number,
      })
    ),
  };

  static defaultProps = {
    handleFormSubmit: () => {},
    imgSrc: 'https://assets.skooldio.com/icon/face10_b.svg',
    sections: [],
  };

  state = { question: '', section: -1 };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { handleFormSubmit } = this.props;
    const copyState = this.state;
    this.setState({ question: '', section: -1 });
    handleFormSubmit(copyState);
  };

  render() {
    const { question, section } = this.state;
    const { imgSrc, sections } = this.props;
    return (
      <Flex mb={2} mx={4} justifyContent="center" alignItems="flex-start" flexWrap="wrap">
        <Image width={108} src={imgSrc} p={2} />
        <Box width={[1, 1 / 2]}>
          <Form onSubmit={this.handleSubmit}>
            <Box width={1} p={2}>
              <Form.Field
                control={TextArea}
                name="question"
                placeholder="Ask me your question..."
                value={question}
                onChange={this.handleChange}
              />
            </Box>
            <Flex justifyContent="space-between" flexWrap="wrap">
              <Box width={[2 / 3, 1 / 2, 1 / 3]} p={2}>
                <Form.Field
                  fluid
                  control={Select}
                  name="section"
                  options={sections}
                  placeholder="Section"
                  value={section}
                  onChange={this.handleChange}
                />
              </Box>
              <Box width={[1 / 3]} align="right" p={2}>
                <Form.Field primary control={Button} type="submit">
                  Submit
                </Form.Field>
              </Box>
            </Flex>
          </Form>
        </Box>
      </Flex>
    );
  }
}

export default QuestionForm;
