import React, { ReactElement, FC } from 'react';

const Loading: FC = (): ReactElement<'div'> => {
  return (
    <div className={'loading loading--active'}>
      <div className="loading__screen">
        <div className="loading__spinner">
          <svg className="loading__circular">
            <circle
              className="loading__circular__path"
              cx="60"
              cy="60"
              r="20"
              fill="none"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loading;
