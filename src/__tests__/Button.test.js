import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Button from '../components/Button';

test('renders without crashing', () => {
    render(<Button />);
    const button = screen.getByTestId('button-id');
    expect(button).toBeInTheDocument();
});

test('renders button with custom props', () => {
    const button = { color: 'red', text: 'hello', onClick: () => { } }
    render(<Button color={button.color} text={button.text} onClick={button.onClick} />);
    const buttonElement = screen.getByTestId('button-id');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('hello');
});

test('matches snapshots', () => {
    const button = { color: 'red', text: 'hello', onClick: () => { } }
    const tree = renderer.create(<Button color={button.color} text={button.text} onClick={button.onClick} />).toJSON();
    expect(tree).toMatchSnapshot();
});