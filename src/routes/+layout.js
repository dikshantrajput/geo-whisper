import { inject } from '@vercel/analytics';

inject({ mode: 'production' });

export const load = ({ url }) => {
    return { pathname: url.pathname }
}
