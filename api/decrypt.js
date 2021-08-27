import crypto from 'crypto';

export default (req, res) => {
  console.log('secret', process.env.GOOGLE_ENCRYPTION_SECRET)
  console.log('iv', process.env.GOOGLE_ENCRYPTION_IV)
  console.log(process.env)
  const algorithm = 'aes-128-cbc';
  const decipher = crypto.createDecipheriv(
    algorithm,
    process.env.GOOGLE_ENCRYPTION_SECRET,
    process.env.GOOGLE_ENCRYPTION_IV
  );
  let decrypted = decipher.update(req.body.data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  res.status(200).json(JSON.parse(decrypted))
}
