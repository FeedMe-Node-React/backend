import s3 from '../utils/fileUpload'

exports.getSignedUrl = async (req, res, next) => {
    try {
        const params = req.params;
        const url = await s3();
        res.status(200).json({
            //
        });
    } catch(error) {
        res.status(500);
        console.log(error);
    }
}
