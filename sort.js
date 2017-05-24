//-- sort data files

fs = require('fs');
fs.readFile('./src/assets/data/craftable.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var json = JSON.parse(data);
    json.sort(function(a, b) { return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1; });
    fs.writeFile('./src/assets/data/craftable-sorted.json', JSON.stringify(json, null, "\t"));
    console.log("craftable.json sorted and saved as craftable-sorted.json");
});