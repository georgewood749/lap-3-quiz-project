import NotFound, { default as Menu } from '.';
import { render, screen } from '@testing-library/react';

describe('Menu', () => {

    test('it renders the title', () => {
        render(<NotFound />)
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toContain('Page not found');
    });

});