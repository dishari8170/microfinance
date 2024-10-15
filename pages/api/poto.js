import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

export default (req, res) => {
    const form = new formidable.IncomingForm();

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'Something went wrong during file upload.' });
        }

        const file = files.file;
        const oldPath = file.path;
        const newPath = path.join(uploadDir, file.name);

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Could not save file.' });
            }
            res.status(200).json({ message: 'File uploaded successfully!' });
        });
    });
};
