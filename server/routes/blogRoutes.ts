export default function blogRoutes(setter, blogCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;

  router.route('/posts').get(blogCtrl.getAllPosts);
  router.route('/users/:user_id/posts').get(blogCtrl.getPostsByUser);
  router.route('/posts/:post_id').get(blogCtrl.getPost);

  router.route('/posts').post(authentication, isUserOrAdmin, blogCtrl.createPost);
  router.route('/posts/:post_id').put(authentication, isUserOrAdmin, blogCtrl.updatePost);
  router.route('/posts/:post_id').patch(authentication, isUserOrAdmin, blogCtrl.updatePost);
  router.route('/posts/:post_id').delete(authentication, isAdmin, blogCtrl.deletePost);

  router.route('/posts/:post_id/comment').post(authentication, isUserOrAdmin, blogCtrl.createComment);
  router.route('/comments/:comment_id').put(authentication, isAdmin, blogCtrl.updateComment);
  router.route('/comments/:comment_id').patch(authentication, isAdmin, blogCtrl.updateComment);
  router.route('/comments/:comment_id').delete(authentication, isAdmin, blogCtrl.deleteComment);
}
