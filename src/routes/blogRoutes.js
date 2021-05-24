var express = require('express');
const blogRouter = express.Router();
var connection = require('../db/dbConnection');

function router(nav) {
    var blogs = [];
    blogRouter.route('/').get((req, res) => {
        (async function query() {
            await connection.promise().query('SELECT * FROM blog ORDER BY likes desc').then(rows => {
                blogs = rows[0];
                res.render(
                    'blogsListView',
                    {
                        nav,
                        title: 'Latest Blogs',
                        blogs: blogs
                    });
            }).catch((error) => {
                res.status(404).render(error);
            })
        }());
    });

    blogRouter.route('/new-blog').get((req, res) => {
        res.render(
            'newBlog',
            {
                nav,
                title: 'New Blog',
            }
        );
    })

    blogRouter.route('/add-blog').post(async (req, res) => {
        const blogToAdd = req.body;
        const like = 0;
        await connection.query('INSERT INTO blog(author,category,title,description,likes) values("' + blogToAdd.blogauthor + '","' + blogToAdd.blogcategory + '","' + blogToAdd.blogtitle + '","' + blogToAdd.blogdescription + '",' + like + ')', function (err, result) {
            if (err) {
                console.log(err);
                res.redirect('/blogs/new-blog')
            }
            else {
                console.log('inserted');
                res.redirect('/blogs');
            }
        });
    })

    blogRouter.route('/edit-blog/:id').get(async (req, res) => {
        const { id } = req.params;
        try {
            if(isNaN(id)){
                res.redirect('/page-not-found');
            }
            const result = await connection.promise().query('SELECT * FROM blog where id=' + id);
            const edit_blog = result[0];
            if (typeof(edit_blog[0]) == "undefined") {
                res.redirect('/page-not-found');
            }
            if (!result) {
                return res.status(404).send(e);
            }
            res.render(
                'editBlog',
                {
                    nav,
                    title: edit_blog[0].title,
                    blog: edit_blog[0],
                }
            );
        }
        catch (error) {
            res.status(404).render(error);
        }
    });

    blogRouter.route('/save-edit/:id').post(async (req, res) => {
        const { id } = req.params;
        const blogToUpdate = req.body;
        try {
            await connection.query('UPDATE blog SET author="' + blogToUpdate.blogauthor + '",category="' + blogToUpdate.blogcategory + '",title="' + blogToUpdate.blogtitle + '",description="' + blogToUpdate.blogdescription + '" WHERE id=' + id, function (err, result) {
                if (err) {
                    res.redirect('/blogs')
                }
                else {
                    res.redirect('/blogs/' + id);
                }
            });
            res.redirect('/blogs')
        } catch (error) {
            res.status(404).render(error);
        }
    })

    blogRouter.route('/delete/:id').get(async (req, res) => {
        const { id } = req.params;
        try {
            connection.query('DELETE FROM blog where id=' + id, function (err, result) {
                if (err) {
                    res.status(404).send(err);
                } else {
                    res.redirect('/blogs');
                }
            });
        } catch (error) {
            res.status(404).render(error);
        }
    })

    blogRouter.route('/like/:id').get(async (req, res) => {
        const { id } = req.params;
        try {
            await connection.query('UPDATE blog SET likes=likes+1 where id=' + id, function (err, result) {
                if (err) {
                    res.status(404).render(err);
                } else {
                    res.redirect('/blogs/' + id);
                }
            });
        } catch (error) {

        }
    })

    blogRouter.route('/:id').get(async (req, res) => {
        const { id } = req.params;
        try {
            if(isNaN(id)){
                res.redirect('/page-not-found');
            }
            const result = await connection.promise().query('SELECT * FROM blog where id=' + id);
            const blog = result[0];
            if (typeof(blog[0]) == "undefined") {
                res.redirect('/page-not-found');
            }
            res.render(
                'blogView',
                {
                    nav,
                    title: blog[0].title,
                    book: blog[0],
                }
            );
        }
        catch (error) {
            res.status(404).render(error);
        }
    });
    blogRouter.get('/**', function (req, res) {
        res.redirect('/page-not-found');
    })
    return blogRouter;
}
module.exports = router;