module.exports = function(app){

	var usuario    = app.controllers.usuarios;
	var autenticar = require('../middleware/autenticar');

	app.get('/usuarios', usuario.index);
	
	app.get('/usuarios/create',usuario.create);
	app.post('/usuarios/create', usuario.post);
	app.route('/usuarios/show/:id').get( usuario.show);
	app.route('/usuarios/delete/:id').post(usuario.delete);
	app.route('/usuarios/edit/:id')
		.get(usuario.edit)
		.post(usuario.update);
	/*
	app.route('/usuarios/show/:id').get(autenticar, usuario.show);
	app.route('/usuarios/delete/:id').post(usuario.delete);

	app.route('/usuarios/edit/:id')
		.get(autenticar, usuario.edit)
		.post(usuario.update);*/
}