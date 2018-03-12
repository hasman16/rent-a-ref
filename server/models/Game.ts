const Game = function(sequelize, DataTypes) {
	return sequelize.define(
		'game',
		{
			name: DataTypes.STRING(64),
			date: DataTypes.DATE,
			type: DataTypes.STRING(64),
			ages: DataTypes.STRING(64),
			duration: DataTypes.INTEGER,
			referees: DataTypes.INTEGER,
			pay: DataTypes.INTEGER
		},
		{
			paranoid: true, // mark as deleted but do not delete
			underscored: true // use underscore instead of camelCase.
		}
	);
};

export default Game;
