const Officiating = function(sequelize, DataTypes) {
	return sequelize.define(
		'officiating',
		{
			pay: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			position: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isIn: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]
				}
			},
			status: {
				type: DataTypes.STRING(32),
				allowNull: false,
				defaultValue: 'pending',
				validate: {
					isIn: [['pending', 'accepted', 'declined', 'cancelled']]
				}
			}
		},
		{
			paranoid: true, // mark as deleted but do not delete
			underscored: true // use underscore instead of camelCase.
		}
	);
};

export default Officiating;
