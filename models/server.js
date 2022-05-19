const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            character: '/api/character'
            //movieSeries: '/api/movies'
        }

        //Conecta a base de datos
        this.conectarDB();

        //middlewares;
        this.middlewares()

        //rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //cors
        this.app.use(cors());

        //parseo y lectura body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.character, require('../routes/character'));
        //this.app.use(this.paths.movieSeries, require('../routes/movieSeries'));
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('App listening on port', this.port);
          });
    }

}

module.exports = Server;