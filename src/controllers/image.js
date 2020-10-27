import { s3 } from '../utils/imageUpload'

exports.getSignedUrl = async (req, res, next) => {
    try {
        const image = req.body.image;
        const url = await s3(image);
        console.log(s3(image))
        res.status(200).json(url);
    } catch(error) {
        res.status(500);
        console.log(error);
    }
}
