import jwt from 'jsonwebtoken'
const SECRETKEY = `abzzaaz`


export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRETKEY)

            req.userId = decoded._id

            next()
        } catch (e) {
            res.status(403).json({ message: `ACCESS DENIED` })
        }
    } else {
        res.status(403).json({ message: `ACCESS DENIED` })
    }
}