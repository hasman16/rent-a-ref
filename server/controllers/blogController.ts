export default function AddressController(models, ResponseService) {
  const Post = models.Post;
  const Comment = models.Comment;
  const User = models.User;

  function getAllPosts(req, res) {
    Post.findAll({
      include: [{
        model: Comment
      }]
    })
      .then(results => ResponseService.successCollection(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getPostsByUser(req, res) {
    User.findOne({
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
    })
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
      .then(results => ResponseService.successCollection(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function createPost(req, res) {
    const post = Object.assign({}, req.body, { user_id: req.decoded.id });
    Post.create(post)
      .then(result => ResponseService.success(res, result, 201))
      .catch(error => ResponseService.exception(res, error));
  }

  function updatePost(req, res) {
    let post = Object.assign({}, req.body);
    delete post.user_id;

    Post.update(post, {
      where: {
        id: req.params.post_id
      }
    })
      .then(result => ResponseService.success(res, result, 200))
      .catch(error => ResponseService.exception(res, error));
  }

  function deletePost(req, res) {
    Post.update({
      where: {
        id: req.params.post_id
      }
    })
      .then(result => ResponseService.success(res, result, 204))
      .catch(error => ResponseService.exception(res, error));
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
    const comment = Object.assign({}, req.body);
    delete comment.post_id;
    
    Comment.update(comment, {
      where: {
        id: req.params.comment_id
      }
    })
      .then(result => ResponseService.success(res, result, 200))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteComment(req, res) {
    Comment.delete({
      where: {
        id: req.comment_id
      }
    })
      .then(result => ResponseService.success(res, result, 204))
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    getAllPosts,
    getPostsByUser,
    getPost,
    createPost,
    updatePost,
    deletePost,
    createComment,
    deleteComment
  }
}
