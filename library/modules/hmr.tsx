// library/modules/hmr.tsx
export const hmrScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  let ws;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 10;
  let reloadTimeout;
  
  function connect() {
    ws = new WebSocket('ws://localhost:3001');
    
    ws.onopen = () => {
      console.log('🔥 HMR connected');
      reconnectAttempts = 0;
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'reload') {
        console.log('🔄 Reloading page...');
        // Clear any pending reload
        clearTimeout(reloadTimeout);
        // Add small delay to ensure file is fully written
        reloadTimeout = setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    };
    
    ws.onclose = () => {
      if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        console.log(\`🔌 Reconnecting... (\${reconnectAttempts}/\${maxReconnectAttempts})\`);
        setTimeout(connect, 1000);
      }
    };
    
    ws.onerror = (error) => {
      console.error('❌ HMR error:', error);
    };
  }
  
  connect();
})();
        `,
      }}
    />
  );
};
