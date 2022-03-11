import { render } from '@testing-library/react'
import App from './App';

test('App component content', () => {
  const { getByText } = render(<App />);

  expect(getByText('Hello World!')).toBeTruthy();
});