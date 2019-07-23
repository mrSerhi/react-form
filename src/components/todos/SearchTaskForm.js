import React, { Component } from "react";
import { Col, InputGroup, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchTaskForm extends Component {
  static propTypes = {
    setSearchQuery: PropTypes.func.isRequired
  };

  getQueryOnChange = (e) => {
    this.props.setSearchQuery(e.target.value);
  };

  render() {
    return (
      <Col sm={6}>
        <InputGroup size="sm">
          <InputGroup.Prepend>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup.Prepend>

          <FormControl
            type="search"
            placeholder="Enter Searching task ..."
            onChange={this.setQueryOnChange}
          />
        </InputGroup>
      </Col>
    );
  }
}

export default SearchTaskForm;