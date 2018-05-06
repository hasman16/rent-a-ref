export default function(sequelize, DataTypes) {
	return sequelize.define(
		'image',
		{
			mimetype: {
				type: DataTypes.STRING(64),
				allowNull: false
			},
			size: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			bucket: {
				type: DataTypes.STRING(64),
				allowNull: false
			},
			key: {
				type: DataTypes.STRING(64),
				allowNull: false
			},
			location: {
				type: DataTypes.STRING(128),
				allowNull: false
			}
		},
		{
			paranoid: true, // mark as deleted but do not delete
			underscored: true // use underscore instead of camelCase.
		}
	);
}
