
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , aws = require('aws-sdk')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('my$ecret'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap')));
app.use('/angular', express.static(path.join(__dirname, '/node_modules/angular')));
app.use('/angular-route', express.static(path.join(__dirname, '/node_modules/angular-route')));

// development only
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.locals.pretty = true;
});

var AWS_ACCESS_KEY = "AKIAJGZTZ3DLNWCX6LIA";
var AWS_SECRET_KEY = "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";
var S3_BUCKET = "omniedu-dev";
console.log(AWS_ACCESS_KEY);
console.log(AWS_SECRET_KEY);
console.log(S3_BUCKET);

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/lesson/:id', routes.lesson);

/* admin tool */
app.get('/admin/upload', routes.vwUpload);
app.post('/admin/upload', routes.doUpload);

/* angular test */
app.get('/aj', function(req, res){ res.render('aj'); });

/* test code 
var arys = [ 
{"id":11632, "title":"CRO training : 1", "desc":"bbba", "src":"/assets/SampleVideo_1080x720_1mb.mp4"},
{"id":11432, "title":"CRO training : 2", "desc":"bbba", "src":"/assets/SampleVideo_1080x720_2mb.mp4"},
{"id":12132, "title":"CRO training : 3", "desc":"bbba", "src":"/assets/SampleVideo_1080x720_5mb.mp4"},

{"id":32532, "title":"Blue shit training : 1", "desc":"bbba", "src":""},
];
app.get('/api/courses', function(req, res){ 
	res.json(arys); 
});
app.get('/api/course/:id', function(req, res){ 
	var courseId = req.param('id');
	var result = null;
	for(var i=0; i<arys.length; i++) {
		if(arys[i].id == courseId) {
			result = arys[i]; 
			break;
		}
	}
	res.json(result);
});
*/

/* aws s3 */
app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
