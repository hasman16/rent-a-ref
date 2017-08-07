export default function BlogController(models, ResponseService) {
  const Post = models.Post;
  const Comment = models.Comment;
  const User = models.User;



  function getAllPosts(req, res) {
    let clauses = {
      include: [{
        model: Comment
      }]
    };
    clauses = ResponseService.limitOffset(clauses, req);

    Post.findAll(clauses)
      .then(results => ResponseService.successCollection(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getPostsByUser(req, res) {
    let clauses = {
      where: {
        id: req.params.user_id
      },
      attributes: ['email', 'status'],
      include: [{
        model: Post,
        include: [{
          model: Comment
        }]
      }]
    };
    clauses = ResponseService.limitOffset(clauses, req);

    User.findOne(clauses)
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function getPost(req, res) {
    Post.findOne({
      where: {
        id: req.params.post_id
      },
      include: [{
        model: Comment
      }]
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function createPost(req, res) {
    const post = Object.assign({}, req.body, { user_id: req.decoded.id });
    Post.create(post)
      .then(result => ResponseService.success(res, result, 201))
      .catch(error => ResponseService.exception(res, error));
  }

  function updatePost(req, res) {
    const post_id = req.params.post_id;
    function update(oldPost) {
      let newPost = Object.assign({}, req.body);
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
    const post_id = req.params.post_id;
    function doDelete(post) {
      return Post.destroy({
        where: {
          id: post.id
        }
      })
    }
    ResponseService.findObject(post_id, 'Post', res, doDelete, 204);
  }

  function createComment(req, res) {
    const setter = {
      post_id: req.params.post_id
    };
    const comment = Object.assign({}, req.body, setter);
    Comment.create(comment)
      .then(result => ResponseService.success(res, result, 201))
      .catch(error => ResponseService.exception(res, error));
  }

  function updateComment(req, res) {
    const comment_id = req.params.comment_id;
    function update(oldComment) {
      let newComment = Object.assign({}, req.body);
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
    const comment_id = req.params.comment_id;
    function doDelete(comment) {
      return Comment.destroy({
        where: {
          id: comment.id
        }
      })
    }
    ResponseService.findObject(comment_id, 'Comment', res, doDelete, 204);
  }

  return {
    getAllPosts,
    getPostsByUser,
    getPost,
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment
  }
}
