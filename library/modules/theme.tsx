// library/modules/theme.tsx
import { HtmxAttributes } from "../htmx/index.tsx";
import { CSSProperties } from "hono/jsx";

// Re-export types for convenience
export type SpacingValue = number | string;
export type ColorValue = string;
export type SizeValue =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | number
  | (string & {});

export type CommonProps = {
  id?: string;
  class?: string;
  className?: string;
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
  [key: `data-${string}`]: string | number | boolean | undefined;
};

export type StyleSystemProps = {
  w?: SizeValue;
  h?: SizeValue;
  maw?: SizeValue;
  mah?: SizeValue;
  miw?: SizeValue;
  mih?: SizeValue;
  m?: SpacingValue;
  mt?: SpacingValue;
  mr?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
  p?: SpacingValue;
  pt?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
  c?: ColorValue;
  bg?: ColorValue;
  fz?: SizeValue;
  fw?: number | "normal" | "bold" | "bolder" | "lighter";
  ta?: "left" | "center" | "right" | "justify";
  td?: "none" | "underline" | "line-through";
  tt?: "uppercase" | "lowercase" | "capitalize" | "none";
  lh?: number | string;
  display?: CSSProperties["display"];
  opacity?: number;
  bd?: string;
  bdr?: SizeValue;
  pos?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: SizeValue;
  right?: SizeValue;
  bottom?: SizeValue;
  left?: SizeValue;
  inset?: SizeValue;
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
  style?: CSSProperties;
  cursor?: CSSProperties["cursor"];
};

export type PseudoProps = {
  hover?: Partial<StyleSystemProps>;
  active?: Partial<StyleSystemProps>;
  focus?: Partial<StyleSystemProps>;
  disabled?: Partial<StyleSystemProps>;
};

export type TextProps = StyleSystemProps &
  CommonProps &
  PseudoProps & {
    text?: string;
    children?: any;
    component?: "span" | "p" | "div" | "label" | "strong" | "em" | "small";
  };

export type ButtonProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes &
  PseudoProps & {
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

export type InputProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes &
  PseudoProps & {
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

export type BoxProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes &
  PseudoProps & {
    children?: any;
    component?: string;
  };

export type StackProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes &
  PseudoProps & {
    children?: any;
    spacing?: SpacingValue;
  };

export type GroupProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes &
  PseudoProps & {
    children?: any;
    spacing?: SpacingValue;
  };

export type ContainerProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes &
  PseudoProps & {
    children?: any;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  };

export type GridProps = StyleSystemProps &
  CommonProps &
  HtmxAttributes &
  PseudoProps & {
    children?: any;
    cols?: number;
    spacing?: SpacingValue;
  };

// Helper utilities
const sizePresets: Record<string, string> = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
};

const spacingScale = (value: SpacingValue): string => {
  if (typeof value === "number") {
    return `${value * 0.25}rem`;
  }
  return value;
};

const sizeValue = (value: SizeValue): string => {
  if (typeof value === "number") {
    return `${value}px`;
  }
  return sizePresets[value] || value;
};

let classCounter = 0;
const generateClassName = (prefix: string = "ui") => {
  return `${prefix}-${++classCounter}`;
};

const stylePropsToCSS = (props: StyleSystemProps): string => {
  const rules: string[] = [];

  if (props.w !== undefined) rules.push(`width: ${sizeValue(props.w)}`);
  if (props.h !== undefined) rules.push(`height: ${sizeValue(props.h)}`);
  if (props.maw !== undefined) rules.push(`max-width: ${sizeValue(props.maw)}`);
  if (props.mah !== undefined)
    rules.push(`max-height: ${sizeValue(props.mah)}`);
  if (props.miw !== undefined) rules.push(`min-width: ${sizeValue(props.miw)}`);
  if (props.mih !== undefined)
    rules.push(`min-height: ${sizeValue(props.mih)}`);

  if (props.m !== undefined) rules.push(`margin: ${spacingScale(props.m)}`);
  if (props.mt !== undefined)
    rules.push(`margin-top: ${spacingScale(props.mt)}`);
  if (props.mr !== undefined)
    rules.push(`margin-right: ${spacingScale(props.mr)}`);
  if (props.mb !== undefined)
    rules.push(`margin-bottom: ${spacingScale(props.mb)}`);
  if (props.ml !== undefined)
    rules.push(`margin-left: ${spacingScale(props.ml)}`);
  if (props.mx !== undefined) {
    rules.push(`margin-left: ${spacingScale(props.mx)}`);
    rules.push(`margin-right: ${spacingScale(props.mx)}`);
  }
  if (props.my !== undefined) {
    rules.push(`margin-top: ${spacingScale(props.my)}`);
    rules.push(`margin-bottom: ${spacingScale(props.my)}`);
  }

  if (props.p !== undefined) rules.push(`padding: ${spacingScale(props.p)}`);
  if (props.pt !== undefined)
    rules.push(`padding-top: ${spacingScale(props.pt)}`);
  if (props.pr !== undefined)
    rules.push(`padding-right: ${spacingScale(props.pr)}`);
  if (props.pb !== undefined)
    rules.push(`padding-bottom: ${spacingScale(props.pb)}`);
  if (props.pl !== undefined)
    rules.push(`padding-left: ${spacingScale(props.pl)}`);
  if (props.px !== undefined) {
    rules.push(`padding-left: ${spacingScale(props.px)}`);
    rules.push(`padding-right: ${spacingScale(props.px)}`);
  }
  if (props.py !== undefined) {
    rules.push(`padding-top: ${spacingScale(props.py)}`);
    rules.push(`padding-bottom: ${spacingScale(props.py)}`);
  }

  if (props.c !== undefined) rules.push(`color: ${props.c}`);
  if (props.bg !== undefined) rules.push(`background-color: ${props.bg}`);

  if (props.fz !== undefined) rules.push(`font-size: ${sizeValue(props.fz)}`);
  if (props.fw !== undefined) rules.push(`font-weight: ${props.fw}`);
  if (props.ta !== undefined) rules.push(`text-align: ${props.ta}`);
  if (props.td !== undefined) rules.push(`text-decoration: ${props.td}`);
  if (props.tt !== undefined) rules.push(`text-transform: ${props.tt}`);
  if (props.lh !== undefined) rules.push(`line-height: ${props.lh}`);

  if (props.display !== undefined) rules.push(`display: ${props.display}`);
  if (props.opacity !== undefined) rules.push(`opacity: ${props.opacity}`);

  if (props.bd !== undefined) rules.push(`border: ${props.bd}`);
  if (props.bdr !== undefined)
    rules.push(`border-radius: ${sizeValue(props.bdr)}`);

  if (props.pos !== undefined) rules.push(`position: ${props.pos}`);
  if (props.top !== undefined) rules.push(`top: ${sizeValue(props.top)}`);
  if (props.right !== undefined) rules.push(`right: ${sizeValue(props.right)}`);
  if (props.bottom !== undefined)
    rules.push(`bottom: ${sizeValue(props.bottom)}`);
  if (props.left !== undefined) rules.push(`left: ${sizeValue(props.left)}`);
  if (props.inset !== undefined) rules.push(`inset: ${sizeValue(props.inset)}`);

  if (props.flex !== undefined) rules.push(`flex: ${props.flex}`);
  if (props.direction !== undefined)
    rules.push(`flex-direction: ${props.direction}`);
  if (props.align !== undefined) rules.push(`align-items: ${props.align}`);
  if (props.justify !== undefined)
    rules.push(`justify-content: ${props.justify}`);
  if (props.gap !== undefined) rules.push(`gap: ${spacingScale(props.gap)}`);
  if (props.wrap !== undefined) rules.push(`flex-wrap: ${props.wrap}`);

  return rules.join("; ");
};

const generateCSS = (
  className: string,
  baseProps: StyleSystemProps,
  pseudoProps?: PseudoProps
): string => {
  let css = `.${className} { ${stylePropsToCSS(baseProps)} }`;

  if (pseudoProps?.hover) {
    css += ` .${className}:hover { ${stylePropsToCSS(pseudoProps.hover)} }`;
  }
  if (pseudoProps?.active) {
    css += ` .${className}:active { ${stylePropsToCSS(pseudoProps.active)} }`;
  }
  if (pseudoProps?.focus) {
    css += ` .${className}:focus { ${stylePropsToCSS(pseudoProps.focus)} }`;
  }
  if (pseudoProps?.disabled) {
    css += ` .${className}:disabled { ${stylePropsToCSS(
      pseudoProps.disabled
    )} }`;
  }

  return css;
};

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

const separateProps = (props: any) => {
  const htmxAttrs: any = {};
  const styleProps: StyleSystemProps = {};
  const pseudoProps: PseudoProps = {};
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
    "cursor",
  ];

  const pseudoKeys = ["hover", "active", "focus", "disabled"];

  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("hx-")) {
      htmxAttrs[key] = value;
    } else if (pseudoKeys.includes(key)) {
      (pseudoProps as any)[key] = value;
    } else if (styleKeys.includes(key)) {
      (styleProps as any)[key] = value;
    } else {
      otherProps[key] = value;
    }
  }

  return { htmxAttrs, styleProps, pseudoProps, otherProps };
};

// Helper utilities object
export type ThemeHelpers = {
  generateClassName: typeof generateClassName;
  generateCSS: typeof generateCSS;
  stylePropsToCSS: typeof stylePropsToCSS;
  extractCommonProps: typeof extractCommonProps;
  separateProps: typeof separateProps;
  spacingScale: typeof spacingScale;
  sizeValue: typeof sizeValue;
};

export const helpers: ThemeHelpers = {
  generateClassName,
  generateCSS,
  stylePropsToCSS,
  extractCommonProps,
  separateProps,
  spacingScale,
  sizeValue,
};

// Component renderer type
type ComponentRenderer<P> = (props: P, helpers: ThemeHelpers) => any;

// Theme configuration type
export type ThemeConfig = {
  Text?: ComponentRenderer<TextProps>;
  Button?: ComponentRenderer<ButtonProps>;
  Input?: ComponentRenderer<InputProps>;
  Box?: ComponentRenderer<BoxProps>;
  Stack?: ComponentRenderer<StackProps>;
  Group?: ComponentRenderer<GroupProps>;
  Container?: ComponentRenderer<ContainerProps>;
  Grid?: ComponentRenderer<GridProps>;
};

// Default component implementations
const defaultComponents = {
  Text: (
    { text, children, component = "span", ...allProps }: TextProps,
    helpers: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = helpers.extractCommonProps(allProps);
    const { styleProps, pseudoProps } = helpers.separateProps(remainingProps);
    const className = helpers.generateClassName("text");
    const userClass = commonProps.className || commonProps.class;
    const finalClass = userClass ? `${className} ${userClass}` : className;
    const css = helpers.generateCSS(className, styleProps, pseudoProps);
    const Component = component as any;

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <Component {...commonProps} class={finalClass}>
          {text || children}
        </Component>
      </>
    );
  },

  Button: (
    {
      children,
      type = "button",
      variant = "filled",
      size = "md",
      disabled = false,
      ...allProps
    }: ButtonProps,
    helpers: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = helpers.extractCommonProps(allProps);
    const { htmxAttrs, styleProps, pseudoProps, otherProps } =
      helpers.separateProps(remainingProps);
    const className = helpers.generateClassName("btn");
    const userClass = commonProps.className || commonProps.class;
    const finalClass = userClass ? `${className} ${userClass}` : className;

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
      ...styleProps,
    };

    const defaultPseudoProps: PseudoProps = {
      hover:
        variant === "filled"
          ? { bg: "#1c7ed6" }
          : variant === "outline"
          ? { bg: "#e7f5ff" }
          : {},
      active: variant === "filled" ? { bg: "#1971c2" } : {},
      disabled: { opacity: 0.6, cursor: "not-allowed" },
      ...pseudoProps,
    };

    const css = helpers.generateCSS(
      className,
      buttonStyles,
      defaultPseudoProps
    );

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <button
          {...commonProps}
          {...otherProps}
          class={finalClass}
          type={type}
          disabled={disabled}
          {...htmxAttrs}
        >
          {children}
        </button>
      </>
    );
  },

  Input: (
    { size = "md", disabled = false, ...allProps }: InputProps,
    helpers: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = helpers.extractCommonProps(allProps);
    const { htmxAttrs, styleProps, pseudoProps, otherProps } =
      helpers.separateProps(remainingProps);
    const className = helpers.generateClassName("input");
    const userClass = commonProps.className || commonProps.class;
    const finalClass = userClass ? `${className} ${userClass}` : className;

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

    const defaultPseudoProps: PseudoProps = {
      focus: { bd: "1px solid #228be6" },
      disabled: { bg: "#f1f3f5", c: "#868e96", cursor: "not-allowed" },
      ...pseudoProps,
    };

    const css = helpers.generateCSS(className, inputStyles, defaultPseudoProps);

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <input
          {...commonProps}
          {...otherProps}
          class={finalClass}
          disabled={disabled}
          {...htmxAttrs}
        />
      </>
    );
  },

  Box: (
    { children, component = "div", ...allProps }: BoxProps,
    helpers: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = helpers.extractCommonProps(allProps);
    const { htmxAttrs, styleProps, pseudoProps } =
      helpers.separateProps(remainingProps);
    const className = helpers.generateClassName("box");
    const userClass = commonProps.className || commonProps.class;
    const finalClass = userClass ? `${className} ${userClass}` : className;
    const css = helpers.generateCSS(className, styleProps, pseudoProps);
    const Component = component as any;

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <Component {...commonProps} class={finalClass} {...htmxAttrs}>
          {children}
        </Component>
      </>
    );
  },
};

// Create theme function
export const createTheme = (config: ThemeConfig = {}) => {
  const theme = {
    Text: (props: TextProps) => {
      const renderer = config.Text || defaultComponents.Text;
      return renderer(props, helpers);
    },
    Button: (props: ButtonProps) => {
      const renderer = config.Button || defaultComponents.Button;
      return renderer(props, helpers);
    },
    Input: (props: InputProps) => {
      const renderer = config.Input || defaultComponents.Input;
      return renderer(props, helpers);
    },
    Box: (props: BoxProps) => {
      const renderer = config.Box || defaultComponents.Box;
      return renderer(props, helpers);
    },
    Stack: (props: StackProps) => {
      const renderer =
        config.Stack ||
        ((props: StackProps, _: ThemeHelpers) => {
          const { spacing = 4, ...rest } = props;
          return theme.Box({
            display: "flex",
            direction: "column",
            gap: spacing,
            ...rest,
          });
        });
      return renderer(props, helpers);
    },
    Group: (props: GroupProps) => {
      const renderer =
        config.Group ||
        ((props: GroupProps, _: ThemeHelpers) => {
          const { spacing = 4, ...rest } = props;
          return theme.Box({
            display: "flex",
            direction: "row",
            align: "center",
            gap: spacing,
            ...rest,
          });
        });
      return renderer(props, helpers);
    },
    Container: (props: ContainerProps) => {
      const renderer =
        config.Container ||
        ((props: ContainerProps, _: ThemeHelpers) => {
          const { size = "lg", ...rest } = props;
          const sizeMap: Record<string, number> = {
            xs: 540,
            sm: 720,
            md: 960,
            lg: 1140,
            xl: 1320,
          };
          return theme.Box({
            maw: typeof size === "number" ? size : sizeMap[size],
            mx: "auto",
            px: 4,
            ...rest,
          });
        });
      return renderer(props, helpers);
    },
    Grid: (props: GridProps) => {
      const renderer =
        config.Grid ||
        ((props: GridProps, _: ThemeHelpers) => {
          const { cols = 12, spacing = 4, ...rest } = props;
          return theme.Box({
            display: "grid",
            style: { gridTemplateColumns: `repeat(${cols}, 1fr)` },
            gap: spacing,
            ...rest,
          });
        });
      return renderer(props, helpers);
    },
  };

  return theme;
};
