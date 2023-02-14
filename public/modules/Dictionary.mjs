function Dictionary() {
    let language = null;
    let dictionary = null;

    // Had to change json files to js files with default export to support dynamically import them. Cant assert type json on dynamic import.
    this.setLanguage = async function(newLanguage) {
        dictionary = (await import(`../assets/lan/${newLanguage}`, {assert:{type:"json"}}))["default"];
    }

    //Does not work as setLanguage is async or some bullshit
    this.getWord = function(key) {
        if(!dictionary) {
            console.log("no language file");
        } else {
            return dictionary[key]
        }
    }

    const translationElements = new Set();

    this.translate = function(elements, attribute){
        translationElements.push({elements: elements});
        console.log(translationElements);
    }
}

export default Dictionary;