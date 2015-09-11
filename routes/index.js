
exports.index = function(req, res){
	res.render('index', { });
};

exports.lesson = function(req, res){
	var lessonId = req.param('id');

	if(! isViewable(0, lessonId)) {
		res.render('error', { 
			level: 'warning',
			message:'this lesson is not open to current user',
			redirectTo:'/'
		});
	}

	res.render('lesson', { id: lessonId });
};

exports.vwUpload = function (req, res) { res.render('upload', {}); }
exports.doUpload = function (req, res) {}

var isViewable = function(userId, lessonId) {
	return lessonId % 2 != 0;
}
