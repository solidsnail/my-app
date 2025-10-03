import { HtmxAttributes } from "../htmx";
import { CSSProperties } from "hono/jsx";

// Utility types for Mantine-like props
type SpacingValue = number | string;
type ColorValue = string;
type SizeValue = "xs" | "sm" | "md" | "lg" | "xl" | number | string;

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

// Generate a simple hash for class names
const hashString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 6);
};

// Component prop types with style system
type TextProps = StyleSystemProps & {
  text?: string;
  children?: any;
  class?: string;
};

type ButtonProps = StyleSystemProps &
  HtmxAttributes & {
    onClick?: () => Promise<void>;
    children: any;
    class?: string;
    type?: "button" | "submit" | "reset";
    name?: string;
    value?: string;
    variant?: "filled" | "outline" | "subtle" | "light";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    disabled?: boolean;
  };

type InputProps = StyleSystemProps &
  HtmxAttributes & {
    type?: string;
    name: string;
    value?: string;
    placeholder?: string;
    class?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    disabled?: boolean;
    required?: boolean;
  };

type BoxProps = StyleSystemProps &
  HtmxAttributes & {
    children?: any;
    id?: string;
    class?: string;
    component?: string; // e.g., "div", "section", "article"
  };

type StackProps = StyleSystemProps &
  HtmxAttributes & {
    children?: any;
    class?: string;
    spacing?: SpacingValue;
  };

type GroupProps = StyleSystemProps &
  HtmxAttributes & {
    children?: any;
    class?: string;
    spacing?: SpacingValue;
  };

export const UI = {
  Text: ({ text, children, class: className, ...styleProps }: TextProps) => {
    const styles = stylePropsToCSS(styleProps);
    return (
      <span class={className} style={styles}>
        {text || children}
      </span>
    );
  },

  Button: ({
    onClick,
    children,
    class: className,
    type = "button",
    variant = "filled",
    size = "md",
    disabled = false,
    ...props
  }: ButtonProps) => {
    const { style, ...styleSystemProps } = props;
    const htmxAttrs: any = {};
    const styleProps: StyleSystemProps = {};

    // Separate HTMX attributes from style props
    for (const [key, value] of Object.entries(props)) {
      if (key.startsWith("hx-")) {
        htmxAttrs[key] = value;
      } else if (
        [
          "w",
          "h",
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
          "style",
        ].includes(key)
      ) {
        (styleProps as any)[key] = value;
      }
    }

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

  Input: ({
    class: className,
    size = "md",
    disabled = false,
    ...props
  }: InputProps) => {
    const htmxAttrs: any = {};
    const styleProps: StyleSystemProps = {};

    for (const [key, value] of Object.entries(props)) {
      if (key.startsWith("hx-")) {
        htmxAttrs[key] = value;
      } else if (
        [
          "w",
          "h",
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
          "bd",
          "bdr",
          "style",
        ].includes(key)
      ) {
        (styleProps as any)[key] = value;
      }
    }

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
    const inputProps: any = {};

    for (const [key, value] of Object.entries(props)) {
      if (
        !key.startsWith("hx-") &&
        ![
          "w",
          "h",
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
          "bd",
          "bdr",
          "style",
          "size",
        ].includes(key)
      ) {
        inputProps[key] = value;
      }
    }

    return (
      <input
        class={className}
        style={styles}
        disabled={disabled}
        {...inputProps}
        {...htmxAttrs}
      />
    );
  },

  Box: ({
    children,
    class: className,
    component = "div",
    ...props
  }: BoxProps) => {
    const htmxAttrs: any = {};
    const styleProps: StyleSystemProps = {};

    for (const [key, value] of Object.entries(props)) {
      if (key.startsWith("hx-")) {
        htmxAttrs[key] = value;
      } else {
        (styleProps as any)[key] = value;
      }
    }

    const styles = stylePropsToCSS(styleProps);
    const Component = component as any;

    return (
      <Component class={className} style={styles} {...htmxAttrs}>
        {children}
      </Component>
    );
  },

  Stack: ({
    children,
    class: className,
    spacing = 4,
    ...props
  }: StackProps) => {
    const stackProps: StyleSystemProps = {
      display: "flex",
      direction: "column",
      gap: spacing,
      ...props,
    };

    return (
      <UI.Box class={className} {...stackProps}>
        {children}
      </UI.Box>
    );
  },

  Group: ({
    children,
    class: className,
    spacing = 4,
    ...props
  }: GroupProps) => {
    const groupProps: StyleSystemProps = {
      display: "flex",
      direction: "row",
      align: "center",
      gap: spacing,
      ...props,
    };

    return (
      <UI.Box class={className} {...groupProps}>
        {children}
      </UI.Box>
    );
  },
};
