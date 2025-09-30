// library/ui/index.tsx

type TextProps = {
  text: string;
  class?: string;
};

type ButtonProps = {
  onClick: Promise<void>;
  children: any;
  class?: string;
};

export const UI = {
  Text: ({ text, class: className }: TextProps) => {
    return <span class={className}>{text}</span>;
  },

  Button: ({ onClick, children, class: className }: ButtonProps) => {
    // Generate unique ID for this button
    const id = `btn-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <>
        <button id={id} class={className}>
          {children}
        </button>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
            document.getElementById('${id}').addEventListener('click', async () => {
              // This will be enhanced with client-side state management
              console.log('Button clicked');
            });
          `,
          }}
        />
      </>
    );
  },
};
