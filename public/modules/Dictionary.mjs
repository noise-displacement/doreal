class Dictionary {
  constructor() {
    this.language = null;
    this.dictionary = null;
  }

  setLanguage = async function (newLanguage) {
    this.dictionary = (
      await import(`../assets/lan/${newLanguage}`, { assert: { type: "json" } })
    )["default"];
    this.language = newLanguage.replace(".json", "");
    console.log(this.language);
    console.log(this.dictionary);
  };

  //Does not work as setLanguage is async or some bullshit
  getWord = function(key) {
    if (!this.dictionary) {
      console.log("no language file");
    } else {
      return this.dictionary[key];
    }
  };

  translateWord = function (word) {
    
  };
}

export default Dictionary;
