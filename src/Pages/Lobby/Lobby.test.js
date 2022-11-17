import { default as Lobby } from '.';
import { render, screen } from '@testing-library/react';

describe('Lobby', () => {

    test('it renders the title', () => {
        render(<Lobby />)
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toContain('Lobby');
    });

});