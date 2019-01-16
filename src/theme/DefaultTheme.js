const core = {
  white: '#fff',
  gray: '#4A4A4A',
  grayLight: '#9B9B9B',
  grayLighter: '#CBCBCB',
  grayLightest: '#EBEBEB',

  borderMedium: '#CBCBCB',
  border: '#FFF',
  borderLight: '#EAEAEA',
  borderLighter: '#EBEBEB',
  borderBright: '#f4f5f5',

  primary: '#000',
  primaryShade_1: '#4A4A4A',
  primaryShade_2: '#9B9B9B',
  primaryShade_3: '#CBCBCB',
  primaryShade_4: '#E6E6E6',
  primary_dark: '#222',

  secondary: '#444',

  yellow: '#ffe8bc',
  yellow_dark: '#ffce71',
};

export default {
  reactDates: {
    zIndex: 0,
    border: {
      input: {
        border: 0,
        borderBottom: '2px solid transparent',
        borderBottomFocused: `2px solid ${core.primary_dark}`,
        borderFocused: 0,
        borderLeft: 0,
        borderLeftFocused: 0,
        borderRadius: 0,
        borderRight: 0,
        borderRightFocused: 0,
        borderTop: 0,
        borderTopFocused: 0,
        outlineFocused: 0,
      },
      pickerInput: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
      },
      width: 1,
    },

    color: {
      background: core.white,
      backgroundDark: '#f2f2f2',
      backgroundFocused: core.white,
      border: core.white,
      core,
      dayBackground: core.grayLightest,
      disabled: core.grayLightest,
      placeholderText: '#757575',
      text: core.primary,
      textDisabled: core.border,
      textFocused: '#000',

      outside: {
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        backgroundColor: core.white,
        color_active: core.gray,
        color_hover: core.gray,
        color: core.gray,
      },

      highlighted: {
        backgroundColor_active: core.yellow_dark,
        backgroundColor_hover: core.yellow_dark,
        backgroundColor: core.yellow,
        color_active: core.gray,
        color_hover: core.gray,
        color: core.gray,
      },

      minimumNights: {
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        backgroundColor: core.white,
        borderColor: core.white,
        color_active: core.grayLighter,
        color_hover: core.grayLighter,
        color: core.grayLighter,
      },

      hoveredSpan: {
        backgroundColor_active: core.primaryShade_3,
        backgroundColor_hover: core.primary,
        backgroundColor: core.primaryShade_3,
        borderColor_active: core.border,
        borderColor_hover: core.border,
        borderColor: core.border,
        color_active: core.white,
        color_hover: core.white,
        color: core.white,
      },

      selectedSpan: {
        backgroundColor_active: core.primaryShade_2,
        backgroundColor_hover: core.primaryShade_2,
        backgroundColor: core.primaryShade_2,
        borderColor_active: core.border,
        borderColor_hover: core.border,
        borderColor: core.border,
        color_active: core.white,
        color_hover: core.white,
        color: core.white,
      },

      selected: {
        backgroundColor_active: core.primary,
        backgroundColor_hover: core.primary,
        backgroundColor: core.primary,
        borderColor_active: core.borderLighter,
        borderColor_hover: core.borderLighter,
        borderColor: core.borderLighter,
        color_active: core.white,
        color_hover: core.white,
        color: core.white,
      },

      blocked_calendar: {
        backgroundColor_active: core.grayLighter,
        backgroundColor_hover: core.grayLighter,
        backgroundColor: core.white,
        borderColor_active: core.grayLighter,
        borderColor_hover: core.grayLighter,
        borderColor: core.grayLighter,
        color_active: core.grayLight,
        color_hover: core.grayLight,
        color: core.grayLight,
      },

      blocked_out_of_range: {
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        backgroundColor: core.white,
        borderColor_active: core.white,
        borderColor_hover: core.white,
        borderColor: core.white,
        color_active: core.grayLighter,
        color_hover: core.grayLighter,
        color: core.grayLighter,
      },
    },

    spacing: {
      dayPickerHorizontalPadding: 4,
      captionPaddingTop: 22,
      captionPaddingBottom: 42,
      inputPadding: 0,
      displayTextPaddingVertical: undefined,
      displayTextPaddingTop: 11,
      displayTextPaddingBottom: 9,
      displayTextPaddingHorizontal: undefined,
      displayTextPaddingLeft: 11,
      displayTextPaddingRight: 11,
      displayTextPaddingVertical_small: undefined,
      displayTextPaddingTop_small: 7,
      displayTextPaddingBottom_small: 5,
      displayTextPaddingHorizontal_small: undefined,
      displayTextPaddingLeft_small: 7,
      displayTextPaddingRight_small: 7,
      mobile: {
        captionPaddingTop: 22,
      },
      desktop: {
        captionPaddingTop: 16,
      },
    },

    sizing: {
      inputWidth: 130,
      inputWidth_small: 97,
      arrowWidth: 24,
    },

    noScrollBarOnVerticalScrollable: false,

    font: {
      size: 18,
      captionSize: 18,
      input: {
        size: 19,
        lineHeight: '24px',
        size_small: 15,
        lineHeight_small: '18px',
        letterSpacing_small: '0.2px',
        styleDisabled: 'italic',
      },
      mobile: {
        size: 18,
        captionSize: 24,
        dayLabel: 14,
      },
      desktop: {
        size: 26,
        captionSize: 26,
        dayLabel: 16,
      },
      mini: {
        size: 16,
        captionSize: 26,
        dayLabel: 12,
      },
    },
  },
};
