import { default as JoinGame } from '.';
import { render, screen } from '@testing-library/react';

describe('JoinGame', () => {

    test('it renders the title', () => {
        render(<JoinGame />)
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toContain('Join Game');
    });

});