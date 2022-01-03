import fs from 'fs';
import jsonServer from "json-server";
class App {
	constructor() {
		this.port = process.env.PORT || 2000;
	}

	mountServer() {
		const files = fs.readdirSync('./src/database/projects/');

		const jsonConvertedFiles = files.map(fileName => {
			const fileJsonBuffer = fs.readFileSync(`./src/database/projects/${fileName}`);
			return JSON.parse(fileJsonBuffer);
		});

		const filesToJoin = jsonConvertedFiles.reduce((previousURL, currentURL) => {
			const files = {
				...previousURL,
				...currentURL
			}

			return files;
		}, {});

		return fs.writeFileSync('./src/database/db.json', JSON.stringify(filesToJoin));
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
