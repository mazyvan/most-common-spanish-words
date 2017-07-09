fs = require('fs')
fs.readFile('./most-common-spanish-words.txt', 'utf8', function (err, data) {
  if (err) return console.log(err);

  // Separa el archivo linea por linea
  words = data.split('\n')

  // Regresa unicamente las palabras antes del '|'
  words = words.map(word => {
    let firstWord = word.match(/.*\|/g);
    console.log(firstWord ? firstWord[0].slice(0, -1) : word);
    return firstWord ? firstWord[0].slice(0, -1) : word;
  });


  // Remueve las palabras repetidas
  words = words.filter((elem, index, self) => index == self.indexOf(elem))

  // Crea el archivo y escribe en el las palabras linea por linea
  let file = fs.createWriteStream('./most-common-spanish-words-v5.txt');
  file.on('error', (err) => console.log("Error", err));

  words.forEach(word => {
    file.write(word + '\n');
  });

  file.end();
});