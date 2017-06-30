const request = require('request');
const fs = require('fs');


console.log('GETTING WORDS');
request('https://es.wiktionary.org/w/api.php?format=json&action=query&titles=Wikcionario:Frecuentes-(15001-20000)-Subt%C3%ADtulos_de_pel%C3%ADculas&rvprop=content&prop=revisions&redirects=1', function (error, response, body) {
  console.log();
  let data = JSON.parse(body).query.pages['44368'].revisions[0]['*'];
  let words = data.match(/[^[\}]+(?=\]\])/g);

  let file = fs.createWriteStream('./aux.txt');
  file.on('error', (err) => console.log("Error", err));
  words.forEach((word) => {
    file.write(word + '\n');
  });
  console.log("The file was created!");
  file.end();
});