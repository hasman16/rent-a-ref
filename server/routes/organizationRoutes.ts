import * as aws from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

aws.config.region = 'us-west-1';
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
  fileFilter: function(req, files, cb) {
    let mimeTypesRegex = /(jpeg|jpg|png|bmp|giff)/;
    let mimeType = files.mimetype;

    if (mimeTypesRegex.test(mimeType)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
  }
});

export default function organizationRoutes(setter, organizationCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;
  const isOrgOwner = authorization.isOrgOwner;
  const isOrgMember = authorization.isOrgMember;

  router.route('/organizers/:organization_id').get(authentication, organizationCtrl.getOrganizers);

  router.route('/organizations').get(authentication, organizationCtrl.getAll);
  router.route('/users/:user_id/organizations').get(authentication, organizationCtrl.getByUser);

  router.route('/organizations').post(authentication, organizationCtrl.create);
  router.route('/organizations/:organization_id').get(authentication, organizationCtrl.getOne);
  router.route('/organizations/:organization_id').put(authentication, isOrgOwner, organizationCtrl.update);
  router.route('/organizations/:organization_id').delete(authentication, isOrgOwner, organizationCtrl.deleteOne);

  router.route('/make_payment/:organization_id').post(authentication, organizationCtrl.makeStripePayment);  

  router.route('/upload_logo/:organization_id').post(authentication, upload.single('photo'), organizationCtrl.uploadLogo);  

}
