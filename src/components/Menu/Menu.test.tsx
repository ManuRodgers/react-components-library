import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';
import React from 'react';

import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';

const defaultProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};
const verticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};
let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement,
  xyz: HTMLElement,
  manu: HTMLElement;
function renderMenu(props: Partial<MenuProps> = {}): RenderResult {
  return render(
    <Menu {...defaultProps} {...props}>
      <MenuItem index={'0'}>active</MenuItem>
      <MenuItem index={'1'} disabled>
        disabled
      </MenuItem>
      <MenuItem index={'2'}>xyz</MenuItem>
      <MenuItem index={'3'}>manu</MenuItem>
    </Menu>
  );
}
describe('test Menu and MenuItem component in default(horizontal) mode', function () {
  beforeEach(async () => {
    // finish all of assignments
    wrapper = renderMenu();
    menuElement = await wrapper.findByTestId('test-menu');
    activeElement = await wrapper.findByText('active');
    disabledElement = await wrapper.findByText('disabled');
    xyz = await wrapper.findByText('xyz');
    manu = await wrapper.findByText('manu');
  });
  afterEach(cleanup);
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('manu-menu test');
    expect(menuElement.querySelectorAll('li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  it('click items should change active and call the right callback', () => {
    fireEvent.click(xyz);
    expect(xyz).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(defaultProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith('1');
    fireEvent.click(manu);
    expect(manu).toHaveClass('is-active');
    expect(defaultProps.onSelect).toHaveBeenCalledWith('3');
    expect(xyz).not.toHaveClass('is-active');
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith('1');
  });

  it('matches snapshot', async () => {
    const { asFragment } = renderMenu();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = renderMenu(verticalProps);
  });
  afterEach(cleanup);
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });

  it('matches snapshot', async () => {
    const { asFragment } = renderMenu(verticalProps);
    expect(asFragment()).toMatchSnapshot();
  });
});
