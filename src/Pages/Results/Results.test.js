import { default as Results } from '.';
import { render, screen } from '@testing-library/react';

describe('Results', () => {

    test('it renders the title', () => {
        render(<Results />)
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toContain('Results');
    });

});