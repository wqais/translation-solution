// Google Cloud Translation API Key
const apiKey = 'no_free_api_found';

// Function to fetch supported languages and populate dropdowns
async function populateLanguages() {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}&target=en`);
    const data = await response.json();
    const languages = data.data.languages;

    const sourceLangSelect = document.getElementById('sourceLang');
    const targetLangSelect = document.getElementById('targetLang');

    languages.forEach(lang => {
        const option = document.createElement('option');
        option.text = lang.name;
        option.value = lang.language;
        sourceLangSelect.appendChild(option.cloneNode(true));
        targetLangSelect.appendChild(option);
    });
}

// Function to translate text
async function translate() {
    const inputText = document.getElementById('inputText').value;
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;

    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${encodeURIComponent(inputText)}&source=${sourceLang}&target=${targetLang}`);
    const data = await response.json();

    const translatedText = data.data.translations[0].translatedText;
    document.getElementById('outputText').innerText = translatedText;
}

// Populate languages dropdowns when the page loads
populateLanguages();
