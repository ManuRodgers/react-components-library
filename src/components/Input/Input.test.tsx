import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';
import React from 'react';

import Input, { InputProps } from './Input';

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
};
function renderInput(props: Partial<InputProps> = {}): RenderResult {
  return render(<Input {...defaultProps} {...props} />);
}
let wrapper: RenderResult;
describe('test Input component', () => {
  afterEach(cleanup);
  it('should render the correct default Input', async () => {
    wrapper = renderInput();
    const testNode = (await wrapper.findByPlaceholderText(
      'test-input'
    )) as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('viking-input-inner');
    fireEvent.change(testNode, { target: { value: '23' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual('23');
  });

  it('should render the disabled Input on disabled property', async () => {
    wrapper = renderInput({ disabled: true, placeholder: 'disabled' });
    const testNode = (await wrapper.findByPlaceholderText(
      'disabled'
    )) as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });

  it('should render different input sizes on size property', () => {
    wrapper = renderInput({ size: 'lg', placeholder: 'sizes' });
    const testContainer = wrapper.container.querySelector(
      '.viking-input-wrapper'
    );
    expect(testContainer).toHaveClass('input-size-lg');
  });
  it('should render prepend and append element on prepend/append property', () => {
    const { queryByText, container } = render(
      <Input placeholder="pend" prepend="https://" append=".com" />
    );
    const testContainer = container.querySelector('.viking-input-wrapper');
    expect(testContainer).toHaveClass(
      'input-group input-group-append input-group-prepend'
    );
    expect(queryByText('https://')).toBeInTheDocument();
    expect(queryByText('.com')).toBeInTheDocument();
  });
  it('matches snapshot', async () => {
    const { asFragment } = render(<Input {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
