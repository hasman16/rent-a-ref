import * as Stripe from 'stripe';

export default function OrganizationController(models, ResponseService) {
  const Organization = models.Organization;
  const attributes = ['id', 'name', 'user_id'];
  const stripe = new Stripe(process.env.STRIPE_KEY);

  function getAll(req, res) {
    const clause = ResponseService.produceSearchAndSortClause(req);
    console.log('clause:::', clause);
    Organization.findAndCountAll(clause)
      .then(results => ResponseService.successCollection(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getByUser(req, res) {
    const User = models.User;

    User.findOne({
      where: {
        id: req.params.user_id
      },
      include: [
        {
          model: Organization,
          through: {
            attributes: []
          }
        }
      ]
    })
      .then(results => {
        ResponseService.success(res, results);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function getOrganizers(req, res) {
    const Organizer = models.Organizer;

    Organizer.findAll({
      where: {
        organization_id: req.params.organization_id
      },
      include: [
        {
          model: models.Person
        }
      ]
    })
      .then(results => ResponseService.successCollection(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    Organization.findOne({
      where: {
        id: req.params.organization_id
      },
      include: [
        {
          model: models.Image
        }
      ],
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    const sequelize = models.sequelize;
    const user_id = req.decoded.id;
    const Organizer = models.Organizer;
    const organization = {
      name: req.body.name,
      user_id: user_id
    };

    sequelize
      .transaction(function(t) {
        return Organization.create(organization, { transaction: t }).then(
          newOrganization => {
            const organizer = {
              organization_id: newOrganization.id,
              user_id: user_id
            };
            return Organizer.create(organizer, { transaction: t }).then(
              newOrganizer => {
                const org = {
                  id: newOrganization.id,
                  name: newOrganization.name,
                  user_id: newOrganization.user_id
                };
                ResponseService.success(res, org, 201);
              }
            );
          }
        );
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const organization = {
      name: req.body.name
    };
    Organization.update(organization, {
      where: {
        id: req.params.organization_id
      }
    })
      .then(result => getOne(req, res))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const organization_id = req.params.game_id;

    function doDelete(organization) {
      return Organization.destroy({
        where: {
          id: organization.id
        }
      });
    }

    ResponseService.findObject(
      organization_id,
      'Organization',
      res,
      doDelete,
      204
    );
  }

  function makeStripePayment(req, res) {
    const token = ResponseService.getItemFromBody(req);
    // Charge the user's card:
    console.log('token is:', token.id);
    stripe.charges
      .create({
        amount: 777,
        currency: 'usd',
        description: 'Example charge',
        source: token.id
      })
      .then(charge => {
        ResponseService.success(res, charge);
      })
      .catch(err => {
        ResponseService.exception(res, err);
      });
  }
  /*
  { 
    fieldname: 'photo',
    originalname: 'blob',
    encoding: '7bit',
    mimetype: 'image/png',
    size: 102722,
    bucket: 'rentaref',
    key: '1525549567462',
    acl: 'private',
    contentType: 'application/octet-stream',
    contentDisposition: null,
    storageClass: 'STANDARD',
    serverSideEncryption: null,
    metadata: { fieldName: 'photo' },
    location: 'https://rentaref.s3.us-west-1.amazonaws.com/1525549567462',
    etag: '"c1fdf2fd9f3a5dbc41bc9527415736a0"'
  }
*/
  function uploadLogo(req, res) {
    const file = req.file;
    //console.log('uploadLogon:', file);
    if (file) {
      const OrganizationImage = models.OrganizationImage;
      const Image = models.Image;
      let anImage;

      Image.create(file)
        .then(image => {
          const anImage = image;
          return Organization.findById(req.params.organization_id);
        })
        .then(organization => {
          return OrganizationImage.create({
            image_id: anImage.id,
            organization_id: organization.id
          });
        })
        .then(() => {
          res.json(201, {
            success: true,
            message: 'upload success.'
          });
        })
        .catch(err => {
          res.json(400, {
            success: false,
            message: err
          });
        });
    } else {
      res.json(400, {
        success: false,
        message: 'upload failed.'
      });
    }
  }

  return {
    getAll,
    getByUser,
    getOrganizers,
    getOne,
    create,
    update,
    deleteOne,
    makeStripePayment,
    uploadLogo
  };
}
