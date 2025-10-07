import { createTheme, TextProps, ButtonProps, helpers } from "my-library/theme";

export const customTheme = createTheme({
  // Customize Button with rounded corners and different colors
  Button: (
    {
      children,
      type = "button",
      variant = "filled",
      size = "md",
      disabled = false,
      ...allProps
    }: ButtonProps,
    h
  ) => {
    const [commonProps, remainingProps] = h.extractCommonProps(allProps);
    const { htmxAttrs, styleProps, pseudoProps, otherProps } =
      h.separateProps(remainingProps);
    const className = h.generateClassName("custom-btn");
    const userClass = commonProps.className || commonProps.class;
    const finalClass = userClass ? `${className} ${userClass}` : className;

    const sizeStyles = {
      xs: { px: 2, py: 1, fz: "xs" },
      sm: { px: 3, py: 1.5, fz: "sm" },
      md: { px: 4, py: 2, fz: "md" },
      lg: { px: 5, py: 2.5, fz: "lg" },
      xl: { px: 6, py: 3, fz: "xl" },
    };

    const variantStyles = {
      filled: { bg: "#ff6b6b", c: "white", bd: "none" },
      outline: { bg: "transparent", c: "#ff6b6b", bd: "2px solid #ff6b6b" },
      subtle: { bg: "#ffe3e3", c: "#ff6b6b", bd: "none" },
      light: { bg: "transparent", c: "#ff6b6b", bd: "none" },
    };

    const buttonStyles = {
      ...sizeStyles[size],
      ...variantStyles[variant],
      bdr: "12px", // More rounded
      cursor: disabled ? "not-allowed" : "pointer",
      ...styleProps,
    };

    const defaultPseudoProps = {
      hover:
        variant === "filled"
          ? { bg: "#fa5252" }
          : variant === "outline"
          ? { bg: "#ffe3e3" }
          : {},
      active: variant === "filled" ? { bg: "#f03e3e" } : {},
      disabled: { opacity: 0.6, cursor: "not-allowed" },
      ...pseudoProps,
    };

    const css = h.generateCSS(className, buttonStyles, defaultPseudoProps);

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

  // Customize Text with different font
  Text: ({ text, children, component = "span", ...allProps }: TextProps, h) => {
    const [commonProps, remainingProps] = h.extractCommonProps(allProps);
    const { styleProps, pseudoProps } = h.separateProps(remainingProps);
    const className = h.generateClassName("custom-text");
    const userClass = commonProps.className || commonProps.class;
    const finalClass = userClass ? `${className} ${userClass}` : className;

    // Add default font family
    const enhancedStyleProps = {
      ...styleProps,
      style: {
        fontFamily: "'Inter', sans-serif",
        ...styleProps.style,
      },
    };

    const css = h.generateCSS(className, enhancedStyleProps, pseudoProps);
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
});

// Use in components
import { customTheme as UI } from "./theme.tsx";

export default () => (
  <UI.Box p={4}>
    <UI.Text fz="xl" fw="bold">
      Custom Theme!
    </UI.Text>
    <UI.Button variant="filled" size="lg">
      Click Me
    </UI.Button>
  </UI.Box>
);
