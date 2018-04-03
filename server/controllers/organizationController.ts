import { stripe } from 'stripe';

export default function OrganizationController(models, ResponseService) {
  const Organization = models.Organization;
  const attributes = ['id', 'name', 'user_id'];

  function getAll(req, res) {
    Organization.findAll({
      attributes: attributes
    })
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
    const stripeHandler = stripe(process.env.STRIPE_KEY);
    const token = req.body.stripeToken;

    // Charge the user's card:
    stripeHandler.charges
      .create({
        amount: 777,
        currency: 'usd',
        description: 'Example charge',
        source: token
      })
      .then(charge => {
        ResponseService.success(res, charge);
      })
      .catch(err => {
        ResponseService.exception(res, err);
      });
  }

  return {
    getAll,
    getByUser,
    getOrganizers,
    getOne,
    create,
    update,
    deleteOne,
    makeStripePayment
  };
}
