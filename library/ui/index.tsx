import { HtmxAttributes } from "../htmx";

type TextProps = {
  text: string;
  class?: string;
};

type ButtonProps = HtmxAttributes & {
  onClick?: () => Promise<void>;
  children: any;
  class?: string;
  type?: "button" | "submit" | "reset";
  name?: string;
  value?: string;
};

type InputProps = HtmxAttributes & {
  type?: string;
  name: string;
  value?: string;
  placeholder?: string;
  class?: string;
};

export const UI = {
  Text: ({ text, class: className }: TextProps) => {
    return <span class={className}>{text}</span>;
  },

  Button: ({
    onClick,
    children,
    class: className,
    type = "button",
    ...htmxAttrs
  }: ButtonProps) => {
    return (
      <button class={className} type={type} {...htmxAttrs}>
        {children}
      </button>
    );
  },

  Input: ({ class: className, ...props }: InputProps) => {
    return <input class={className} {...props} />;
  },
};
