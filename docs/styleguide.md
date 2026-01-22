{
  "meta": {
    "name": "Liquid Glass UI Style Guide",
    "version": "2.0",
    "themeKeywords": [
      "glassmorphism",
      "liquid-glass",
      "frosted",
      "translucent",
      "soft-shadows",
      "gradients",
      "light-mode",
      "modern"
    ],
    "renderingStrategy": {
      "preferred": "CSS backdrop-filter + rgba backgrounds + layered shadows",
      "useAssetsFor": [
        "complex gradients",
        "icons",
        "illustrations"
      ]
    },
    "baseline": {
      "unitPx": 8,
      "density": "comfortable",
      "contrast": "medium-high"
    }
  },
  "layout": {
    "spacing": {
      "xs": 4,
      "sm": 8,
      "md": 16,
      "lg": 24,
      "xl": 32,
      "panelPadding": 20,
      "componentGap": 16
    },
    "radiiPx": {
      "panelOuter": 20,
      "panelInner": 16,
      "well": 12,
      "buttonPill": 999,
      "buttonRect": 12,
      "input": 12,
      "chip": 999
    },
    "strokeAndBordersPx": {
      "hairline": 1,
      "standard": 1.5,
      "heavy": 2
    },
    "depth": {
      "panelElevation": 8,
      "buttonElevation": 4,
      "modalElevation": 24
    },
    "grid": {
      "columns": 12,
      "gutterPx": 16,
      "minTouchTargetPx": 44
    }
  },
  "colorTokens": {
    "backgrounds": {
      "base": "#EEEEF5",
      "light": "#F5F5FA",
      "white": "#FFFFFF",
      "gradient": "linear-gradient(180deg, #F5F5FA 0%, #EEEEF5 100%)"
    },
    "glass": {
      "bg": "rgba(255, 255, 255, 0.65)",
      "bgStrong": "rgba(255, 255, 255, 0.85)",
      "bgSubtle": "rgba(255, 255, 255, 0.4)",
      "border": "rgba(255, 255, 255, 0.85)",
      "borderSubtle": "rgba(255, 255, 255, 0.5)",
      "inner": "rgba(255, 255, 255, 0.4)"
    },
    "text": {
      "primary": "#1A1A2E",
      "secondary": "#4A4A5A",
      "muted": "#8A8A9A",
      "white": "#FFFFFF",
      "onAccent": "#FFFFFF"
    },
    "accent": {
      "teal": "#38D9A9",
      "cyan": "#3BC9DB",
      "gradient": "linear-gradient(135deg, #3BC9DB 0%, #38D9A9 100%)",
      "gradientHover": "linear-gradient(135deg, #4DD4E5 0%, #4EEAB8 100%)"
    },
    "secondary": {
      "purple": "#B197FC",
      "coral": "#FF8A80",
      "amber": "#FFD43B"
    },
    "functional": {
      "success": "#38D9A9",
      "warning": "#FFD43B",
      "danger": "#FF6B6B",
      "info": "#3BC9DB"
    },
    "shadows": {
      "soft": "rgba(0, 0, 0, 0.08)",
      "medium": "rgba(0, 0, 0, 0.12)",
      "strong": "rgba(0, 0, 0, 0.16)",
      "glow": {
        "teal": "rgba(56, 217, 169, 0.4)",
        "cyan": "rgba(59, 201, 219, 0.4)",
        "danger": "rgba(255, 107, 107, 0.4)",
        "purple": "rgba(177, 151, 252, 0.4)"
      }
    },
    "overlays": {
      "hover": "rgba(255, 255, 255, 0.1)",
      "pressed": "rgba(0, 0, 0, 0.05)",
      "disabled": "rgba(255, 255, 255, 0.5)"
    }
  },
  "typography": {
    "family": {
      "primary": "Montserrat",
      "fallback": ["system-ui", "-apple-system", "sans-serif"]
    },
    "sizesPx": {
      "xs": 12,
      "sm": 14,
      "base": 16,
      "lg": 18,
      "xl": 20,
      "2xl": 24,
      "3xl": 30
    },
    "weights": {
      "light": 300,
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "lineHeight": {
      "tight": 1.2,
      "base": 1.5,
      "relaxed": 1.75
    },
    "letterSpacing": {
      "tight": "-0.02em",
      "normal": "0",
      "wide": "0.02em",
      "wider": "0.05em"
    },
    "case": {
      "panelTitle": "titleCase",
      "buttons": "titleCase",
      "labels": "titleCase"
    }
  },
  "materials": {
    "glass": {
      "frosted": {
        "background": "rgba(255, 255, 255, 0.65)",
        "backdropBlur": "20px",
        "border": "1px solid rgba(255, 255, 255, 0.85)",
        "shadow": "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
        "innerHighlight": "inset 0 1px 0 rgba(255, 255, 255, 0.9)"
      },
      "solid": {
        "background": "rgba(255, 255, 255, 0.85)",
        "backdropBlur": "10px",
        "border": "1px solid rgba(255, 255, 255, 0.9)",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.06)"
      },
      "subtle": {
        "background": "rgba(255, 255, 255, 0.4)",
        "backdropBlur": "8px",
        "border": "1px solid rgba(255, 255, 255, 0.5)",
        "shadow": "0 2px 8px rgba(0, 0, 0, 0.04)"
      }
    },
    "gradients": {
      "primary": "linear-gradient(135deg, #3BC9DB 0%, #38D9A9 100%)",
      "secondary": "linear-gradient(135deg, #B197FC 0%, #9775FA 100%)",
      "coral": "linear-gradient(135deg, #FF8A80 0%, #FF6B6B 100%)",
      "ambient": "linear-gradient(135deg, rgba(177, 151, 252, 0.3) 0%, rgba(59, 201, 219, 0.3) 100%)"
    }
  },
  "effects": {
    "shadows": {
      "sm": "0 2px 8px rgba(0, 0, 0, 0.04)",
      "md": "0 4px 16px rgba(0, 0, 0, 0.06)",
      "lg": "0 8px 32px rgba(0, 0, 0, 0.08)",
      "xl": "0 16px 48px rgba(0, 0, 0, 0.12)",
      "inner": "inset 0 2px 4px rgba(0, 0, 0, 0.04)",
      "glow": {
        "teal": "0 4px 20px rgba(56, 217, 169, 0.4)",
        "cyan": "0 4px 20px rgba(59, 201, 219, 0.4)",
        "danger": "0 4px 20px rgba(255, 107, 107, 0.4)"
      }
    },
    "blur": {
      "sm": "8px",
      "md": "16px",
      "lg": "20px",
      "xl": "32px"
    },
    "transitions": {
      "fast": "150ms ease-out",
      "base": "200ms ease-out",
      "slow": "300ms ease-out",
      "spring": "400ms cubic-bezier(0.34, 1.56, 0.64, 1)"
    }
  },
  "components": {
    "panel": {
      "default": {
        "background": "rgba(255, 255, 255, 0.65)",
        "backdropFilter": "blur(20px)",
        "border": "1px solid rgba(255, 255, 255, 0.85)",
        "borderRadius": "20px",
        "boxShadow": "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        "padding": "20px"
      },
      "inner": {
        "background": "rgba(255, 255, 255, 0.4)",
        "borderRadius": "12px",
        "boxShadow": "inset 0 2px 4px rgba(0, 0, 0, 0.04)"
      },
      "header": {
        "fontSize": "18px",
        "fontWeight": 600,
        "color": "#1A1A2E",
        "textTransform": "none",
        "letterSpacing": "normal"
      }
    },
    "button": {
      "primary": {
        "background": "linear-gradient(135deg, #3BC9DB 0%, #38D9A9 100%)",
        "color": "#FFFFFF",
        "borderRadius": "999px",
        "fontWeight": 600,
        "boxShadow": "0 4px 15px rgba(56, 217, 169, 0.4)",
        "hoverShadow": "0 6px 20px rgba(56, 217, 169, 0.5)",
        "activeShadow": "0 2px 8px rgba(56, 217, 169, 0.3)"
      },
      "secondary": {
        "background": "rgba(255, 255, 255, 0.7)",
        "color": "#4A4A5A",
        "borderRadius": "999px",
        "border": "1px solid rgba(255, 255, 255, 0.9)",
        "backdropFilter": "blur(10px)",
        "fontWeight": 500
      },
      "danger": {
        "background": "linear-gradient(135deg, #FF8A80 0%, #FF6B6B 100%)",
        "color": "#FFFFFF",
        "borderRadius": "999px",
        "fontWeight": 600,
        "boxShadow": "0 4px 15px rgba(255, 107, 107, 0.4)"
      },
      "sizes": {
        "sm": {
          "height": "36px",
          "paddingX": "16px",
          "fontSize": "14px"
        },
        "md": {
          "height": "44px",
          "paddingX": "24px",
          "fontSize": "16px"
        },
        "lg": {
          "height": "52px",
          "paddingX": "32px",
          "fontSize": "18px"
        }
      }
    },
    "input": {
      "default": {
        "background": "rgba(255, 255, 255, 0.8)",
        "border": "1px solid rgba(255, 255, 255, 0.9)",
        "borderRadius": "12px",
        "color": "#1A1A2E",
        "placeholderColor": "#8A8A9A",
        "focusBorder": "1px solid rgba(59, 201, 219, 0.5)",
        "focusShadow": "0 0 0 3px rgba(59, 201, 219, 0.15)"
      }
    },
    "slider": {
      "track": {
        "height": "8px",
        "background": "rgba(255, 255, 255, 0.5)",
        "borderRadius": "999px"
      },
      "fill": {
        "background": "linear-gradient(90deg, #3BC9DB, #38D9A9)"
      },
      "thumb": {
        "size": "20px",
        "background": "#FFFFFF",
        "boxShadow": "0 2px 8px rgba(0, 0, 0, 0.15)",
        "borderRadius": "999px"
      }
    },
    "toggle": {
      "track": {
        "width": "48px",
        "height": "28px",
        "background": "rgba(0, 0, 0, 0.1)",
        "backgroundActive": "linear-gradient(90deg, #3BC9DB, #38D9A9)",
        "borderRadius": "999px"
      },
      "thumb": {
        "size": "24px",
        "background": "#FFFFFF",
        "boxShadow": "0 2px 4px rgba(0, 0, 0, 0.15)"
      }
    },
    "select": {
      "background": "rgba(255, 255, 255, 0.8)",
      "border": "1px solid rgba(255, 255, 255, 0.9)",
      "borderRadius": "12px",
      "color": "#1A1A2E"
    },
    "modal": {
      "background": "rgba(255, 255, 255, 0.85)",
      "backdropFilter": "blur(24px)",
      "borderRadius": "24px",
      "boxShadow": "0 24px 64px rgba(0, 0, 0, 0.15)",
      "overlay": "rgba(0, 0, 0, 0.3)"
    }
  },
  "interaction": {
    "focus": {
      "ringWidth": "3px",
      "ringColor": "rgba(59, 201, 219, 0.3)",
      "ringOffset": "2px"
    },
    "motion": {
      "transitionMs": 200,
      "easing": "cubic-bezier(0.4, 0, 0.2, 1)",
      "hoverScale": 1.02,
      "activeScale": 0.98
    }
  },
  "accessibility": {
    "contrast": {
      "minTextContrast": 4.5,
      "minLargeTextContrast": 3.0
    },
    "targets": {
      "minTouchTargetPx": 44
    },
    "focusVisibility": {
      "alwaysVisible": true,
      "useOutline": true
    }
  }
}
