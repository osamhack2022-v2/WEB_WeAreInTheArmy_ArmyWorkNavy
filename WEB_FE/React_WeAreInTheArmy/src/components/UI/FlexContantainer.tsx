import classNames from 'classnames';
import React from 'react';

interface FlexContainer {
  className?: string;
  children: React.ReactNode;
}
export default function FlexContainer({
  className,
  children,
  ...props
}: FlexContainer & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={classNames('flex', className)}>
      {children}
    </div>
  );
}
