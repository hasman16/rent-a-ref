"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function BlogController(models, ResponseService) {
    var Post = models.Post;
    var Comment = models.Comment;
    var User = models.User;
    function getAllPosts(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        Post.findAndCountAll(clause)
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getPostsByUser(req, res) {
        var clauses = ResponseService.limitOffset({}, req);
        var mainClauses = {
            where: {
                id: req.params.user_id
            },
            attributes: ['id', 'email', 'status'],
            include: [
                {
                    model: Post,
                    limit: clauses.limit,
                    offset: clauses.offset,
                    order: clauses.order
                }
            ]
        };
        console.log('getPostsByUser');
        User.findOne(mainClauses)
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getPost(req, res) {
        Post.findOne({
            where: {
                id: req.params.post_id
            },
            include: [
                {
                    model: Comment,
                    limit: 10,
                    offset: 0,
                    order: 'ASC'
                }
            ]
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function createPost(req, res) {
        var post = Object.assign({}, req.body, { user_id: req.decoded.id });
        Post.create(post)
            .then(function (result) { return ResponseService.success(res, result, 201); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function updatePost(req, res) {
        var post_id = req.params.post_id;
        function update(oldPost) {
            var newPost = Object.assign({}, req.body);
            delete newPost.user_id;
            return Post.update(newPost, {
                where: {
                    id: oldPost.id
                }
            });
        }
        ResponseService.findObject(post_id, 'Post', res, update);
    }
    function deletePost(req, res) {
        var post_id = req.params.post_id;
        function doDelete(post) {
            return Post.destroy({
                where: {
                    id: post.id
                }
            });
        }
        ResponseService.findObject(post_id, 'Post', res, doDelete, 204);
    }
    function createComment(req, res) {
        var setter = {
            post_id: req.params.post_id
        };
        var comment = Object.assign({}, req.body, setter);
        Comment.create(comment)
            .then(function (result) { return ResponseService.success(res, result, 201); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function updateComment(req, res) {
        var comment_id = req.params.comment_id;
        function update(oldComment) {
            var newComment = Object.assign({}, req.body);
            delete newComment.post_id;
            return Comment.update(newComment, {
                where: {
                    id: oldComment.id
                }
            });
        }
        ResponseService.findObject(comment_id, 'Comment', res, update);
    }
    function deleteComment(req, res) {
        var comment_id = req.params.comment_id;
        function doDelete(comment) {
            return Comment.destroy({
                where: {
                    id: comment.id
                }
            });
        }
        ResponseService.findObject(comment_id, 'Comment', res, doDelete, 204);
    }
    return {
        getAllPosts: getAllPosts,
        getPostsByUser: getPostsByUser,
        getPost: getPost,
        createPost: createPost,
        updatePost: updatePost,
        deletePost: deletePost,
        createComment: createComment,
        updateComment: updateComment,
        deleteComment: deleteComment
    };
}
exports.default = BlogController;
//# sourceMappingURL=blogController.js.map