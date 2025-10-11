// library/modules/theme.tsx
import { HtmxAttributes } from "../htmx/index.tsx";
import { CSSProperties } from "hono/jsx";

// ============================================================================
// TYPES
// ============================================================================

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
  // Size
  w?: SizeValue;
  h?: SizeValue;
  maw?: SizeValue;
  mah?: SizeValue;
  miw?: SizeValue;
  mih?: SizeValue;
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
  // Color
  c?: ColorValue;
  bg?: ColorValue;
  // Typography
  fz?: SizeValue;
  fw?: number | "normal" | "bold" | "bolder" | "lighter";
  ta?: "left" | "center" | "right" | "justify";
  td?: "none" | "underline" | "line-through";
  tt?: "uppercase" | "lowercase" | "capitalize" | "none";
  lh?: number | string;
  // Layout
  display?: CSSProperties["display"];
  opacity?: number;
  // Border
  bd?: string;
  bdr?: SizeValue;
  // Position
  pos?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: SizeValue;
  right?: SizeValue;
  bottom?: SizeValue;
  left?: SizeValue;
  inset?: SizeValue;
  // Flex
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
  // Grid (NEW)
  gridCols?: number | string;
  gridRows?: number | string;
  colSpan?: number;
  rowSpan?: number;
  // Shadow (NEW)
  shadow?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  // Misc
  cursor?: CSSProperties["cursor"];
  style?: CSSProperties;
};

export type PseudoProps = {
  css_hover?: Partial<StyleSystemProps>;
  css_active?: Partial<StyleSystemProps>;
  css_focus?: Partial<StyleSystemProps>;
  css_disabled?: Partial<StyleSystemProps>;
};

export type BaseComponentProps = StyleSystemProps &
  CommonProps &
  PseudoProps &
  HtmxAttributes;

export type TextProps = BaseComponentProps & {
  $text?: string;
  $component?:
    | "span"
    | "p"
    | "div"
    | "label"
    | "strong"
    | "em"
    | "small"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
};

export type AlertProps = BaseComponentProps & {
  children: any;
  $variant?: "info" | "success" | "warning" | "error";
  $icon?: any;
  $title?: string;
};

export type AccordionProps = BaseComponentProps & {
  children: any;
  summary: string;
};

export type ButtonProps = BaseComponentProps & {
  onClick?: () => Promise<void>;
  children: any;
  type?: "button" | "submit" | "reset";
  name?: string;
  value?: string;
  variant?: "filled" | "outline" | "subtle" | "light";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  form?: string;
  fullWidth?: boolean; // NEW
};

export type InputProps = BaseComponentProps & {
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
  $error?: string; // NEW
  $label?: string; // NEW
};

export type BoxProps = BaseComponentProps & {
  children?: any;
  component?: string;
};

export type StackProps = BaseComponentProps & {
  children?: any;
  spacing?: SpacingValue;
};

export type GroupProps = BaseComponentProps & {
  children?: any;
  spacing?: SpacingValue;
};

export type ContainerProps = BaseComponentProps & {
  children?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  fluid?: boolean; // NEW
};

export type GridProps = BaseComponentProps & {
  children?: any;
  cols?: number;
  spacing?: SpacingValue;
};

export type CardProps = BaseComponentProps & {
  // NEW
  children?: any;
  $header?: any;
  $footer?: any;
};

export type DividerProps = BaseComponentProps & {
  // NEW
  $label?: string;
  orientation?: "horizontal" | "vertical";
};

// ============================================================================
// CONSTANTS & SCALES
// ============================================================================

const SPACING_UNIT = 0.25; // rem
const SIZE_PRESETS = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
};

const SHADOW_PRESETS = {
  xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

const PALETTE = {
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
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
  },
};

const FONT_FAMILY = "monospace";
const FONT_SIZES = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
};

// ============================================================================
// HELPERS
// ============================================================================

let classCounter = 0;

const spacingScale = (value: SpacingValue): string => {
  if (typeof value === "number") return `${value * SPACING_UNIT}rem`;
  return value;
};

const sizeValue = (value: SizeValue): string => {
  if (typeof value === "number") return `${value}px`;
  return SIZE_PRESETS[value as keyof typeof SIZE_PRESETS] || value;
};

const shadowValue = (value: string): string => {
  return SHADOW_PRESETS[value as keyof typeof SHADOW_PRESETS] || value;
};

const generateClassName = (prefix: string = "ui") =>
  `${prefix}-${++classCounter}`;

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
    "gridCols",
    "gridRows",
    "colSpan",
    "rowSpan",
    "shadow",
    "style",
    "cursor",
  ];

  const pseudoKeys = ["css_hover", "css_active", "css_focus", "css_disabled"];

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

const stylePropsToCSS = (props: StyleSystemProps): string => {
  const rules: string[] = [];

  // Size
  if (props.w !== undefined) rules.push(`width: ${sizeValue(props.w)}`);
  if (props.h !== undefined) rules.push(`height: ${sizeValue(props.h)}`);
  if (props.maw !== undefined) rules.push(`max-width: ${sizeValue(props.maw)}`);
  if (props.mah !== undefined)
    rules.push(`max-height: ${sizeValue(props.mah)}`);
  if (props.miw !== undefined) rules.push(`min-width: ${sizeValue(props.miw)}`);
  if (props.mih !== undefined)
    rules.push(`min-height: ${sizeValue(props.mih)}`);

  // Margin
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

  // Padding
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

  // Color
  if (props.c !== undefined) rules.push(`color: ${props.c}`);
  if (props.bg !== undefined) rules.push(`background-color: ${props.bg}`);

  // Typography
  if (props.fz !== undefined) rules.push(`font-size: ${sizeValue(props.fz)}`);
  if (props.fw !== undefined) rules.push(`font-weight: ${props.fw}`);
  if (props.ta !== undefined) rules.push(`text-align: ${props.ta}`);
  if (props.td !== undefined) rules.push(`text-decoration: ${props.td}`);
  if (props.tt !== undefined) rules.push(`text-transform: ${props.tt}`);
  if (props.lh !== undefined) rules.push(`line-height: ${props.lh}`);

  // Layout
  if (props.display !== undefined) rules.push(`display: ${props.display}`);
  if (props.opacity !== undefined) rules.push(`opacity: ${props.opacity}`);

  // Border
  if (props.bd !== undefined) rules.push(`border: ${props.bd}`);
  if (props.bdr !== undefined)
    rules.push(`border-radius: ${sizeValue(props.bdr)}`);

  // Position
  if (props.pos !== undefined) rules.push(`position: ${props.pos}`);
  if (props.top !== undefined) rules.push(`top: ${sizeValue(props.top)}`);
  if (props.right !== undefined) rules.push(`right: ${sizeValue(props.right)}`);
  if (props.bottom !== undefined)
    rules.push(`bottom: ${sizeValue(props.bottom)}`);
  if (props.left !== undefined) rules.push(`left: ${sizeValue(props.left)}`);
  if (props.inset !== undefined) rules.push(`inset: ${sizeValue(props.inset)}`);

  // Flex
  if (props.flex !== undefined) rules.push(`flex: ${props.flex}`);
  if (props.direction !== undefined)
    rules.push(`flex-direction: ${props.direction}`);
  if (props.align !== undefined) rules.push(`align-items: ${props.align}`);
  if (props.justify !== undefined)
    rules.push(`justify-content: ${props.justify}`);
  if (props.gap !== undefined) rules.push(`gap: ${spacingScale(props.gap)}`);
  if (props.wrap !== undefined) rules.push(`flex-wrap: ${props.wrap}`);

  // Grid
  if (props.gridCols !== undefined) {
    const cols =
      typeof props.gridCols === "number"
        ? `repeat(${props.gridCols}, 1fr)`
        : props.gridCols;
    rules.push(`grid-template-columns: ${cols}`);
  }
  if (props.gridRows !== undefined) {
    const rows =
      typeof props.gridRows === "number"
        ? `repeat(${props.gridRows}, 1fr)`
        : props.gridRows;
    rules.push(`grid-template-rows: ${rows}`);
  }
  if (props.colSpan !== undefined)
    rules.push(`grid-column: span ${props.colSpan}`);
  if (props.rowSpan !== undefined)
    rules.push(`grid-row: span ${props.rowSpan}`);

  // Shadow
  if (props.shadow !== undefined)
    rules.push(`box-shadow: ${shadowValue(props.shadow)}`);

  // Misc
  if (props.cursor !== undefined) rules.push(`cursor: ${props.cursor}`);

  // Custom styles
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

  if (pseudoProps?.css_hover) {
    css += ` .${className}:hover { ${stylePropsToCSS(pseudoProps.css_hover)} }`;
  }
  if (pseudoProps?.css_active) {
    css += ` .${className}:active { ${stylePropsToCSS(
      pseudoProps.css_active
    )} }`;
  }
  if (pseudoProps?.css_focus) {
    css += ` .${className}:focus { ${stylePropsToCSS(pseudoProps.css_focus)} }`;
  }
  if (pseudoProps?.css_disabled) {
    css += ` .${className}:disabled { ${stylePropsToCSS(
      pseudoProps.css_disabled
    )} }`;
  }

  return css;
};

const generateAttrs = (
  name: string,
  props: Record<string, any>,
  styles: StyleSystemProps,
  defaultPseudoProps: PseudoProps
) => {
  const [commonProps, remainingProps] = extractCommonProps(props);
  const { htmxAttrs, styleProps, pseudoProps, otherProps } =
    separateProps(remainingProps);
  const className = generateClassName(name);
  const css = generateCSS(
    className,
    {
      ...styleProps,
      ...styles,
      style: { ...styleProps.style, ...styles.style },
    },
    { ...defaultPseudoProps, ...pseudoProps }
  );

  const attrs = {
    ...commonProps,
    ...otherProps,
    ...htmxAttrs,
    className: [className, commonProps.className].filter(Boolean).join(" "),
  };

  return { attrs, css };
};

export type ThemeHelpers = {
  generateClassName: typeof generateClassName;
  generateCSS: typeof generateCSS;
  stylePropsToCSS: typeof stylePropsToCSS;
  extractCommonProps: typeof extractCommonProps;
  separateProps: typeof separateProps;
  spacingScale: typeof spacingScale;
  sizeValue: typeof sizeValue;
  shadowValue: typeof shadowValue;
  generateAttrs: typeof generateAttrs;
  palette: typeof PALETTE;
  fontFamily: typeof FONT_FAMILY;
  fontSizes: typeof FONT_SIZES;
};

export const helpers: ThemeHelpers = {
  generateClassName,
  generateCSS,
  stylePropsToCSS,
  extractCommonProps,
  separateProps,
  spacingScale,
  sizeValue,
  shadowValue,
  generateAttrs,
  palette: PALETTE,
  fontFamily: FONT_FAMILY,
  fontSizes: FONT_SIZES,
};

// ============================================================================
// COMPONENT RENDERERS
// ============================================================================

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
  Card?: ComponentRenderer<CardProps>;
  Divider?: ComponentRenderer<DividerProps>;
};

const defaultComponents = {
  Alert: (
    { children, $title, $icon, $variant = "info", ...allProps }: AlertProps,
    h: ThemeHelpers
  ) => {
    const variantColors = {
      info: { bg: PALETTE.blue[50], bd: PALETTE.blue[300] },
      success: { bg: PALETTE.green[50], bd: PALETTE.green[300] },
      warning: { bg: PALETTE.yellow[50], bd: PALETTE.yellow[300] },
      error: { bg: PALETTE.red[50], bd: PALETTE.red[300] },
    };

    const { attrs, css } = h.generateAttrs(
      "alert",
      allProps,
      {
        ...variantColors[$variant],
        bd: `1px solid ${variantColors[$variant].bd}`,
        display: "flex",
        direction: "column",
        gap: 2,
        p: 3,
        bdr: 4,
        style: { fontFamily: FONT_FAMILY, fontSize: FONT_SIZES.md },
      },
      {}
    );

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <div role="alert" {...attrs}>
          {$icon && <span>{$icon}</span>}
          {$title && <strong>{$title}</strong>}
          <div>{children}</div>
        </div>
      </>
    );
  },

  Accordion: (
    { children, summary = "Accordion", ...allProps }: AccordionProps,
    h: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = h.extractCommonProps(allProps);
    const { styleProps, pseudoProps } = h.separateProps(remainingProps);
    const className = h.generateClassName("accordion");
    const summaryClass = h.generateClassName("accordion-summary");
    const contentClass = h.generateClassName("accordion-content");
    const chevronClass = h.generateClassName("accordion-chevron");

    const css = [
      h.generateCSS(
        className,
        {
          bg: PALETTE.white,
          mb: 2,
          style: {
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZES.md,
            borderBottom: `1px solid ${PALETTE.gray[300]}`,
          },
          ...styleProps,
        },
        {
          css_hover: {
            style: { borderBottom: `1px solid ${PALETTE.gray[400]}` },
          },
          ...pseudoProps,
        }
      ),
      h.generateCSS(
        summaryClass,
        {
          cursor: "default",
          ta: "left",
          display: "flex",
          justify: "space-between",
          align: "center",
          p: 3,
          style: { listStyle: "none", userSelect: "none" },
        },
        {
          css_focus: {
            style: {
              outline: `2px solid ${PALETTE.gray[500]}`,
              outlineOffset: "2px",
            },
          },
        }
      ),
      h.generateCSS(contentClass, { p: 3, pt: 0 }),
      h.generateCSS(chevronClass, {
        c: PALETTE.gray[600],
        display: "inline-block",
        style: {
          transform: "rotate(90deg)",
          transition: "transform 150ms ease-in-out",
        },
      }),
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
    { $text, $component = "span", ...allProps }: TextProps,
    h: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = h.extractCommonProps(allProps);
    const { styleProps, pseudoProps } = h.separateProps(remainingProps);
    const className = h.generateClassName("text");

    const css = h.generateCSS(
      className,
      {
        c: PALETTE.black,
        ...styleProps,
        style: {
          fontFamily: FONT_FAMILY,
          fontSize: FONT_SIZES.md,
          ...styleProps.style,
        },
      },
      pseudoProps
    );

    const Component = $component as any;

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <Component {...commonProps} class={className}>
          {$text}
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
      fullWidth = false,
      ...allProps
    }: ButtonProps,
    h: ThemeHelpers
  ) => {
    const sizeStyles: Record<string, StyleSystemProps> = {
      xs: { px: 2, py: 1, fz: "xs" },
      sm: { px: 3, py: 1.5, fz: "sm" },
      md: { px: 4, py: 2, fz: "md" },
      lg: { px: 5, py: 2.5, fz: "lg" },
      xl: { px: 6, py: 3, fz: "xl" },
    };

    const variantStyles: Record<string, StyleSystemProps> = {
      filled: {
        bg: PALETTE.black,
        c: PALETTE.white,
        bd: `2px solid ${PALETTE.black}`,
      },
      outline: {
        bg: PALETTE.white,
        c: PALETTE.black,
        bd: `2px solid ${PALETTE.black}`,
      },
      subtle: {
        bg: PALETTE.gray[100],
        c: PALETTE.black,
        bd: `1px solid ${PALETTE.gray[300]}`,
      },
      light: {
        bg: "transparent",
        c: PALETTE.black,
        bd: "1px solid transparent",
      },
    };

    const { attrs, css } = h.generateAttrs(
      "btn",
      allProps,
      {
        ...sizeStyles[size],
        ...variantStyles[variant],
        w: fullWidth ? "100%" : undefined,
        bdr: 0,
        cursor: disabled ? "not-allowed" : "default",
        style: {
          fontFamily: FONT_FAMILY,
          fontSize: FONT_SIZES.md,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        },
      },
      {
        css_hover:
          variant === "filled"
            ? { bg: PALETTE.gray[600] }
            : variant === "outline"
            ? { bg: PALETTE.gray[100] }
            : variant === "subtle"
            ? { bg: PALETTE.gray[200] }
            : { bg: PALETTE.gray[100] },
        css_active:
          variant === "filled"
            ? { bg: PALETTE.black, bd: `2px solid ${PALETTE.black}` }
            : { bg: PALETTE.gray[200] },
        css_disabled: { opacity: 0.4, cursor: "not-allowed" },
        css_focus: {
          style: {
            outline: `2px solid ${PALETTE.gray[500]}`,
            outlineOffset: "2px",
          },
        },
      }
    );

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <button {...attrs} type={type} disabled={disabled}>
          {children}
        </button>
      </>
    );
  },

  Input: (
    { size = "md", disabled = false, $error, $label, ...allProps }: InputProps,
    h: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = h.extractCommonProps(allProps);
    const { htmxAttrs, styleProps, pseudoProps, otherProps } =
      h.separateProps(remainingProps);
    const inputClass = h.generateClassName("input");
    const wrapperClass = h.generateClassName("input-wrapper");
    const labelClass = h.generateClassName("input-label");
    const errorClass = h.generateClassName("input-error");

    const sizeStyles: Record<string, StyleSystemProps> = {
      xs: { px: 2, py: 1, fz: "xs", h: 30 },
      sm: { px: 3, py: 1.5, fz: "sm", h: 36 },
      md: { px: 4, py: 2, fz: "md", h: 42 },
      lg: { px: 5, py: 2.5, fz: "lg", h: 50 },
      xl: { px: 6, py: 3, fz: "xl", h: 60 },
    };

    const inputCss = h.generateCSS(
      inputClass,
      {
        ...sizeStyles[size],
        bd: `2px solid ${$error ? PALETTE.red[500] : PALETTE.black}`,
        bdr: 0,
        w: "100%",
        bg: disabled ? PALETTE.gray[100] : PALETTE.white,
        c: disabled ? PALETTE.gray[500] : PALETTE.black,
        ...styleProps,
        style: {
          fontFamily: FONT_FAMILY,
          fontSize: FONT_SIZES.md,
          ...styleProps.style,
        },
      },
      {
        css_focus: {
          style: {
            outline: `2px solid ${
              $error ? PALETTE.red[500] : PALETTE.gray[500]
            }`,
            outlineOffset: "2px",
          },
        },
        css_disabled: {
          bg: PALETTE.gray[100],
          c: PALETTE.gray[500],
          cursor: "not-allowed",
        },
        ...pseudoProps,
      }
    );

    const wrapperCss = h.generateCSS(wrapperClass, {
      display: "flex",
      direction: "column",
      gap: 1,
    });
    const labelCss = h.generateCSS(labelClass, {
      fz: "sm",
      fw: "bold",
      c: PALETTE.black,
      style: { fontFamily: FONT_FAMILY },
    });
    const errorCss = h.generateCSS(errorClass, {
      fz: "sm",
      c: PALETTE.red[600],
      style: { fontFamily: FONT_FAMILY },
    });

    const css = [inputCss, wrapperCss, labelCss, errorCss].join(" ");

    if ($label || $error) {
      return (
        <div class={wrapperClass}>
          <style dangerouslySetInnerHTML={{ __html: css }} />
          {$label && (
            <label class={labelClass} for={commonProps.id}>
              {$label}
            </label>
          )}
          <input
            {...commonProps}
            {...otherProps}
            class={inputClass}
            disabled={disabled}
            {...htmxAttrs}
          />
          {$error && <span class={errorClass}>{$error}</span>}
        </div>
      );
    }

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <input
          {...commonProps}
          {...otherProps}
          class={inputClass}
          disabled={disabled}
          {...htmxAttrs}
        />
      </>
    );
  },

  Box: (
    { children, component = "div", ...allProps }: BoxProps,
    h: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = h.extractCommonProps(allProps);
    const { htmxAttrs, styleProps, pseudoProps } =
      h.separateProps(remainingProps);
    const className = h.generateClassName("box");

    const css = h.generateCSS(
      className,
      {
        ...styleProps,
        style: {
          fontFamily: FONT_FAMILY,
          fontSize: FONT_SIZES.md,
          ...styleProps.style,
        },
      },
      pseudoProps
    );

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

  Card: (
    { children, $header, $footer, ...allProps }: CardProps,
    h: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = h.extractCommonProps(allProps);
    const { styleProps, pseudoProps } = h.separateProps(remainingProps);
    const cardClass = h.generateClassName("card");
    const headerClass = h.generateClassName("card-header");
    const bodyClass = h.generateClassName("card-body");
    const footerClass = h.generateClassName("card-footer");

    const css = [
      h.generateCSS(
        cardClass,
        {
          bd: `1px solid ${PALETTE.gray[300]}`,
          bdr: 4,
          bg: PALETTE.white,
          shadow: "sm",
          display: "flex",
          direction: "column",
          ...styleProps,
          style: {
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZES.md,
            overflow: "hidden",
            ...styleProps.style,
          },
        },
        pseudoProps
      ),
      h.generateCSS(headerClass, {
        p: 4,
        bd: `1px solid ${PALETTE.gray[200]}`,
        bg: PALETTE.gray[50],
        fw: "bold",
      }),
      h.generateCSS(bodyClass, { p: 4, flex: "1" }),
      h.generateCSS(footerClass, {
        p: 4,
        bd: `1px solid ${PALETTE.gray[200]}`,
        bg: PALETTE.gray[50],
      }),
    ].join(" ");

    return (
      <div {...commonProps} class={cardClass}>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        {$header && <div class={headerClass}>{$header}</div>}
        <div class={bodyClass}>{children}</div>
        {$footer && <div class={footerClass}>{$footer}</div>}
      </div>
    );
  },

  Divider: (
    { $label, orientation = "horizontal", ...allProps }: DividerProps,
    h: ThemeHelpers
  ) => {
    const [commonProps, remainingProps] = h.extractCommonProps(allProps);
    const { styleProps, pseudoProps } = h.separateProps(remainingProps);
    const dividerClass = h.generateClassName("divider");
    const labelClass = h.generateClassName("divider-label");

    const isHorizontal = orientation === "horizontal";

    const css = [
      h.generateCSS(
        dividerClass,
        {
          display: "flex",
          align: "center",
          justify: "center",
          gap: 2,
          direction: isHorizontal ? "row" : "column",
          my: isHorizontal ? 4 : 0,
          mx: isHorizontal ? 0 : 4,
          ...styleProps,
          style: {
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZES.sm,
            ...styleProps.style,
          },
        },
        pseudoProps
      ),
      h.generateCSS(labelClass, {
        c: PALETTE.gray[500],
        px: 2,
        style: { whiteSpace: "nowrap" },
      }),
      `.${dividerClass}::before, .${dividerClass}::after { 
        content: ""; 
        flex: 1; 
        ${
          isHorizontal
            ? `border-top: 1px solid ${PALETTE.gray[300]}`
            : `border-left: 1px solid ${PALETTE.gray[300]}`
        }; 
      }`,
    ].join(" ");

    return (
      <div {...commonProps} class={dividerClass} role="separator">
        <style dangerouslySetInnerHTML={{ __html: css }} />
        {$label && <span class={labelClass}>{$label}</span>}
      </div>
    );
  },
};

// ============================================================================
// CREATE THEME
// ============================================================================

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
          const { size = "lg", fluid = false, ...rest } = props;
          const sizeMap: Record<string, number> = {
            xs: 540,
            sm: 720,
            md: 960,
            lg: 1140,
            xl: 1320,
          };
          return theme.Box({
            maw: fluid
              ? undefined
              : typeof size === "number"
              ? size
              : sizeMap[size],
            w: fluid ? "100%" : undefined,
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
            gridCols: cols,
            gap: spacing,
            ...rest,
          });
        });
      return renderer(props, helpers);
    },
    Card: (props: CardProps) => {
      const renderer = config.Card || defaultComponents.Card;
      return renderer(props, helpers);
    },
    Divider: (props: DividerProps) => {
      const renderer = config.Divider || defaultComponents.Divider;
      return renderer(props, helpers);
    },
  };

  return theme;
};
