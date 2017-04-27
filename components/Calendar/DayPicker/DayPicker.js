import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import momentPropTypes from 'react-moment-proptypes';
import keyMirror from 'key-mirror';

import css from './DayPicker.css';
import Icon from '../../Icon/Icon';
import noop from '../../../utils/noop';
import DayPickerItem from './DayPickerItem';
import moment from '../../../utils/moment/moment';
import BtnContainer from '../../BtnContainer/BtnContainer';
import CalendarMonth from '../CalendarMonth/CalendarMonth';
import ScreenReadable from '../../ScreenReadable/ScreenReadable';

export const SELECT_DATE = keyMirror({
  START: null,
  END: null,
});

export const getDates = (startDate, endDate) => {
  if (!endDate) return [startDate];
  if (!startDate) return [endDate];

  return startDate.isAfter(endDate)
    ? Array.from(moment.range(endDate, startDate).by('day'))
    : Array.from(moment.range(startDate, endDate).by('day'));
};

const today = moment();

export default class DayPicker extends Component {
  static propTypes = {
    month: momentPropTypes.momentObj,
    onInteraction: PropTypes.func,
    onHighlight: PropTypes.func,
    onMonthChange: PropTypes.func,
    selectedDates: PropTypes.arrayOf(momentPropTypes.momentObj),
    highlightedDates: PropTypes.arrayOf(momentPropTypes.momentObj),
    disabledDates: PropTypes.arrayOf(momentPropTypes.momentObj),
    dayProps: PropTypes.object,
    accessibilityNextLabel: PropTypes.string,
    accessibilityPrevLabel: PropTypes.string,
  };

  static defaultProps = {
    month: today,
    onInteraction: noop,
    onHighlight: noop,
    onMonthChange: noop,
    selectedDates: [],
    highlightedDates: [],
    disabledDates: [],
    dayProps: {},
    accessibilityNextLabel: 'Go to next month',
    accessibilityPrevLabel: 'Go to previous month',
  };

  handleNextMonth = (e) => {
    const { month, onMonthChange } = this.props;
    const nextMonth = month.clone().add(1, 'month');
    onMonthChange(e, nextMonth);
  };

  handlePreviousMonth = (e) => {
    const { month, onMonthChange } = this.props;
    const prevMonth = month.clone().add(-1, 'month');
    onMonthChange(e, prevMonth);
  };

  render() {
    const {
      month,
      selectedDates,
      highlightedDates,
      disabledDates,
      accessibilityNextLabel,
      accessibilityPrevLabel,
      onInteraction,
      onHighlight,
      dayProps,
    } = this.props;

    return (
      <div className={ css.root }>
        <div className={ css.header }>
          <div className={ cx(css.control, css.prevControl) }>
            <BtnContainer onClick={ this.handlePreviousMonth }>
              <Icon name="chevron" className={ css.prevIcon } />
              <ScreenReadable>{ accessibilityPrevLabel }</ScreenReadable>
            </BtnContainer>
          </div>
          <div className={ css.month }>
            { month.format('MMMM') }
          </div>
          <div className={ cx(css.control, css.nextControl) }>
            <BtnContainer onClick={ this.handleNextMonth }>
              <Icon name="chevron" className={ css.nextIcon } />
              <ScreenReadable>{ accessibilityNextLabel }</ScreenReadable>
            </BtnContainer>
          </div>
        </div>
        <CalendarMonth
          { ...this.props }
          month={ month }
          columnHeadingProps={ {
            className: css.columnHeader,
          } }
          dayProps={ {
            ...dayProps,
            onInteraction,
            onHighlight,
            selectedDates,
            disabledDates,
            highlightedDates,
          } }
          DayComponent={ DayPickerItem }
        />
      </div>
    );
  }
}