var Handlebars = require('handlebars')
var fs = require('fs');

var partialsDir = __dirname + './partials';

var filenames = fs.readdirSync(partialsDir);
filenames.forEach(function (filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  Handlebars.registerPartial(name, template);
});

var compiledTemplates = {}
var templatesDir = __dirname + './templates';
filenames = fs.readdirSync(templatesDir);
filenames.forEach(function (filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var source = fs.readFileSync(templatesDir + '/' + filename, 'utf8');
  var template = Handlebars.compile(source)
  compiledTemplates[name] = template
});

module.exports.hbsTemplate = function(name, data) {
  return compiledTemplates[name](data)
}