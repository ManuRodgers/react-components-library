import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';

import Button, { ButtonProps } from './Button';

const defaultProps = {
  onClick: jest.fn(),
};
const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'manu',
};
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};
describe('Button Component', () => {
  afterEach(cleanup);

  it('should render the correct default button', () => {
    // assignment
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText('Nice') as HTMLButtonElement;

    //  assertion
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeFalsy();
    // action
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg manu');
  });
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType="link" href="http://dummyurl">
        Link
      </Button>
    );
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>);
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
  it('matches snapshot', async () => {
    const { asFragment } = render(<Button {...defaultProps}>Nice</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
