'use client';

import { FC } from 'react';

import { IAnalyticsCardProps } from './typings';

const AnalyticsCard: FC<IAnalyticsCardProps> = (props) => {
  const { title, value, changePercentage, children } = props;

  const isPositive = typeof changePercentage === 'number' && changePercentage >= 0;
  const percentageClass = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className="flex-1 rounded-lg border bg-white p-6 shadow-md">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>

      {children ? (
        <div className="mt-2">{children}</div>
      ) : (
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold">{value}</p>
          {typeof changePercentage === 'number' && (
            <p className={`ml-2 flex items-baseline text-[12px] font-semibold ${percentageClass}`}>
              {isPositive ? '+' : ''}
              {changePercentage.toFixed(1)}%
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsCard;
