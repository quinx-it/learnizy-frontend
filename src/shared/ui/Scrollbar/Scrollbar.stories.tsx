import React from 'react';

export default {
  title: 'Examples/Scrollbar',
};

export const ScrollbarOnly = () => {
  return (
    <div
      style={{
        height: 200,
        width: 500,
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: 10,
      }}
    >
      <div style={{ height: 600 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i}>Строка с текстом для проверки скролла #{i + 1}</p>
        ))}
      </div>
    </div>
  );
};
