import * as Stripe from 'stripe';
import * as _ from 'lodash';
import { OrderModel } from './../types/index';

export default function OrganizationController(models, ResponseService) {
  const Organization = models.Organization;
  const Address = models.Address;
  const Organizer = models.Organizer;
  const Phone = models.Phone;
  const attributes = ['id', 'name', 'user_id'];

  function getAll(req, res) {
    const clause = ResponseService.produceSearchAndSortClause(req);
    Organization.findAndCountAll(clause)
      .then(results => ResponseService.successCollection(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getByUser(req, res) {
    let clause = ResponseService.produceSearchAndSortClause(req);
    const Image = models.Image;
    const whereClause = Object.assign(clause, {
      where: {
        user_id: req.params.user_id
      },
      include: [
        {
          model: Image,
          through: {
            attributes: []
          }
        }
      ]
    });

    Organization.findAndCountAll(whereClause)
      .then(results => ResponseService.success(res, results))
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
        },
        {
          model: Address
        },
        {
          model: Phone
        }
      ],
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  async function create(req, res) {
    const sequelize = models.sequelize;
    const user_id = req.decoded.id;

    const body = ResponseService.getItemFromBody(req);
    const organization = {
      name: body.name,
      user_id: user_id
    };
    const addresses = body.addresses;
    const phones = body.phones;
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newOrganization = await Organization.create(organization, {
        transaction
      });
      const organizer = {
        organization_id: newOrganization.id,
        user_id: user_id
      };
      const newOrganizer = await Organizer.create(organizer, { transaction });

      await bulkCreateAddresses(newOrganization, addresses, transaction);

      await bulkCreatePhones(newOrganization, phones, transaction);

      await transaction.commit();
      ResponseService.success(
        res,
        {
          id: newOrganization.id,
          name: newOrganization.name,
          user_id: newOrganization.user_id
        },
        201
      );
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error);
    }
  }

  async function update(req, res) {
    const sequelize = models.sequelize;
    const body = ResponseService.getItemFromBody(req);
    const organization_id = req.params.organization_id;
    const newAddresses = body.newAddresses;
    const newPhones = body.newPhones;
    const updatedAddresses = body.updatedAddresses;
    const updatedPhones = body.updatedPhones;
    const newName = body.name;
    let transaction;

    try {
      transaction = await sequelize.transaction();
      const organization = await Organization.findById(organization_id, {
        transaction
      });
      if (!organization) {
        throw new Error('Organization not found.');
      }
      if (_.isString(newName) && newName.length > 3) {
        await Organization.update(
          { name: newName },
          {
            where: {
              id: organization_id
            }
          },
          { transaction }
        );
      }

      await bulkCreateAddresses(organization, newAddresses, transaction);
      await bulkCreatePhones(organization, newPhones, transaction);

      if (Array.isArray(updatedAddresses) && updatedAddresses.length > 0) {
        const addresses = await Promise.all(
          updatedAddresses.map(async address => {
            await Address.update(
              address,
              {
                where: {
                  id: address.id
                }
              },
              { transaction }
            );
          })
        );
      }
      if (Array.isArray(updatedPhones) && updatedPhones.length > 0) {
        const phones = await Promise.all(
          updatedPhones.map(async phone => {
            await Phone.update(
              phone,
              {
                where: {
                  id: phone.id
                }
              },
              { transaction }
            );
          })
        );
      }

      const newOrganization = await Organization.findOne(
        {
          where: {
            id: organization_id
          },
          include: [
            {
              model: models.Image
            },
            {
              model: Address
            },
            {
              model: Phone
            }
          ],
          attributes: attributes
        },
        { transaction }
      );

      await transaction.commit();
      ResponseService.success(res, newOrganization);
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error);
    }
  }

  async function bulkCreateAddresses(organization, addresses, transaction) {
    if (Array.isArray(addresses) && addresses.length > 0) {
      const newAddresses = await Address.bulkCreate(addresses, {
        transaction,
        returning: true
      });
      await organization.addAddress(newAddresses, { transaction });
    }
  }

  async function bulkCreatePhones(organization, phones, transaction) {
    if (Array.isArray(phones) && phones.length > 0) {
      const newPhones = await Phone.bulkCreate(phones, {
        transaction,
        returning: true
      });
      await organization.addPhone(newPhones, { transaction });
    }
  }

  async function deleteOne(req, res) {
    const sequelize = models.sequelize;
    const Game = models.Game;
    const organization_id = req.params.organization_id;
    let transaction;

    try {
      transaction = await sequelize.transaction();
      let organization = await Organization.findOne(
        {
          where: {
            id: organization_id
          },
          include: [
            {
              model: Game
            }
          ]
        },
        { transaction }
      );
      const games = organization.games;

      if (!organization) {
        throw new Error('Organization not found.');
      }

      if (games.length > 0) {
        throw new Error('This organization has ' + games.length + ' events.');
      }

      await Organization.destroy(
        {
          where: {
            id: organization.id
          }
        },
        { transaction }
      );

      await transaction.commit();
      ResponseService.success(
        res,
        'Organization :' + organization_id + ' was deleted',
        204
      );
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error);
    }
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
    if (file) {
      const sequelize = models.sequelize;
      const OrganizationImage = models.OrganizationImage;
      const Image = models.Image;
      const findOrganization = (newImage, t) => {
        return Organization.findById(req.params.organization_id, {
          transaction: t
        }).then(organization => {
          return deleteOrganizationImage(newImage, organization, t);
        });
      };
      const deleteOrganizationImage = (newImage, organization, t) => {
        return OrganizationImage.destroy(
          {
            where: {
              organization_id: organization.id
            }
          },
          {
            transaction: t
          }
        ).then(() => {
          return addOrganizationImage(newImage, organization, t);
        });
      };
      const addOrganizationImage = (newImage, organization, t) => {
        return OrganizationImage.create(
          {
            image_id: newImage.id,
            organization_id: organization.id
          },
          {
            transaction: t
          }
        );
      };

      sequelize
        .transaction(function(t) {
          return Image.create(file, { transaction: t }).then(newImage => {
            return findOrganization(newImage, t);
          });
        })
        .then(() => {
          ResponseService.success(res, 'Uploaded Image Successfully.');
        })
        .catch(error => ResponseService.exception(res, error));
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
    uploadLogo
  };
}
