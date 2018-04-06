const Game = function(sequelize, DataTypes) {
	return sequelize.define(
		'game',
		{
			event_name: DataTypes.STRING(64),
			event_date: DataTypes.DATE,
			event_type: DataTypes.STRING(64),
			venue_name: DataTypes.STRING(64),
			kids_referees: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			teens_referees: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			adults_referees: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			kids_refs_pay: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			teens_refs_pay: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			adults_refs_pay: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			}
		},
		{
			paranoid: true, // mark as deleted but do not delete
			underscored: true // use underscore instead of camelCase.
		}
	);
};

export default Game;
