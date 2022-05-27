import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {SnackbarProvider} from "notistack";

test('renders app', () => {
	render(<SnackbarProvider
		autoHideDuration={4000}
		preventDuplicate
		iconVariant={{
			success: '✅ ', error: '⚠️ ', warning: '⚠️ ', info: 'ℹ️ ',
		}}
		anchorOrigin={{
			vertical: 'bottom', horizontal: 'right',
		}}
	>
		<App/>
	</SnackbarProvider>);
	const linkElement = screen.getByText(/Ingredients In Stock/i);
	expect(linkElement).toBeTruthy();
});

