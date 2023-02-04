import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RepositoriesListItem from './RepositoriesListItem';

// Skip the components that cause the ACT warning to be
// jest.mock('../tree/FileIcon', () => {
// 	return () => {
// 		return 'File Icon Component';
// 	};
// });

function renderComponent() {
	const repository = {
		full_name: 'Repository',
		language: 'JavaScript',
		description: 'Repository description',
		owner: {
			login: 'facebook',
		},
		name: 'react',
		html_url: 'https://github.com/facebook/react',
	};
	render(
		<MemoryRouter>
			<RepositoriesListItem repository={repository} />
		</MemoryRouter>,
	);

	return { repository };
}

test('shows a link to the github homepage for this repository', async () => {
	const { repository } = renderComponent();
	await screen.findByRole('img', { name: 'JavaScript' });
	const link = screen.getByRole('link', {
		name: /github repository/i,
	});
	expect(link).toHaveAttribute('href', repository.html_url);
});

test('shows a fileIcon with the appropriate icon', async () => {
	renderComponent();
	const icon = await screen.findByRole('img', { name: 'JavaScript' });
	expect(icon).toHaveClass('js-icon');
});

test('show a link to the github editor page', async () => {
	const { repository } = renderComponent();

	const link = await screen.findByRole('link', {
		name: new RegExp(repository.owner.login),
	});
	expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`);
});
