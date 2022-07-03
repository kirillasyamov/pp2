import PostModel from '../models/Post.js'

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: `UNABLE TO CREATE POST`,
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: `UNABLE TO GET ALL POSTS`,
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: 'after'
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: `UNABLE TO UPLOAD POST`,
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        message: `UNABLE TO GET POST BY ID`,
                    })
                }
                res.json(doc)
            }

        )
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: `UNABLE TO UPLOAD POST`,
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndDelete({
            _id: postId,
        },

            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: `UNABLE TO DELETE POST`,
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        message: `UNABLE TO GET POST BY ID`,
                    })
                }
                res.json({
                    success: true,
                })
            }

        )
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: `UNABLE TO DELETE POST`,
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id
        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,

            })

        res.json({
            success: true,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: `UNABLE TO UPDATE POST`,
        })
    }
}