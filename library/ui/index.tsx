import { HtmxAttributes } from "../htmx";
import { CSSProperties } from "hono/jsx";

// Utility types for Mantine-like props
type SpacingValue = number | string;
type ColorValue = string;
type SizeValue = "xs" | "sm" | "md" | "lg" | "xl" | number | string;

// Common HTML attributes
type CommonProps = {
  id?: string;
  class?: string;
  className?: string; // Support both class and className
  title?: string;
  tabIndex?: number;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-hidden"?: boolean | "true" | "false";
  "aria-disabled"?: boolean | "true" | "false";
  "aria-expanded"?: boolean | "true" | "false";
  "aria-selected"?: boolean | "true" | "false";
  "data-testid"?: string;
  // Allow any data-* attribute
  [key: `data-${string}`]: string | number | boolean | undefined;
};

type StyleSystemProps = {
  // Dimensions
  w?: SizeValue;
  h?: SizeValue;
  maw?: SizeValue; // max-width
  mah?: SizeValue; // max-height
  miw?: SizeValue; // min-width
  mih?: SizeValue; // min-height

  // Margin
  m?: SpacingValue;
  mt?: SpacingValue;
  mr?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;

  // Padding
  p?: SpacingValue;
  pt?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;

  // Colors
  c?: ColorValue; // color (text)
  bg?: ColorValue; // background

  // Typography
  fz?: SizeValue; // font-size
  fw?: number | "normal" | "bold" | "bolder" | "lighter"; // font-weight
  ta?: "left" | "center" | "right" | "justify"; // text-align
  td?: "none" | "underline" | "line-through"; // text-decoration
  tt?: "uppercase" | "lowercase" | "capitalize" | "none"; // text-transform
  lh?: number | string; // line-height

  // Display & Layout
  display?: CSSProperties["display"];
  opacity?: number;

  // Border
  bd?: string; // border
  bdr?: SizeValue; // border-radius

  // Position
  pos?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: SizeValue;
  right?: SizeValue;
  bottom?: SizeValue;
  left?: SizeValue;
  inset?: SizeValue;

  // Flexbox (when display is flex)
  flex?: string | number;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gap?: SpacingValue;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";

  // Style override
  style?: CSSProperties;
};

// Size presets
const sizePresets: Record<string, string> = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
};

// Spacing scale (can be customized)
const spacingScale = (value: SpacingValue): string => {
  if (typeof value === "number") {
    return `${value * 0.25}rem`; // 1 = 0.25rem, 4 = 1rem (like Tailwind)
  }
  return value;
};

const sizeValue = (value: SizeValue): string => {
  if (typeof value === "number") {
    return `${value}px`;
  }
  return sizePresets[value] || value;
};

// Convert style system props to CSS
const stylePropsToCSS = (props: StyleSystemProps): CSSProperties => {
  const styles: CSSProperties = {};

  // Dimensions
  if (props.w !== undefined) styles.width = sizeValue(props.w);
  if (props.h !== undefined) styles.height = sizeValue(props.h);
  if (props.maw !== undefined) styles.maxWidth = sizeValue(props.maw);
  if (props.mah !== undefined) styles.maxHeight = sizeValue(props.mah);
  if (props.miw !== undefined) styles.minWidth = sizeValue(props.miw);
  if (props.mih !== undefined) styles.minHeight = sizeValue(props.mih);

  // Margin
  if (props.m !== undefined) styles.margin = spacingScale(props.m);
  if (props.mt !== undefined) styles.marginTop = spacingScale(props.mt);
  if (props.mr !== undefined) styles.marginRight = spacingScale(props.mr);
  if (props.mb !== undefined) styles.marginBottom = spacingScale(props.mb);
  if (props.ml !== undefined) styles.marginLeft = spacingScale(props.ml);
  if (props.mx !== undefined) {
    styles.marginLeft = spacingScale(props.mx);
    styles.marginRight = spacingScale(props.mx);
  }
  if (props.my !== undefined) {
    styles.marginTop = spacingScale(props.my);
    styles.marginBottom = spacingScale(props.my);
  }

  // Padding
  if (props.p !== undefined) styles.padding = spacingScale(props.p);
  if (props.pt !== undefined) styles.paddingTop = spacingScale(props.pt);
  if (props.pr !== undefined) styles.paddingRight = spacingScale(props.pr);
  if (props.pb !== undefined) styles.paddingBottom = spacingScale(props.pb);
  if (props.pl !== undefined) styles.paddingLeft = spacingScale(props.pl);
  if (props.px !== undefined) {
    styles.paddingLeft = spacingScale(props.px);
    styles.paddingRight = spacingScale(props.px);
  }
  if (props.py !== undefined) {
    styles.paddingTop = spacingScale(props.py);
    styles.paddingBottom = spacingScale(props.py);
  }

  // Colors
  if (props.c !== undefined) styles.color = props.c;
  if (props.bg !== undefined) styles.backgroundColor = props.bg;

  // Typography
  if (props.fz !== undefined) styles.fontSize = sizeValue(props.fz);
  if (props.fw !== undefined) styles.fontWeight = props.fw;
  if (props.ta !== undefined) styles.textAlign = props.ta;
  if (props.td !== undefined) styles.textDecoration = props.td;
  if (props.tt !== undefined) styles.textTransform = props.tt;
  if (props.lh !== undefined) styles.lineHeight = props.lh;

  // Display
  if (props.display !== undefined) styles.display = props.display;
  if (props.opacity !== undefined) styles.opacity = props.opacity;

  // Border
  if (props.bd !== undefined) styles.border = props.bd;
  if (props.bdr !== undefined) styles.borderRadius = sizeValue(props.bdr);

  // Position
  if (props.pos !== undefined) styles.position = props.pos;
  if (props.top !== undefined) styles.top = sizeValue(props.top);
  if (props.right !== undefined) styles.right = sizeValue(props.right);
  if (props.bottom !== undefined) styles.bottom = sizeValue(props.bottom);
  if (props.left !== undefined) styles.left = sizeValue(props.left);
  if (props.inset !== undefined) styles.inset = sizeValue(props.inset);

  // Flexbox
  if (props.flex !== undefined) styles.flex = props.flex;
  if (props.direction !== undefined) styles.flexDirection = props.direction;
  if (props.align !== undefined) styles.alignItems = props.align;
  if (props.justify !== undefined) styles.justifyContent = props.justify;
  if (props.gap !== undefined) styles.gap = spacingScale(props.gap);
  if (props.wrap !== undefined) styles.flexWrap = props.wrap;

  // Merge with custom styles
  if (props.style) {
    Object.assign(styles, props.style);
  }

  return styles;
};

// Helper to extract common props
const extractCommonProps = (props: any): [CommonProps, any] => {
  const commonPropKeys = [
    "id",
    "class",
    "className",
    "title",
    "tabIndex",
    "role",
    "aria-label",
    "aria-labelledby",
    "aria-describedby",
    "aria-hidden",
    "aria-disabled",
    "aria-expanded",
    "aria-selected",
    "data-testid",
  ];

  const commonProps: CommonProps = {};
  const remainingProps: any = {};

  for (const [key, value] of Object.entries(props)) {
    if (commonPropKeys.includes(key) || key.startsWith("data-")) {
      (commonProps as any)[key] = value;
    } else {
      remainingProps[key] = value;
    }
  }

  return [commonProps, remainingProps];
};

// Helper to separate HTMX and style props
const separateProps = (props: any) => {
  const htmxAttrs: any = {};
  const styleProps: StyleSystemProps = {};
  const otherProps: any = {};

  const styleKeys = [
    "w",
    "h",
    "maw",
    "mah",
    "miw",
    "mih",
    "m",
    "mt",
    "mr",
    "mb",
    "ml",
    "mx",
    "my",
    "p",
    "pt",
    "pr",
    "pb",
    "pl",
    "px",
    "py",
    "c",
    "bg",
    "fz",
    "fw",
    "ta",
    "td",
    "tt",
    "lh",
    "display",
    "opacity",
    "bd",
    "bdr",
    "pos",
    "top",
    "right",
    "bottom",
    "left",
    "inset",
    "flex",
    "direction",
    "align",
    "justify",
    "gap",
    "wrap",
    "style",
  ];

  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("hx-")) {
      htmxAttrs[key] = value;
    } else if (styleKeys.includes(key)) {
      (styleProps as any)[key] = value;
    } else {
      otherProps[key] = value;
    }
  }

  return { htmxAttrs, styleProps, otherProps };
};

// Component prop types with style system
type TextProps = StyleSystemProps &
  CommonProps & {
    text?: string;
    children?: any;
    component?: "span" | "p" | "div" | "label" | "strong" | "em" | "small";
  };

type ButtonProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes & {
    onClick?: () => Promise<void>;
    children: any;
    type?: "button" | "submit" | "reset";
    name?: string;
    value?: string;
    variant?: "filled" | "outline" | "subtle" | "light";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    disabled?: boolean;
    form?: string;
  };

type InputProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes & {
    type?: string;
    name: string;
    value?: string;
    placeholder?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
    autocomplete?: string;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    pattern?: string;
    maxLength?: number;
    minLength?: number;
  };

type BoxProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes & {
    children?: any;
    component?: string; // e.g., "div", "section", "article", "main", "aside", "header", "footer", "nav"
  };

type StackProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes & {
    children?: any;
    spacing?: SpacingValue;
  };

type GroupProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes & {
    children?: any;
    spacing?: SpacingValue;
  };

type ContainerProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes & {
    children?: any;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  };

type GridProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes & {
    children?: any;
    cols?: number;
    spacing?: SpacingValue;
  };

export const UI = {
  Text: ({ text, children, component = "span", ...allProps }: TextProps) => {
    const [commonProps, remainingProps] = extractCommonProps(allProps);
    const styles = stylePropsToCSS(remainingProps);
    const className = commonProps.className || commonProps.class;
    const Component = component as any;

    return (
      <Component {...commonProps} class={className} style={styles}>
        {text || children}
      </Component>
    );
  },

  Button: ({
    onClick,
    children,
    type = "button",
    variant = "filled",
    size = "md",
    disabled = false,
    ...allProps
  }: ButtonProps) => {
    const [commonProps, remainingProps] = extractCommonProps(allProps);
    const { htmxAttrs, styleProps, otherProps } = separateProps(remainingProps);
    const className = commonProps.className || commonProps.class;

    // Button size presets
    const sizeStyles: Record<string, StyleSystemProps> = {
      xs: { px: 2, py: 1, fz: "xs" },
      sm: { px: 3, py: 1.5, fz: "sm" },
      md: { px: 4, py: 2, fz: "md" },
      lg: { px: 5, py: 2.5, fz: "lg" },
      xl: { px: 6, py: 3, fz: "xl" },
    };

    const variantStyles: Record<string, StyleSystemProps> = {
      filled: { bg: "#228be6", c: "white", bd: "none" },
      outline: { bg: "transparent", c: "#228be6", bd: "1px solid #228be6" },
      subtle: { bg: "#e7f5ff", c: "#228be6", bd: "none" },
      light: { bg: "transparent", c: "#228be6", bd: "none" },
    };

    const buttonStyles = {
      ...sizeStyles[size],
      ...variantStyles[variant],
      bdr: "4px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      ...styleProps,
    };

    const styles = stylePropsToCSS(buttonStyles);

    return (
      <button
        {...commonProps}
        {...otherProps}
        class={className}
        type={type}
        style={styles}
        disabled={disabled}
        {...htmxAttrs}
      >
        {children}
      </button>
    );
  },

  Input: ({ size = "md", disabled = false, ...allProps }: InputProps) => {
    const [commonProps, remainingProps] = extractCommonProps(allProps);
    const { htmxAttrs, styleProps, otherProps } = separateProps(remainingProps);
    const className = commonProps.className || commonProps.class;

    const sizeStyles: Record<string, StyleSystemProps> = {
      xs: { px: 2, py: 1, fz: "xs", h: 30 },
      sm: { px: 3, py: 1.5, fz: "sm", h: 36 },
      md: { px: 4, py: 2, fz: "md", h: 42 },
      lg: { px: 5, py: 2.5, fz: "lg", h: 50 },
      xl: { px: 6, py: 3, fz: "xl", h: 60 },
    };

    const inputStyles = {
      ...sizeStyles[size],
      bd: "1px solid #ced4da",
      bdr: "4px",
      bg: disabled ? "#f1f3f5" : "white",
      c: disabled ? "#868e96" : "black",
      ...styleProps,
    };

    const styles = stylePropsToCSS(inputStyles);

    return (
      <input
        {...commonProps}
        {...otherProps}
        class={className}
        style={styles}
        disabled={disabled}
        {...htmxAttrs}
      />
    );
  },

  Box: ({ children, component = "div", ...allProps }: BoxProps) => {
    const [commonProps, remainingProps] = extractCommonProps(allProps);
    const { htmxAttrs, styleProps } = separateProps(remainingProps);
    const className = commonProps.className || commonProps.class;
    const styles = stylePropsToCSS(styleProps);
    const Component = component as any;

    return (
      <Component
        {...commonProps}
        class={className}
        style={styles}
        {...htmxAttrs}
      >
        {children}
      </Component>
    );
  },

  Stack: ({ children, spacing = 4, ...allProps }: StackProps) => {
    const stackProps: any = {
      display: "flex",
      direction: "column",
      gap: spacing,
      ...allProps,
    };

    return <UI.Box {...stackProps}>{children}</UI.Box>;
  },

  Group: ({ children, spacing = 4, ...allProps }: GroupProps) => {
    const groupProps: any = {
      display: "flex",
      direction: "row",
      align: "center",
      gap: spacing,
      ...allProps,
    };

    return <UI.Box {...groupProps}>{children}</UI.Box>;
  },

  Container: ({ children, size = "lg", ...allProps }: ContainerProps) => {
    const sizeMap: Record<string, number> = {
      xs: 540,
      sm: 720,
      md: 960,
      lg: 1140,
      xl: 1320,
    };

    const containerProps: any = {
      maw: typeof size === "number" ? size : sizeMap[size],
      mx: "auto",
      px: 4,
      ...allProps,
    };

    return <UI.Box {...containerProps}>{children}</UI.Box>;
  },

  Grid: ({ children, cols = 12, spacing = 4, ...allProps }: GridProps) => {
    const gridProps: any = {
      display: "grid",
      style: {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      },
      gap: spacing,
      ...allProps,
    };

    return <UI.Box {...gridProps}>{children}</UI.Box>;
  },
};
