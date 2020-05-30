import React, { memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { TransitionActions } from 'react-transition-group/Transition';

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-left'
  | 'zoom-in-bottom'
  | 'zoom-in-right';

export type TransitionProps = {
  animation?: AnimationName;
  wrapper?: boolean;
} & CSSTransitionProps &
  TransitionActions;

const Transition: React.FunctionComponent<TransitionProps> = ({
  children,
  animation,
  wrapper,
  classNames,
  ...restProps
}) => {
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};
export default memo(Transition);
