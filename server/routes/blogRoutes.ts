export default function blogRoutes(setter, blogCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;

  router.route('/post').get(blogCtrl.getAllPosts);
  router.route('/user/:user_id/post').get(blogCtrl.getPostsByUser);
  router.route('/post/:post_id').get(blogCtrl.getPost);

  router.route('/post').post(authentication, isUserOrAdmin, blogCtrl.createPost);
  router.route('/post/:post_id').put(authentication, isUserOrAdmin, blogCtrl.updatePost);
  router.route('/post/:post_id').delete(authentication, isAdmin, blogCtrl.deletePost);

  router.route('/post/:post_id/comment').post(authentication, isUserOrAdmin, blogCtrl.createComment);
  router.route('/comment/:comment_id').put(authentication, isAdmin, blogCtrl.updateComment);
 router.route('/comment/:comment_id').delete(authentication, isAdmin, blogCtrl.deleteComment);
}
