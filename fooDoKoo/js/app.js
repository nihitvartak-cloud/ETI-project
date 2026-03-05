// Basic client-side logic for fooDoKoo
// Google Gemini API Configuration
const GEMINI_API_KEY = 'AIzaSyC0s_rht1lCpJprd7HeOGRYW2kbRl_cgKw';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

document.getElementById('convertBtn').addEventListener('click', () => {
    const btn = document.getElementById('convertBtn');
    // quick pulse animation on click
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 300);

    const input = document.getElementById('inputRecipe').value;
    const direction = document.querySelector('input[name="direction"]:checked').value;
    let output = '';
    if (direction === 'toVeg') {
        output = convert(input, vegMap);
    } else {
        output = convert(input, nonVegMap);
    }
    const outArea = document.getElementById('outputRecipe');
    outArea.value = output;
    outArea.classList.add('fade-in');
    setTimeout(() => outArea.classList.remove('fade-in'), 500);

    // Try to match and show recipe
    matchAndShowRecipe(output, direction);
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

// Recipe Database with complete recipes
const recipeDatabase = {
    'tofu': {
        name: 'Tofu Stir-Fry',
        servings: '4',
        prepTime: '15 minutes',
        cookTime: '20 minutes',
        ingredients: [
            '1 block firm tofu, cubed',
            '2 cups mixed vegetables (bell peppers, broccoli, carrots)',
            '3 cloves garlic, minced',
            '2 tbsp soy sauce',
            '1 tbsp sesame oil',
            '1 tbsp ginger, grated',
            'Green onions for garnish'
        ],
        instructions: [
            'Press tofu to remove excess water',
            'Heat sesame oil in a wok or large pan',
            'Add garlic and ginger, stir-fry for 1 minute',
            'Add vegetables and stir-fry for 5 minutes',
            'Add tofu cubes and soy sauce',
            'Cook for another 5-7 minutes until vegetables are tender',
            'Garnish with green onions and serve hot'
        ],
        tips: 'Press your tofu well for a crispier texture. You can also add cashews or peanuts for extra crunch!'
    },
    'seitan': {
        name: 'Seitan Masala',
        servings: '4',
        prepTime: '20 minutes',
        cookTime: '30 minutes',
        ingredients: [
            '250g seitan, cubed',
            '1 onion, diced',
            '3 tomatoes, chopped',
            '2 tbsp ginger-garlic paste',
            '2 tsp garam masala',
            '1 tsp turmeric',
            '1 cup coconut milk',
            'Oil, salt, and fresh cilantro'
        ],
        instructions: [
            'Heat oil in a heavy-bottomed pot',
            'Sauté onions until golden',
            'Add ginger-garlic paste and cook for 2 minutes',
            'Add tomatoes and spices, cook until soft',
            'Add seitan cubes and coconut milk',
            'Simmer for 15-20 minutes, stirring occasionally',
            'Adjust seasoning and garnish with cilantro'
        ],
        tips: 'Seitan has a meaty texture and absorbs flavors beautifully. Perfect for curries and stews!'
    },
    'jackfruit': {
        name: 'Pulled Jackfruit Tacos',
        servings: '6',
        prepTime: '15 minutes',
        cookTime: '25 minutes',
        ingredients: [
            '2 cans young green jackfruit, drained and shredded',
            '1 onion, diced',
            '3 cloves garlic, minced',
            '1 tbsp cumin',
            '1 tbsp paprika',
            '½ cup salsa',
            'Taco shells or tortillas',
            'Coleslaw and cilantro for topping'
        ],
        instructions: [
            'Heat oil and sauté onion and garlic',
            'Add jackfruit and spices, stir well',
            'Cook for 10 minutes, breaking up the jackfruit',
            'Add salsa and simmer for 5-10 minutes',
            'Warm taco shells',
            'Fill with jackfruit mixture',
            'Top with coleslaw and cilantro'
        ],
        tips: 'The beauty of jackfruit is its pulled meat texture. Store-bought canned versions work great!'
    },
    'tempeh': {
        name: 'Grilled Tempeh Steaks',
        servings: '2',
        prepTime: '20 minutes',
        cookTime: '12 minutes',
        ingredients: [
            '1 block tempeh, sliced into steaks',
            '¼ cup soy sauce',
            '2 tbsp olive oil',
            '2 tsp maple syrup',
            '1 clove garlic',
            'Black pepper and herbs'
        ],
        instructions: [
            'Marinate tempeh slices for 15-20 minutes in soy sauce, oil, and maple syrup',
            'Heat a grill pan or skillet over medium-high heat',
            'Grill tempeh slices for 5-6 minutes on each side until golden',
            'Brush with extra marinade while cooking',
            'Remove and let rest for 2 minutes',
            'Serve with your favorite sides'
        ],
        tips: 'Marinate ahead of time for best flavor. The slight bitterness of tempeh pairs well with sweet marinades!'
    },
    'lentils': {
        name: 'Spiced Lentil Curry',
        servings: '6',
        prepTime: '15 minutes',
        cookTime: '40 minutes',
        ingredients: [
            '2 cups red lentils',
            '3 cups vegetable broth',
            '1 onion, diced',
            '1 can diced tomatoes',
            '2 tbsp curry powder',
            '1 tbsp turmeric',
            'Coconut milk, salt, pepper',
            'Fresh cilantro'
        ],
        instructions: [
            'Heat oil and sauté onions until soft',
            'Add curry powder and turmeric, cook for 1 minute',
            'Add lentils and vegetable broth',
            'Bring to boil and then simmer for 20 minutes',
            'Add tomatoes and coconut milk',
            'Simmer for another 15 minutes until lentils are tender',
            'Season to taste and garnish with cilantro'
        ],
        tips: 'Lentils are packed with protein and cook quickly. This dish is even better the next day!'
    }
};

// Function to match recipe and display it
function matchAndShowRecipe(outputText, direction) {
    const lowerText = outputText.toLowerCase();
    let matchedRecipe = null;
    let matchedKey = null;

    // Search for matching recipe
    for (const [key, recipe] of Object.entries(recipeDatabase)) {
        if (lowerText.includes(key.toLowerCase())) {
            matchedRecipe = recipe;
            matchedKey = key;
            break;
        }
    }

    if (matchedRecipe) {
        displayRecipe(matchedRecipe);
    }
}

// Function to display recipe
function displayRecipe(recipe) {
    const recipeSection = document.getElementById('recipeSection');
    document.getElementById('recipeName').textContent = recipe.name;
    document.getElementById('recipeServings').textContent = recipe.servings;
    document.getElementById('recipePrepTime').textContent = recipe.prepTime;
    document.getElementById('recipeCookTime').textContent = recipe.cookTime;

    // Display ingredients
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = '';
    for (const ingredient of recipe.ingredients) {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    }

    // Display instructions
    const instructionsList = document.getElementById('instructionsList');
    instructionsList.innerHTML = '';
    for (const instruction of recipe.instructions) {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    }

    // Display tips
    document.getElementById('recipeTipsText').textContent = recipe.tips;

    // Show recipe section with animation
    recipeSection.style.display = 'block';
    recipeSection.classList.add('fade-in');
}

// AI-based Suggestion bar logic using Google Gemini
async function getAISuggestions(query) {
    if (!query || query.trim().length === 0) return [];
    
    try {
        const prompt = `Generate 5 creative vegetarian dish suggestions based on the ingredient or concept: "${query}". 
        Return only the dish names, one per line, without numbers or bullet points. 
        Make them interesting and appealing to food lovers.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const suggestions = text.split('\n').filter(s => s.trim().length > 0);
        return suggestions.slice(0, 5);
    } catch (error) {
        console.error('Error fetching AI suggestions:', error);
        return [];
    }
}

// Fallback suggestions in case API fails
const fallbackSuggestions = [
    'Spicy jackfruit curry',
    'Grilled tempeh with herbs',
    'Tofu tikka masala',
    'Vegan shepherd\'s pie',
    'Mushroom and lentil burger',
    'Cauliflower buffalo wings',
    'Seitan piccata',
    'Thai coconut curry',
    'Crispy tofu bites',
    'Mushroom wellington'
];

document.getElementById('suggestBtn').addEventListener('click', async () => {
    const query = document.getElementById('suggestionInput').value;
    const suggestBtn = document.getElementById('suggestBtn');
    const list = document.getElementById('suggestionList');
    
    if (!query.trim()) {
        list.innerHTML = '<li style="color: #999;">Please enter an ingredient or concept!</li>';
        return;
    }

    // Show loading state
    suggestBtn.textContent = '⏳ Getting suggestions...';
    suggestBtn.disabled = true;
    list.innerHTML = '';

    let suggestions = await getAISuggestions(query);
    
    // Fallback to sample suggestions if API fails
    if (suggestions.length === 0) {
        const lower = query.toLowerCase();
        suggestions = fallbackSuggestions.filter(s => s.toLowerCase().includes(lower));
        if (suggestions.length === 0) {
            suggestions = fallbackSuggestions.slice(0, 3);
        }
    }

    // Reset button
    suggestBtn.textContent = '🚀 Get Suggestions';
    suggestBtn.disabled = false;

    if (suggestions.length === 0) {
        const li = document.createElement('li');
        li.textContent = '❌ No suggestions found. Try another ingredient!';
        li.style.color = '#999';
        list.appendChild(li);
        return;
    }

    for (const s of suggestions) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${s.trim()}</strong>`;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
            document.getElementById('suggestionInput').value = s.trim();
        });
        list.appendChild(li);
        // fade-in animation class
        requestAnimationFrame(() => li.classList.add('fade-in'));
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
    const inputArea = document.getElementById('inputRecipe');
    inputArea.value = example.text;
    // flash animation to show new content
    inputArea.classList.add('fade-in');
    setTimeout(() => inputArea.classList.remove('fade-in'), 500);
});

// initialize examples on page load
initExamples();