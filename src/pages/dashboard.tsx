import React from 'react';
import { useAuthorizer } from '@authorizerdev/authorizer-react';

export default function Dashboard() {
	const [loading, setLoading] = React.useState(false);
	const { user, setToken, authorizerRef } = useAuthorizer();

	const onLogout = async () => {
		setLoading(true);
		await authorizerRef.logout();
		setToken(null);
		setLoading(false);
	};

	return (
		<div>
			<h1>Hey {user?.nickname} 👋,</h1>
			<p>Merci d'utiliser Anjara Connect (basé sur le logiciel <a href='https://github.com/authorizerdev/authorizer'>Authorizer</a>) !</p>
			<article>
				Votre adresse mail est{' '}
				<a href={`mailto:${user?.email}`} style={{ color: '#3B82F6' }}>
					{user?.email}
				</a>

				{!user?.email_verified && (
					<p>
						{' '} Email non validée
					</p>
				)}

				{!user?.nickname && (
					<p>
						{' '} Pas de pseudo
					</p>
				)}

				<p>
					Compte créé le {new Date(user!.created_at*1000).toLocaleString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
				</p>			

				<p>
					Dernière mise à jour le {new Date(user!.updated_at*1000).toLocaleString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
				</p>

			</article>

			<br />
			{loading ? (
				<h3>Processing....</h3>
			) : (
				<h3
					style={{
						color: '#3B82F6',
						cursor: 'pointer',
					}}
					onClick={onLogout}
				>
					Déconnexion
				</h3>
			)}
		</div>
	);
}
