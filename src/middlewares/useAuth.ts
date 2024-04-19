import { RequestHandler } from 'express';
import { checkPermissions } from 'src/Api/AuthApi';

type Permission = string;

export const useJWT =
	(permissions: Permission[]): RequestHandler =>
	async (req, res, next) => {
		console.log(req.method);
		if (req.params.user === 'public' && req.method === 'GET') {
			return next();
		}

		const { authorization } = req.headers;

		if (!authorization) {
			return res.status(401).send('No JWT provided');
		}

		const success = await checkPermissions(permissions, authorization as string);
		if (success) {
			return next();
		}

		if (success === false) {
			return res
				.status(403)
				.send("The provided JWT doesn't have permission to manage the coins");
		}

		return res.status(500).send('Unexpected error');
	};
