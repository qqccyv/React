import react from 'react';
import { render } from '@testing-library/react';
import Button from './Button';
// test('our first react test case', () => {
//   const wrapper = render(<Button>hello</Button>);
//   const element = wrapper.queryByText('hello');
//   expect(element).toBeTruthy();
//   expect(element).toBeInTheDocument()
// })

// 区分不同的测试模块
describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button>hello</Button>);
    const element = wrapper.getByText('hello');
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
  })
})