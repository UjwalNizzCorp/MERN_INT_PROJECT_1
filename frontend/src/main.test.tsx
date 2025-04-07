import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';


describe('Main Application Routing', () => {
    it('renders Welcome component on default route', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(getByText(/welcome/i)).toBeInTheDocument();
    });

    it('renders Login component on /login route', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );
        expect(getByText(/login/i)).toBeInTheDocument();
    });

    it('renders Profile component on /profile route', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/profile']}>
                <App />
            </MemoryRouter>
        );
        expect(getByText(/profile/i)).toBeInTheDocument();
    });

    it('renders EditProfile component on /edit route', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/edit']}>
                <App />
            </MemoryRouter>
        );
        expect(getByText(/edit profile/i)).toBeInTheDocument();
    });

    it('renders 404 or fallback for unknown routes', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/unknown']}>
                <App />
            </MemoryRouter>
        );
        expect(getByText(/not found/i)).toBeInTheDocument();
    });
});