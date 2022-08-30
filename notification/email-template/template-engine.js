const Handlebars = require('handlebars')
const fs = require('fs');
const path = require('path')

const partialsDir = path.join(__dirname, './partials');

let filenames = fs.readdirSync(partialsDir);
filenames.forEach(function (filename) {
  const matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  const name = matches[1];
  const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  Handlebars.registerPartial(name, template);
});

const compiledTemplates = {}
const templatesDir = path.join(__dirname, './templates');
filenames = fs.readdirSync(templatesDir);
filenames.forEach(function (filename) {
  const matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  const name = matches[1];
  const source = fs.readFileSync(templatesDir + '/' + filename, 'utf8');
  const template = Handlebars.compile(source)
  compiledTemplates[name] = template
});

module.exports.hbsTemplate = function(name, data) {
  return compiledTemplates[name](data)
}