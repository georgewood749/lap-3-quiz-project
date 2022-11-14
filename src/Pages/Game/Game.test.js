import { default as Game } from '.';
import { render, screen } from '@testing-library/react';

describe('Game', () => {

    test('it renders the title', () => {
        render(<Game />)
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toContain('Game');
    });

});