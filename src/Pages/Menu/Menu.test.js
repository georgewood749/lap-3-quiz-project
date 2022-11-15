import { default as Menu } from '.';
import { render, screen } from '@testing-library/react';

describe('Menu', () => {

    test('it renders the title', () => {
        render(<Menu />)
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toContain('Game');
    });

});