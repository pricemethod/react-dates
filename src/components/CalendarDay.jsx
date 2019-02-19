import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import getCalendarDaySettings from '../utils/getCalendarDaySettings';
import ModifiersShape from '../shapes/ModifiersShape';

import { DAY_SIZE } from '../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  day: momentPropTypes.momentObj,
  daySize: nonNegativeInteger,
  isOutsideDay: PropTypes.bool,
  modifiers: ModifiersShape,
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.oneOf([0, -1]),
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDayContents: PropTypes.func,
  ariaLabelFormat: PropTypes.string,
  size: PropTypes.string,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
});

const defaultProps = {
  day: moment(),
  daySize: DAY_SIZE,
  isOutsideDay: false,
  modifiers: new Set(),
  isFocused: false,
  tabIndex: -1,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  renderDayContents: null,
  ariaLabelFormat: 'dddd, LL',

  // internationalization
  phrases: CalendarDayPhrases,
};

class CalendarDay extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.setButtonRef = this.setButtonRef.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isFocused, tabIndex } = this.props;
    if (tabIndex === 0) {
      if (isFocused || tabIndex !== prevProps.tabIndex) {
        this.buttonRef.focus();
      }
    }
  }

  onDayClick(day, e) {
    const { onDayClick } = this.props;
    onDayClick(day, e);
  }

  onDayMouseEnter(day, e) {
    const { onDayMouseEnter } = this.props;
    onDayMouseEnter(day, e);
  }

  onDayMouseLeave(day, e) {
    const { onDayMouseLeave } = this.props;
    onDayMouseLeave(day, e);
  }

  onKeyDown(day, e) {
    const { onDayClick } = this.props;

    const { key } = e;
    if (key === 'Enter' || key === ' ') {
      onDayClick(day, e);
    }
  }

  setButtonRef(ref) {
    this.buttonRef = ref;
  }

  render() {
    const {
      day,
      ariaLabelFormat,
      daySize,
      isOutsideDay,
      modifiers,
      renderDayContents,
      tabIndex,
      styles,
      phrases,
      size,
    } = this.props;

    if (!day) return <td />;

    const {
      daySizeStyles,
      useDefaultCursor,
      selected,
      hoveredSpan,
      isOutsideRange,
      ariaLabel,
    } = getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases);

    return (
      <td
        {...css(
          styles.CalendarDay,
          useDefaultCursor && styles.CalendarDay__defaultCursor,
          styles.CalendarDay__default,
          isOutsideDay && styles.CalendarDay__outside,
          modifiers.has('today') && styles.CalendarDay__today,
          modifiers.has('first-day-of-week') && styles.CalendarDay__firstDayOfWeek,
          modifiers.has('last-day-of-week') && styles.CalendarDay__lastDayOfWeek,
          modifiers.has('hovered-offset') && styles.CalendarDay__hovered_offset,
          modifiers.has('highlighted-calendar') && styles.CalendarDay__highlighted_calendar,
          modifiers.has('blocked-minimum-nights') && styles.CalendarDay__blocked_minimum_nights,
          modifiers.has('blocked-calendar') && styles.CalendarDay__blocked_calendar,
          hoveredSpan && styles.CalendarDay__hovered_span,
          modifiers.has('selected-span') && styles.CalendarDay__selected_span,
          modifiers.has('last-in-range') && styles.CalendarDay__last_in_range,
          modifiers.has('selected-start') && styles.CalendarDay__selected_start,
          modifiers.has('selected-end') && styles.CalendarDay__selected_end,
          selected && styles.CalendarDay__selected,
          isOutsideRange && styles.CalendarDay__blocked_out_of_range,
          daySizeStyles,
          size === 'full' ? styles.CalendarDay__full_size : styles.CalendarDay__mini_size,
        )}
        role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
        ref={this.setButtonRef}
        aria-disabled={modifiers.has('blocked')}
        aria-label={ariaLabel}
        onMouseEnter={(e) => {
          this.onDayMouseEnter(day, e);
        }}
        onMouseLeave={(e) => {
          this.onDayMouseLeave(day, e);
        }}
        onMouseUp={(e) => {
          e.currentTarget.blur();
        }}
        onClick={(e) => {
          this.onDayClick(day, e);
        }}
        onKeyDown={(e) => {
          this.onKeyDown(day, e);
        }}
        tabIndex={tabIndex}
      >
        {renderDayContents ? renderDayContents(day, modifiers) : day.format('D')}
      </td>
    );
  }
}

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;

export { CalendarDay as PureCalendarDay };
export default withStyles(
  ({ reactDates: { color, font, border } }) => ({
    CalendarDay: {
      boxSizing: 'border-box',
      cursor: 'pointer',
      fontSize: font.size,
      fontWeight: 400,
      textAlign: 'center',

      ':active': {
        outline: 0,
      },
    },

    CalendarDay__defaultCursor: {
      cursor: 'default',
    },

    CalendarDay__default: {
      border: `${border.width}px solid ${color.core.white}`,
      color: color.text,
      fontWeight: 400,
      background: color.dayBackground,

      ':hover': {
        background: color.hoverBackground,
        color: color.core.white,
        fontWeight: font.weight.hover,
      },
    },

    CalendarDay__mini_size: {
      fontSize: font.mini.size,
    },

    CalendarDay__full_size: {
      fontSize: font.size,
    },

    CalendarDay__hovered_offset: {
      background: color.core.borderBright,
      border: `${border.width}px solid ${color.core.white}`,
      color: color.text,
    },

    CalendarDay__outside: {
      border: 0,
      background: color.outside.backgroundColor,
      color: color.outside.color,

      ':hover': {
        border: 0,
      },
    },

    CalendarDay__blocked_minimum_nights: {
      background: color.minimumNights.backgroundColor,
      border: `${border.width}px solid ${color.minimumNights.borderColor}`,
      color: color.minimumNights.color,

      ':hover': {
        background: color.minimumNights.backgroundColor_hover,
        color: color.minimumNights.color_active,
      },

      ':active': {
        background: color.minimumNights.backgroundColor_active,
        color: color.minimumNights.color_active,
      },
    },

    CalendarDay__highlighted_calendar: {
      background: color.highlighted.backgroundColor,
      color: color.highlighted.color,

      ':hover': {
        background: color.highlighted.backgroundColor_hover,
        color: color.highlighted.color_active,
      },

      ':active': {
        background: color.highlighted.backgroundColor_active,
        color: color.highlighted.color_active,
      },
    },

    CalendarDay__selected_span: {
      background: color.selectedSpan.backgroundColor,
      border: `${border.width}px solid ${color.selectedSpan.borderColor}`,
      color: color.selectedSpan.color,
      fontWeight: font.weight.selected,

      ':hover': {
        background: color.selectedSpan.backgroundColor_hover,
        border: `${border.width}px solid ${color.selectedSpan.borderColor}`,
        color: color.selectedSpan.color_hover,
      },

      ':active': {
        background: color.selectedSpan.backgroundColor_active,
        border: `${border.width}px solid ${color.selectedSpan.borderColor}`,
        color: color.selectedSpan.color_active,
      },
    },

    CalendarDay__last_in_range: {
      borderStyle: 'solid',

      ':hover': {
        borderStyle: 'solid',
      },
    },

    CalendarDay__selected: {
      background: color.selected.backgroundColor,
      color: color.selected.color,
      border: `${border.width}px solid ${color.selected.borderColor}`,

      ':hover': {
        border: `${border.width}px solid ${color.selected.borderColor}`,
      },

      ':active': {
        border: `${border.width}px solid ${color.selected.borderColor}`,
      },
    },

    CalendarDay__hovered_span: {
      color: color.hoveredSpan.color,
      border: `${border.width}px solid ${color.hoveredSpan.borderColor}`,
      background: color.hoveredSpan.backgroundColor,
      fontWeight: 600,
      ':hover': {
        border: `${border.width}px solid ${color.hoveredSpan.borderColor}`,
      },

      ':active': {
        border: `${border.width}px solid ${color.hoveredSpan.borderColor}`,
      },
    },

    CalendarDay__blocked_calendar: {
      background: color.blocked_calendar.backgroundColor,
      color: color.blocked_calendar.color,
      border: `${border.width}px solid ${color.blocked_calendar.borderColor}`,

      ':hover': {
        border: `${border.width}px solid ${color.blocked_calendar.borderColor}`,
      },

      ':active': {
        border: `${border.width}px solid ${color.blocked_calendar.borderColor}`,
      },
    },

    CalendarDay__blocked_out_of_range: {
      background: color.blocked_out_of_range.backgroundColor,
      color: color.blocked_out_of_range.color,
      border: `${border.width}px solid ${color.blocked_out_of_range.borderColor}`,

      ':hover': {
        border: `${border.width}px solid ${color.blocked_out_of_range.borderColor}`,
        background: color.blocked_out_of_range.backgroundColor_hover,
        color: color.blocked_out_of_range.color,
        fontWeight: font.weight.default,
      },
    },

    CalendarDay__selected_start: {
      background: color.selected.backgroundColor,
      border: `${border.width}px solid ${color.selected.borderColor}`,
      fontWeight: font.weight.selected,
      ':hover': {
        background: color.selected.backgroundColor,
        color: color.selected.color_hover,
      },
    },
    CalendarDay__selected_end: {
      background: color.selected.backgroundColor,
      border: `${border.width}px solid ${color.selected.borderColor}`,
      fontWeight: font.weight.selected,
      ':hover': {
        background: color.selected.backgroundColor,
        color: color.selected.color_hover,
      },
    },
    CalendarDay__today: {
      color: color.text,
      ':hover': {
        color: color.text,
      },
    },
    CalendarDay__firstDayOfWeek: {},
    CalendarDay__lastDayOfWeek: {},
  }),
  { pureComponent: typeof React.PureComponent !== 'undefined' },
)(CalendarDay);
