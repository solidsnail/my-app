// library/ui/index.tsx

type TextProps = {
  text: string;
  class?: string;
};

type ButtonProps = {
  onClick?: () => Promise<void>;
  children: any;
  class?: string;
};

export const UI = {
  Text: ({ text, class: className }: TextProps) => {
    return <span class={className}>{text}</span>;
  },

  Button: ({ onClick, children, class: className }: ButtonProps) => {
    // Generate unique ID for this button
    return (
      <>
        <button class={className}>{children}</button>
      </>
    );
  },
};
