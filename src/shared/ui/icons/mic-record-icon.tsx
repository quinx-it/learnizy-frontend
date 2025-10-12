import { IconProps } from '@/shared/types';
import { cn } from '@/shared/lib/utils';

export const MicRecordIcon = ({ className }: IconProps) => {
  const barHeights = [5, 12, 8, 5, 11, 3];

  return (
    <div
      className={cn(
        'flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#E8F8FC]',
        className,
      )}
    >
      <div className="flex items-center justify-center gap-[1px]">
        {barHeights.map((height, index) => (
          <div
            key={index}
            className="w-[1.5px] rounded bg-[#238BA7]"
            style={{
              height: `${height}px`,
              animation: `micWave 1s ease-in-out ${index * 0.1}s infinite alternate`,
            }}
          />
        ))}
      </div>
      <style>
        {`
          @keyframes micWave {
            0% { transform: scaleY(1); }
            50% { transform: scaleY(1.3); }
            100% { transform: scaleY(1); }
          }
        `}
      </style>
    </div>
  );
};
