const app = require('./app');
const sequelize = require('./models');
const PORT = require('./config').port;

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	
    await assertDatabaseConnectionOk();

	app.listen(PORT, () => {
		console.log(`Library System API Server started on port ${PORT}.`);
	});
}

init();