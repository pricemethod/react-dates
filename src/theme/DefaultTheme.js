const core = {
  white: '#fff',
  gray: '#4A4A4A',
  grayLight: '#9B9B9B',
  grayLighter: '#CBCBCB',
  grayLightest: '#EBEBEB',

  borderMedium: '#CBCBCB',
  border: '#dbdbdb',
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
        borderTop: 0,
        borderRight: 0,
        borderBottom: '2px solid transparent',
        borderLeft: 0,
        outlineFocused: 0,
        borderFocused: 0,
        borderTopFocused: 0,
        borderLeftFocused: 0,
        borderBottomFocused: `2px solid ${core.primary_dark}`,
        borderRightFocused: 0,
        borderRadius: 0,
      },
      pickerInput: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
      },
    },

    color: {
      core,
      disabled: core.grayLightest,
      background: core.white,
      backgroundDark: '#f2f2f2',
      backgroundFocused: core.white,
      border: core.white,
      text: core.primary,
      textDisabled: core.border,
      textFocused: '#000',
      placeholderText: '#757575',
      mobile: {
        background: core.white,
        dayBackground: core.grayLightest,
      },
      desktop: {
        background: core.grayLightest,
        dayBackground: core.white,
      },

      outside: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        color: core.gray,
        color_active: core.gray,
        color_hover: core.gray,
      },

      highlighted: {
        backgroundColor: core.yellow,
        backgroundColor_active: core.yellow_dark,
        backgroundColor_hover: core.yellow_dark,
        color: core.gray,
        color_active: core.gray,
        color_hover: core.gray,
      },

      minimumNights: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        borderColor: core.borderLighter,
        color: core.grayLighter,
        color_active: core.grayLighter,
        color_hover: core.grayLighter,
        mobile: {
          borderColor: core.white,
        },
        desktop: {
          borderColor: core.borderLighter,
        },
      },

      hoveredSpan: {
        backgroundColor: core.primaryShade_4,
        backgroundColor_active: core.primaryShade_3,
        backgroundColor_hover: core.primaryShade_4,
        borderColor: core.white,
        borderColor_active: core.white,
        borderColor_hover: core.white,
        color: core.secondary,
        color_active: core.secondary,
        color_hover: core.secondary,
        mobile: {
          borderColor: core.white,
          borderColor_active: core.white,
          borderColor_hover: core.white,
          backgroundColor: core.primaryShade_3,
        },
        desktop: {
          borderColor: core.borderLighter,
          borderColor_active: core.borderLighter,
          borderColor_hover: core.borderLighter,
          backgroundColor: core.primaryShade_4,
        },
      },

      selectedSpan: {
        backgroundColor: core.primaryShade_3,
        backgroundColor_active: core.primaryShade_4,
        backgroundColor_hover: core.primaryShade_4,
        borderColor: core.white,
        borderColor_active: core.white,
        borderColor_hover: core.white,
        color: core.primary,
        color_active: core.primary,
        color_hover: core.primary,
        mobile: {
          backgroundColor: core.primaryShade_3,
          borderColor: core.white,
          borderColor_active: core.white,
          borderColor_hover: core.white,
        },
        desktop: {
          backgroundColor: core.primaryShade_3,
          borderColor: core.borderLighter,
          borderColor_active: core.borderLighter,
          borderColor_hover: core.borderLighter,
        },
      },

      selected: {
        backgroundColor: core.primary,
        backgroundColor_active: core.primary,
        backgroundColor_hover: core.primary,
        borderColor: core.white,
        borderColor_active: core.white,
        borderColor_hover: core.white,
        color: core.white,
        color_active: core.white,
        color_hover: core.white,
        mobile: {
          backgroundColor: core.primary,
          borderColor: core.white,
          borderColor_active: core.white,
          borderColor_hover: core.white,
        },
        desktop: {
          backgroundColor: core.primary,
          borderColor: core.borderLighter,
          borderColor_active: core.borderLighter,
          borderColor_hover: core.borderLighter,
        },
      },

      blocked_calendar: {
        backgroundColor: core.grayLighter,
        backgroundColor_active: core.grayLighter,
        backgroundColor_hover: core.grayLighter,
        borderColor: core.grayLighter,
        borderColor_active: core.grayLighter,
        borderColor_hover: core.grayLighter,
        color: core.grayLight,
        color_active: core.grayLight,
        color_hover: core.grayLight,
      },

      blocked_out_of_range: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        borderColor: core.borderLight,
        borderColor_active: core.borderLight,
        borderColor_hover: core.borderLight,
        color: core.grayLighter,
        color_active: core.grayLighter,
        color_hover: core.grayLighter,
        mobile: {
          borderColor: core.white,
          borderColor_active: core.white,
          borderColor_hover: core.white,
        },
        desktop: {
          borderColor: core.borderLighter,
          borderColor_active: core.borderLighter,
          borderColor_hover: core.borderLighter,
        },
      },
    },

    spacing: {
      dayPickerHorizontalPadding: 9,
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
      size: 14,
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
        size: 36,
        captionSize: 36,
        dayLabel: 16,
      },
      mini: {
        size: 22,
        captionSize: 24,
        dayLabel: 15,
      },
    },
  },
};
