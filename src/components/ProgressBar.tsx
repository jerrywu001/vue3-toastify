/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import cx from 'clsx';

import { ToastClassName, ToastType, ToastTheme } from '../types';
import { CSSProperties, defineComponent } from 'vue';
import { Default } from '../utils/constant';
import { isFn } from '../utils/tools';

export interface ProgressBarProps {
  /**
   * The animation delay which determine when to close the toast
   */
  delay: number;

  /**
   * Whether or not the animation is running or paused
   */
  isRunning: boolean;

  /**
   * Func to close the current toast
   */
  closeToast: () => void;

  /**
   * Optional type : info, success ...
   */
  type: ToastType;

  /**
   * The theme that is currently used
   */
  theme: ToastTheme;

  /**
   * Hide or not the progress bar
   */
  hide?: boolean;

  /**
   * Optionnal className
   */
  className?: ToastClassName;

  /**
   * Optionnal inline style
   */
  style?: CSSProperties;

  /**
   * Tell wether or not controlled progress bar is used
   */
  controlledProgress?: boolean;

  /**
   * Controlled progress value
   */
  progress?: number | string;

  /**
   * Support rtl content
   */
  rtl?: boolean;

  /**
   * Tell if the component is isIn on screen or not
   */
  isIn?: boolean;
}

export function ProgressBar({
  delay,
  isRunning,
  closeToast,
  type = 'default',
  hide = false,
  className,
  style: userStyle,
  controlledProgress,
  progress,
  rtl,
  isIn,
  theme,
}: ProgressBarProps) {
  const style: CSSProperties = {
    ...userStyle,
    animationDuration: `${delay}ms`,
    animationPlayState: isRunning ? 'running' : 'paused',
    opacity: hide ? 0 : 1,
  };

  if (controlledProgress) {
    style.transform = `scaleX(${progress})`;
  }

  const defaultClassName = cx(
    `${Default.CSS_NAMESPACE}__progress-bar`,
    controlledProgress
      ? `${Default.CSS_NAMESPACE}__progress-bar--controlled`
      : `${Default.CSS_NAMESPACE}__progress-bar--animated`,
    `${Default.CSS_NAMESPACE}__progress-bar-theme--${theme}`,
    `${Default.CSS_NAMESPACE}__progress-bar--${type}`,
    {
      [`${Default.CSS_NAMESPACE}__progress-bar--rtl`]: rtl,
    },
  );
  const classNames = isFn(className)
    ? className({
      rtl,
      type,
      defaultClassName,
    })
    : cx(defaultClassName, className);

  // 🧐 controlledProgress is derived from progress
  // so if controlledProgress is set
  // it means that this is also the case for progress
  const animationEvent = {
    [controlledProgress && progress! >= 1
      ? 'onTransitionEnd'
      : 'onAnimationEnd']:
      controlledProgress && progress! < 1
        ? null
        : () => {
          if (isIn) closeToast();
        },
  };

  return (
    <div
      role="progressbar"
      aria-hidden={hide ? 'true' : 'false'}
      aria-label="notification timer"
      class={classNames}
      style={style}
      {...animationEvent}
    />
  );
}
