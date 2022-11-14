import { default as Leaderboard } from '.';
import { render, screen } from '@testing-library/react';

describe('LeaderBoard', () => {

    test('it renders the title', () => {
        render(<Leaderboard />)
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toContain('Leaderboard');
    });

});