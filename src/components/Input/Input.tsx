import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import React, {
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
  memo,
} from 'react';

import Icon from '../Icon/Icon';

type InputSize = 'lg' | 'sm';
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FunctionComponent<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  const className = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  };
  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={className} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
};

export default memo(Input);
