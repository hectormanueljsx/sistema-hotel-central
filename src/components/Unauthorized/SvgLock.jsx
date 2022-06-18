import React from 'react';

const SvgLock = props => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-lock'
      width={200}
      height={200}
      viewBox='0 0 24 24'
      strokeWidth={2.5}
      stroke='#51bab3'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M0 0h24v24H0z' stroke='none' />
      <rect x={5} y={11} width={14} height={10} rx={2} />
      <circle cx={12} cy={16} r={1} />
      <path d='M8 11V7a4 4 0 018 0v4' />
    </svg>
  );
};

export default SvgLock;
