import saveSettings, {saveSettingsBtn} from "./modules/settings.mjs";

const app = function() {
    saveSettingsBtn.addEventListener("click", saveSettings);
}

app();

export default app;