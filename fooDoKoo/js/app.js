// Basic client-side logic for fooDoKoo

document.getElementById('convertBtn').addEventListener('click', () => {
    const input = document.getElementById('inputRecipe').value;
    const direction = document.querySelector('input[name="direction"]:checked').value;
    let output = '';
    if (direction === 'toVeg') {
        output = convert(input, vegMap);
    } else {
        output = convert(input, nonVegMap);
    }
    document.getElementById('outputRecipe').value = output;
});

// shared converter function
function convert(text, map) {
    if (!text) return '';
    let result = text;
    for (const [from, to] of Object.entries(map)) {
        const regex = new RegExp(from, 'gi');
        result = result.replace(regex, to);
    }
    return result;
}

// bidirectional substitution maps
const vegMap = {
    'chicken': 'tofu',
    'mutton': 'seitan',
    'fish': 'jackfruit',
    'egg': 'scrambled tofu',
    'beef': 'tempeh',
    'pork': 'jackfruit',
    'shrimp': 'soy curl',
    'lamb': 'lentils',
    'duck': 'roasted cauliflower',
    'bacon': 'smoked tempeh',
    'salmon': 'carrot lox',
    'crab': 'king oyster mushroom',
    'lobster': 'hearts of palm'
    // extend as needed
};

// reverse map generated from vegMap
const nonVegMap = Object.fromEntries(
    Object.entries(vegMap).map(([k, v]) => [v, k])
);

// Suggestion bar logic - dummy AI suggestions
const sampleSuggestions = [
    'Spicy jackfruit curry',
    'Grilled tempeh with herbs',
    'Tofu tikka masala',
    'Vegan shepherd\'s pie',
    'Mushroom and lentil burger',
    'Cauliflower buffalo wings'
];

function getSuggestions(query) {
    if (!query) return [];
    const lower = query.toLowerCase();
    return sampleSuggestions.filter(s => s.toLowerCase().includes(lower));
}

document.getElementById('suggestBtn').addEventListener('click', () => {
    const query = document.getElementById('suggestionInput').value;
    const suggestions = getSuggestions(query);
    const list = document.getElementById('suggestionList');
    list.innerHTML = '';
    if (suggestions.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No suggestions found.';
        list.appendChild(li);
        return;
    }
    for (const s of suggestions) {
        const li = document.createElement('li');
        li.textContent = s;
        list.appendChild(li);
    }
});

// sample recipes for demonstration
const exampleRecipes = {
    "chicken curry": {
        direction: "toVeg",
        text: "1 lb chicken, spices, onions, tomatoes...cook until done."
    },
    "tofu curry": {
        direction: "toNonVeg",
        text: "1 lb tofu, spices, onions, tomatoes...cook until done."
    },
    "beef stew": {
        direction: "toVeg",
        text: "2 lbs beef chunks, carrots, potatoes, beef broth...simmer."
    },
    "lentil stew": {
        direction: "toNonVeg",
        text: "2 cups lentils, carrots, potatoes, vegetable broth...simmer."
    }
};

function initExamples() {
    const select = document.getElementById('exampleSelect');
    for (const key of Object.keys(exampleRecipes)) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = key;
        select.appendChild(opt);
    }
}

document.getElementById('loadExampleBtn').addEventListener('click', () => {
    const key = document.getElementById('exampleSelect').value;
    if (!key) return;
    const example = exampleRecipes[key];
    document.querySelector(`input[name="direction"][value="${example.direction}"]`).checked = true;
    document.getElementById('inputRecipe').value = example.text;
});

// initialize examples on page load
initExamples();