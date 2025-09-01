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

export function Animate(props: AnimateProps) {
  // React Native SVG doesn't support animate tag, return null
  // Animation should be handled via React Native Animated API
  return null;
}