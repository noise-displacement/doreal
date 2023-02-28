import Dictionary from "./Dictionary.mjs";

const SUPPORTED_LANGUAGES = {
    "EN_UK": "EN_UK.json",
    "NO_NB": "NO_NB.json",
};

const selectLanguage = document.getElementsByName("selectLanguage");
export const saveSettingsBtn = document.querySelector("#saveSettingsBtn");

const dic = new Dictionary();
await dic.setLanguage(SUPPORTED_LANGUAGES.EN_UK);

function translateDocument(translateElements, attributeToSet) {
    let listToArrayConversion = Array.from(translateElements);
    let translateSet = new Set();

    for(const element of listToArrayConversion) {
        translateSet.add({
            attribute: attributeToSet, 
            element: element
        });
    }

    translateSet.forEach((item) => {
        let languageKey = item.element.attributes["data-language-key"].value;

        if(item.attribute === "innerHTML") {
            item.element.innerHTML = dic.getWord(languageKey);
        } else {
            item.element.attributes[item.attribute].value = dic.getWord(languageKey);
        }
    })

    console.log(translateSet);
}

const saveSettings = function() {
    const textElementsToTranslate = document.querySelectorAll("[data-language-key]:not([alt])");
    const imageAltsToTranslate = document.querySelectorAll("[data-language-key][alt]");

    for(const option of selectLanguage) {
        
        if(option.checked) {
            dic.setLanguage(SUPPORTED_LANGUAGES[option.value]);
        }

    }

    translateDocument(textElementsToTranslate, "innerHTML");
    translateDocument(imageAltsToTranslate, "alt");
}

export default saveSettings;