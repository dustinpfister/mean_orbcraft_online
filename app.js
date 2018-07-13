let express = require('express'),
path = require('path'),
app = express();

app.set('port', process.argv[2] || process.env.PORT || 8080);

// theme, and rendering
app.set('theme', 'basic'); // only one them for now so.
app.set('views', path.join(__dirname, 'views', app.get('theme')));
app.set('view engine', 'ejs');


// static paths
app.use('/js', express.static('./public/js'));

app.get('/', (req, res) => {

    res.render('index',{layout:'home'});

});

app.use(require('./middleware/login')({
	
	views: app.get('views'),
	theme: app.get('theme')
	
	
}));

app.listen(app.get('port'), () => {

    console.log('mean_orbcraft_online is up on port: ' + app.get('port'));

});
