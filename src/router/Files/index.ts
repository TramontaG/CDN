import { Router, json } from 'express';
import { downloadFile, uploadToBucket } from 'src/firebase';
import { useJWT } from 'src/middlewares/useAuth';
import mime from 'mime-types';

const FileRouter = Router();
FileRouter.use(json());

FileRouter.use('/:user/:filename', useJWT(['kozz-bucket'])).get(
	'/:user/:filename',
	async (req, res) => {
		const fileId = `${req.params.user}/${req.params.filename}`;
		const file = await downloadFile(fileId);
		res.setHeader('Content-Type', mime.lookup(req.params.filename) || 'octet-steam');
		res.send(file);
	}
);

type PostFileData = {
	fileName: string;
	data: string;
	userspace: string;
};

FileRouter.post<any, any, any, PostFileData>('/upload', async (req, res) => {
	const { data, fileName, userspace } = req.body;
	if (userspace !== 'public') {
		return res.send('Not implemented personal userspaces yet');
	}

	const fileId = `${userspace}/${fileName}`;
	const dataAsBuffer = Buffer.from(data, 'base64');
	await uploadToBucket(fileId, dataAsBuffer);

	return res.send({
		status: 'success',
		fileUrl: `https://gramont.ddns.net/cdn/file/${fileId}`,
	});
});

export default FileRouter;
