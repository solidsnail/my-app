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

export type AlertProps = StyleSystemProps &
  CommonProps &
  PseudoProps & {
    children: any;
    variant?: "info" | "success" | "warning" | "error";
    icon?: any;
    title?: string;
  };

export type AccordionProps = StyleSystemProps &
  CommonProps &
  PseudoProps & {
    children: any;
    summary: string;
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
  if (props.cursor !== undefined) rules.push(`cursor: ${props.cursor}`);

  if (props.style) {
    for (const [key, value] of Object.entries(props.style)) {
      if (value === undefined || value === null) continue;
      const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      rules.push(`${cssKey}: ${value}`);
    }
  }

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

type ComponentRenderer<P> = (props: P, helpers: ThemeHelpers) => any;

export type ThemeConfig = {
  Accordion?: ComponentRenderer<AccordionProps>;
  Text?: ComponentRenderer<TextProps>;
  Alert?: ComponentRenderer<AlertProps>;
  Button?: ComponentRenderer<ButtonProps>;
  Input?: ComponentRenderer<InputProps>;
  Box?: ComponentRenderer<BoxProps>;
  Stack?: ComponentRenderer<StackProps>;
  Group?: ComponentRenderer<GroupProps>;
  Container?: ComponentRenderer<ContainerProps>;
  Grid?: ComponentRenderer<GridProps>;
};

const fontFamily = "monospace";
const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
};

// 🎨 Centralized color palette
const palette = {
  black: "#000000",
  white: "#ffffff",
  gray: {
    50: "#f9f9f9",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#cccccc",
    400: "#999999",
    500: "#666666",
    600: "#333333",
  },
  red: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
  },
};

const defaultComponents = {
  Alert: (
    { children, title, icon, ...allProps }: AlertProps,
    helpers: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = helpers.extractCommonProps(allProps);
    const { styleProps } = helpers.separateProps(remainingProps);
    const className = helpers.generateClassName("alert");

    // Alert base styles
    const baseStyles: StyleSystemProps = {
      bd: `1px solid ${palette.gray[200]}`,
      display: "flex",
      direction: "column",
      p: 3,
      style: { fontFamily, fontSize: fontSizes.md },
      ...styleProps,
    };

    const pseudo: PseudoProps = {};

    const css = helpers.generateCSS(className, baseStyles, pseudo);
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <div role="alert" {...commonProps} class={className}>
          {title && <b>{title}</b>}
          {children}
        </div>
      </>
    );
  },
  Accordion: (
    { children, summary = "Accordion", ...allProps }: AccordionProps,
    helpers: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = helpers.extractCommonProps(allProps);
    const { styleProps, pseudoProps } = helpers.separateProps(remainingProps);
    const className = helpers.generateClassName("accordion");
    const summaryClass = helpers.generateClassName("accordion-summary");
    const contentClass = helpers.generateClassName("accordion-content");
    const chevronClass = helpers.generateClassName("accordion-summary-chevron");

    // Accordion base styles
    const baseStyles: StyleSystemProps = {
      bg: palette.white,
      mb: 2,
      style: {
        fontFamily,
        fontSize: fontSizes.md,
        borderBottom: `1px solid ${palette.gray[300]}`,
      },
      ...styleProps,
    };

    const pseudo: PseudoProps = {
      hover: {
        style: {
          borderBottom: `1px solid ${palette.gray[400]}`,
        },
      },
      ...pseudoProps,
    };

    const summaryStyles: StyleSystemProps = {
      cursor: "default",
      ta: "left",
      display: "flex",
      justify: "space-between",
      p: 3,
      style: { listStyle: "none", userSelect: "none" },
    };
    const chevronStyles: StyleSystemProps = {
      c: palette.gray[600],
      display: "inline-block",
      style: {
        transform: "rotate(90deg)",
        transition: "transform 150ms ease-in-out",
      },
    };
    const contentStyles: StyleSystemProps = {
      p: 3,
    };

    const summaryPseudo: PseudoProps = {
      focus: {
        style: {
          outline: `2px solid ${palette.gray[500]}`,
          outlineOffset: "2px",
        },
      },
      ...pseudoProps,
    };

    const css = [
      helpers.generateCSS(className, baseStyles, pseudo),
      helpers.generateCSS(summaryClass, summaryStyles, summaryPseudo),
      helpers.generateCSS(contentClass, contentStyles),
      helpers.generateCSS(chevronClass, chevronStyles),
      `.${className}[open] .${chevronClass} { transform: rotate(-90deg); }`,
    ].join(" ");

    return (
      <details {...commonProps} class={className}>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <summary class={summaryClass}>
          {summary}
          <span class={chevronClass}>❯</span>
        </summary>
        <div class={contentClass}>{children}</div>
      </details>
    );
  },
  Text: (
    { text, children, component = "span", ...allProps }: TextProps,
    helpers: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = helpers.extractCommonProps(allProps);
    const { styleProps, pseudoProps } = helpers.separateProps(remainingProps);
    const className = helpers.generateClassName("text");

    // Wireframe monospace styling
    const wireframeStyles = {
      c: palette.black,
      ...styleProps,
      style: {
        fontFamily,
        fontSize: fontSizes.md,
        ...styleProps.style,
      },
    };

    const css = helpers.generateCSS(className, wireframeStyles, pseudoProps);
    const Component = component as any;

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <Component {...commonProps} class={className}>
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

    const sizeStyles: Record<string, StyleSystemProps> = {
      xs: { px: 2, py: 1, fz: "xs" },
      sm: { px: 3, py: 1.5, fz: "sm" },
      md: { px: 4, py: 2, fz: "md" },
      lg: { px: 5, py: 2.5, fz: "lg" },
      xl: { px: 6, py: 3, fz: "xl" },
    };

    // Wireframe black and white variants
    const variantStyles: Record<string, StyleSystemProps> = {
      filled: {
        bg: palette.black,
        c: palette.white,
        bd: `2px solid ${palette.black}`,
      },
      outline: {
        bg: palette.white,
        c: palette.black,
        bd: `2px solid ${palette.black}`,
      },
      subtle: {
        bg: palette.gray[100],
        c: palette.black,
        bd: `1px solid ${palette.gray[300]}`,
      },
      light: {
        bg: "transparent",
        c: palette.black,
        bd: `1px solid transparent`,
      },
    };

    const buttonStyles = {
      ...sizeStyles[size],
      ...variantStyles[variant],
      bdr: "0px",
      cursor: disabled ? "not-allowed" : "default",
      ...styleProps,
      style: {
        fontFamily,
        fontSize: fontSizes.md,
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
        ...styleProps.style,
      },
    };

    const defaultPseudoProps: PseudoProps = {
      hover:
        variant === "filled"
          ? { bg: palette.gray[600] }
          : variant === "outline"
          ? { bg: palette.gray[100] }
          : variant === "subtle"
          ? { bg: palette.gray[200] }
          : { bg: palette.gray[100] },
      active:
        variant === "filled"
          ? { bg: palette.black, bd: `2px solid ${palette.black}` }
          : { bg: palette.gray[200] },
      disabled: { opacity: 0.4, cursor: "not-allowed" },
      focus: {
        style: {
          outline: `2px solid ${palette.gray[500]}`,
          outlineOffset: "2px",
        },
      },
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
          class={className}
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

    const sizeStyles: Record<string, StyleSystemProps> = {
      xs: { px: 2, py: 1, fz: "xs", h: 30 },
      sm: { px: 3, py: 1.5, fz: "sm", h: 36 },
      md: { px: 4, py: 2, fz: "md", h: 42 },
      lg: { px: 5, py: 2.5, fz: "lg", h: 50 },
      xl: { px: 6, py: 3, fz: "xl", h: 60 },
    };

    const inputStyles = {
      ...sizeStyles[size],
      bd: `2px solid ${palette.black}`,
      bdr: "0px",
      bg: disabled ? palette.gray[100] : palette.white,
      c: disabled ? palette.gray[500] : palette.black,
      ...styleProps,
      style: {
        fontFamily,
        fontSize: fontSizes.md,
        ...styleProps.style,
      },
    };

    const defaultPseudoProps: PseudoProps = {
      focus: {
        style: {
          outline: `2px solid ${palette.gray[500]}`,
          outlineOffset: "2px",
        },
      },
      disabled: {
        bg: palette.gray[100],
        c: palette.gray[500],
        cursor: "not-allowed",
      },
      ...pseudoProps,
    };

    const css = helpers.generateCSS(className, inputStyles, defaultPseudoProps);

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <input
          {...commonProps}
          {...otherProps}
          class={className}
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

    // Add monospace font to boxes by default
    const boxStyles = {
      ...styleProps,
      style: {
        fontFamily,
        fontSize: fontSizes.md,
        ...styleProps.style,
      },
    };

    const css = helpers.generateCSS(className, boxStyles, pseudoProps);
    const Component = component as any;

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <Component {...commonProps} class={className} {...htmxAttrs}>
          {children}
        </Component>
      </>
    );
  },
};

// Create theme function
export const createTheme = (config: ThemeConfig = {}) => {
  const theme = {
    Alert: (props: AlertProps) => {
      const renderer = config.Alert || defaultComponents.Alert;
      return renderer(props, helpers);
    },
    Accordion: (props: AccordionProps) => {
      const renderer = config.Accordion || defaultComponents.Accordion;
      return renderer(props, helpers);
    },
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
