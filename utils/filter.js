const filter = require('leo-profanity')

module.exports = function filterString(userInput){
    filter.loadDictionary();
    filter.add(['piss', 'pissed', 'damn','dammit', 'asses']);
    return filter.clean(userInput);
}
