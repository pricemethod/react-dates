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
  ({ reactDates: { color, font } }) => ({
    CalendarDay: {
      boxSizing: 'border-box',
      cursor: 'pointer',
      fontSize: font.mobile.size,
      fontWeight: 400,
      textAlign: 'center',

      ':active': {
        outline: 0,
      },

      // '@media (min-width: 640px)': {
      //   fontSize: font.desktop.size,
      // },
    },

    CalendarDay__defaultCursor: {
      cursor: 'default',
    },

    CalendarDay__default: {
      border: `2px solid ${color.core.white}`,
      color: color.text,
      background: color.mobile.dayBackground,

      '@media (min-width: 640px)': {
        // fontSize: font.desktop.size,
        fontWeight: 300,
        background: color.desktop.dayBackground,
        border: `4px solid ${color.core.borderLighter}`,
      },

      ':hover': {
        background: color.core.borderLight,
        color: color.text,
      },
    },

    CalendarDay__mini_size: {
      fontSize: font.mini.size,
    },

    CalendarDay__full_size: {
      fontSize: font.desktop.size,
    },

    CalendarDay__hovered_offset: {
      background: color.core.borderBright,
      border: `2px solid ${color.core.white}`,
      color: color.text,
      '@media (min-width: 640px)': {
        border: `4px solid ${color.core.borderLighter}`,
      },
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
      border: `2px solid ${color.minimumNights.mobile.borderColor}`,
      color: color.minimumNights.color,

      ':hover': {
        background: color.minimumNights.backgroundColor_hover,
        color: color.minimumNights.color_active,
      },

      ':active': {
        background: color.minimumNights.backgroundColor_active,
        color: color.minimumNights.color_active,
      },

      '@media (min-width: 640px)': {
        border: `4px solid ${color.minimumNights.desktop.borderColor}`,
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
      background: color.selectedSpan.mobile.backgroundColor,
      border: `2px solid ${color.selectedSpan.mobile.borderColor}`,
      color: color.selectedSpan.color,

      ':hover': {
        background: color.selectedSpan.backgroundColor_hover,
        border: `1px solid ${color.selectedSpan.borderColor}`,
        color: color.selectedSpan.color_active,
      },

      ':active': {
        background: color.selectedSpan.backgroundColor_active,
        border: `1px solid ${color.selectedSpan.borderColor}`,
        color: color.selectedSpan.color_active,
      },

      '@media (min-width: 640px)': {
        background: color.selectedSpan.desktop.backgroundColor,
        border: `4px solid ${color.selectedSpan.desktop.borderColor}`,
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
      border: `2px solid ${color.selected.mobile.borderColor}`,
      color: color.selected.color,

      ':hover': {
        background: color.selected.backgroundColor_hover,
        border: `2px solid ${color.selected.mobile.borderColor}`,
        color: color.selected.color_active,
      },

      ':active': {
        background: color.selected.backgroundColor_active,
        border: `2px solid ${color.selected.mobile.borderColor}`,
        color: color.selected.color_active,
      },
      '@media (min-width: 640px)': {
        border: `4px solid ${color.selected.desktop.borderColor}`,

        ':hover': {
          border: `4px solid ${color.selected.desktop.borderColor}`,
        },

        ':active': {
          border: `4px solid ${color.selected.desktop.borderColor}`,
        },
      },
    },

    CalendarDay__hovered_span: {
      background: color.hoveredSpan.mobile.backgroundColor,
      border: `2px solid ${color.hoveredSpan.borderColor}`,
      color: color.hoveredSpan.color,

      ':hover': {
        background: color.hoveredSpan.backgroundColor_hover,
        border: `2px solid ${color.hoveredSpan.mobile.borderColor}`,
        color: color.hoveredSpan.color_active,
      },

      ':active': {
        background: color.hoveredSpan.backgroundColor_active,
        border: `2px solid ${color.hoveredSpan.mobile.borderColor}`,
        color: color.hoveredSpan.color_active,
      },

      '@media (min-width: 640px)': {
        border: `4px solid ${color.hoveredSpan.desktop.borderColor}`,
        background: color.hoveredSpan.desktop.backgroundColor,

        ':hover': {
          border: `4px solid ${color.hoveredSpan.desktop.borderColor}`,
        },

        ':active': {
          border: `4px solid ${color.hoveredSpan.desktop.borderColor}`,
        },
      },
    },

    CalendarDay__blocked_calendar: {
      background: color.blocked_calendar.backgroundColor,
      border: `2px solid ${color.blocked_calendar.borderColor}`,
      color: color.blocked_calendar.color,

      ':hover': {
        background: color.blocked_calendar.backgroundColor_hover,
        border: `2px solid ${color.blocked_calendar.borderColor}`,
        color: color.blocked_calendar.color_active,
      },

      ':active': {
        background: color.blocked_calendar.backgroundColor_active,
        border: `2px solid ${color.blocked_calendar.borderColor}`,
        color: color.blocked_calendar.color_active,
      },

      '@media (min-width: 640px)': {
        border: `4px solid ${color.blocked_calendar.borderColor}`,

        ':hover': {
          border: `4px solid ${color.blocked_calendar.borderColor}`,
        },

        ':active': {
          border: `4px solid ${color.blocked_calendar.borderColor}`,
        },
      },
    },

    CalendarDay__blocked_out_of_range: {
      background: color.blocked_out_of_range.backgroundColor,
      border: `2px solid ${color.blocked_out_of_range.mobile.borderColor}`,
      color: color.blocked_out_of_range.color,

      ':hover': {
        background: color.blocked_out_of_range.backgroundColor_hover,
        border: `2px solid ${color.blocked_out_of_range.mobile.borderColor}`,
        color: color.blocked_out_of_range.color_active,
      },

      ':active': {
        background: color.blocked_out_of_range.backgroundColor_active,
        border: `2px solid ${color.blocked_out_of_range.mobile.borderColor}`,
        color: color.blocked_out_of_range.color_active,
      },
      '@media (min-width: 640px)': {
        border: `4px solid ${color.blocked_out_of_range.desktop.borderColor}`,

        ':hover': {
          border: `4px solid ${color.blocked_out_of_range.desktop.borderColor}`,
        },

        ':active': {
          border: `4px solid ${color.blocked_out_of_range.desktop.borderColor}`,
        },
      },
    },

    CalendarDay__selected_start: {
      background: color.selected.desktop.backgroundColor,
      border: `2px solid ${color.selected.desktop.borderColor}`,
      '@media (min-width: 640px)': {
        background: color.selected.desktop.backgroundColor,
        border: `4px solid ${color.selected.desktop.borderColor}`,
      },
    },
    CalendarDay__selected_end: {
      background: color.selected.desktop.backgroundColor,
      border: `2px solid ${color.selected.desktop.borderColor}`,
      '@media (min-width: 640px)': {
        background: color.selected.desktop.backgroundColor,
        border: `4px solid ${color.selected.desktop.borderColor}`,
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
