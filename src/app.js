import jsonServer from 'json-server';

class App {
	constructor() {
		this.port = process.env.PORT || 4000;
	}

	setup() {
        try {
            const server = jsonServer.create();
            const router = jsonServer.router('./src/database/db.json');
            const middlewares = jsonServer.defaults();

            server.use(middlewares);
            server.use(router);
            server.listen(this.port);

            console.log('Success!')
        } catch (error) {
            console.log('An error ocurred!', error)
        }
	}

	start() {
		this.setup();
	}
}

export default App;