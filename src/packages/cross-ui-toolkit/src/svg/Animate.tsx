import React from 'react';

export interface AnimateProps {
  attributeName: string;
  values?: string;
  from?: string | number;
  to?: string | number;
  dur?: string;
  repeatCount?: string | number;
  begin?: string;
  end?: string;
  fill?: 'freeze' | 'remove';
  calcMode?: 'discrete' | 'linear' | 'paced' | 'spline';
  keyTimes?: string;
  keySplines?: string;
  by?: string | number;
  additive?: 'replace' | 'sum';
  accumulate?: 'none' | 'sum';
  restart?: 'always' | 'whenNotActive' | 'never';
}

export const Animate: React.FC<AnimateProps> = (props) => {
  return <animate {...props} />;
};