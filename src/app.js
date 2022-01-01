import fs from 'fs';
import jsonServer from "json-server";
class App {
	constructor() {
		this.port = process.env.PORT || 4000;
	}

	mountServer() {
		const files = fs.readdirSync('./src/database/projects/');

		const filesBuffered = files.map(fileName => {
			const fileJsonBuffer = fs.readFileSync(`./src/database/projects/${fileName}`);
			return fileJsonBuffer;
		});

		const filesToConvert = filesBuffered.map(file => {
			return JSON.parse(file);
		});

		const result = filesToConvert.reduce((previous, current) => {
			previous = {
				...previous,
				...current
			}

			return previous;
		}, {});

		return fs.writeFileSync('./src/database/db.json', JSON.stringify(result));
	}

	setup() {
		try {
			this.mountServer();
			const server = jsonServer.create();
			const router = jsonServer.router("./src/database/db.json");
			const middlewares = jsonServer.defaults();

			server.use(middlewares);
			server.use(router);
			server.listen(this.port);

			console.log("Success!");
		} catch (error) {
			console.log("An error ocurred!", error);
		}
	}

	start() {
		this.setup();
	}
}

export default App;
