import React, { useEffect, useState } from 'react';

let typing

function Typing(props) {
  const [dots, setDots] = useState('');
  useEffect(() => {
    typing = setInterval(() => {
      if (dots === '...') {
        setDots('')
      } else {
        setDots(dots + '.')
      }
    }, 300);
    return () => {
      clearInterval(typing);
    }
  });
  return (
    <div>
      Typing {dots}
    </div>
  );
}

export default Typing;
