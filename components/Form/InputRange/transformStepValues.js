import PropTypes from 'prop-types';
import React, { Component } from 'react';
import noop from '../../../utils/noop';

export const getDomainValue = (rawValue, steps) => {
  if (typeof rawValue === 'object') {
    return {
      min: steps[rawValue.min],
      max: steps[rawValue.max],
    };
  }

  return steps[rawValue];
};

export const getRawValue = (domainValue, steps) => {
  if (typeof domainValue === 'object') {
    return {
      min: steps.indexOf(domainValue.min),
      max: steps.indexOf(domainValue.max),
    };
  }

  return steps.indexOf(domainValue);
};

const transformStepValues = WrappedComponent => steps => class extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onChangeComplete: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number,
      }),
    ]),
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
  };

  static defaultProps = {
    onChange: noop,
    onChangeComplete: noop,
  };

  handleChange = (e, name, rawValue) => {
    const { onChange } = this.props;
    onChange(e, name, getDomainValue(rawValue, steps));
  };

  handleChangeComplete = (e, name, rawValue) => {
    const { onChangeComplete } = this.props;
    onChangeComplete(e, name, getDomainValue(rawValue, steps));
  };

  render() {
    const { maxValue, minValue, value } = this.props;

    const rawMaxValue = getRawValue(maxValue, steps);
    const rawMinValue = getRawValue(minValue, steps);
    const rawValues = getRawValue(value, steps);

    return (
      <WrappedComponent
        { ...this.props }
        maxValue={ rawMaxValue }
        minValue={ rawMinValue }
        value={ rawValues }
        ref={ (c) => { this.component = c; } }
        onChange={ this.handleChange }
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
};

export default transformStepValues;
