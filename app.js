let express = require('express'),
app = express();

app.set('port', process.argv[2] || process.env.PORT || 8080);

app.get('/', (req, res) => {

    res.send('oh boy.');

});

app.listen(app.get('port'), () => {

    console.log('mean_orbcraft_online is up on port: ' + app.get('port'));

});
