const recipes = [
    {
        "id": 0,
        "nome": "Pasta frolla",
        "tempo_di_preparazione": "20 minuti",
        "tempo_di_cottura": "15 minuti",
        "difficolta": "Media",
        "porzione": "1",
        "immagineUrl": "https://www.giallozafferano.it/images/173-17338/Pasta-frolla_650x433_wm.jpg",
        "ingredienti": [
            { "nome": "Farina", "quantità": "100", "unità di misura": "grammi" },
            { "nome": "Burro", "quantità": "50", "unità di misura": "grammi" },
            { "nome": "Zucchero", "quantità": "30", "unità di misura": "grammi" },
            { "nome": "Uovo", "quantità": "1", "unità di misura": "pezzo" }
        ],
        "preparazione": [
            "Mescolare la farina con lo zucchero.",
            "Aggiungere il burro a temperatura ambiente e impastare.",
            "Unire l'uovo e continuare a impastare fino a ottenere un composto omogeneo.",
            "Lasciar riposare in frigo per 30 minuti prima dell'uso."
        ]
    },
    {
        "id": 1,
        "nome": "Omelette",
        "tempo_di_preparazione": "5 minuti",
        "tempo_di_cottura": "5 minuti",
        "difficolta": "Facile",
        "porzione": "1",
        "immagineUrl": "https://www.giallozafferano.it/images/ricette/176/17665/foto_hd/hd650x433_wm.jpg",
        "ingredienti": [
            { "nome": "Uovo", "quantità": "1", "unità di misura": "pezzo" },
            { "nome": "Latte", "quantità": "10", "unità di misura": "ml" },
            { "nome": "Sale", "quantità": "1", "unità di misura": "pizzico" },
            { "nome": "Burro", "quantità": "5", "unità di misura": "grammi" }
        ],
        "preparazione": [
            "Sbattere l'uovo con il latte e il sale.",
            "Sciogliere il burro in una padella antiaderente.",
            "Versare il composto e cuocere a fuoco medio fino a doratura.",
            "Piegare a metà e servire calda."
        ]
    },
    {
        "id": 2,
        "nome": "Toast con avocado",
        "tempo_di_preparazione": "5 minuti",
        "tempo_di_cottura": "2 minuti",
        "difficolta": "Facile",
        "porzione": "1",
        "immagineUrl": "https://lovefoodfeed.com/wp-content/uploads/2025/01/Avocado-toast-1200-05.jpg",
        "ingredienti": [
            { "nome": "Pane", "quantità": "1", "unità di misura": "fetta" },
            { "nome": "Avocado", "quantità": "50", "unità di misura": "grammi" },
            { "nome": "Limone", "quantità": "1", "unità di misura": "cucchiaino" },
            { "nome": "Sale", "quantità": "1", "unità di misura": "pizzico" }
        ],
        "preparazione": [
            "Tostare la fetta di pane fino a doratura.",
            "Schiacciare l'avocado con il limone e il sale.",
            "Spalmare l'avocado sulla fetta di pane.",
            "Servire subito."
        ]
    }
];

// Get the main container
const recipesDiv = document.getElementById("recipesDiv");

// Create a container for the recipe cards
const row = document.createElement("div");
row.className = "row row-cols-1 row-cols-md-3 row-cols-lg-5 g-3";
recipesDiv.appendChild(row);

// Create a container for the recipe details that will appear below the cards
const detailsContainer = document.createElement("div");
detailsContainer.id = "recipeDetailsContainer";
detailsContainer.className = "mt-4";
recipesDiv.appendChild(detailsContainer);

// Variable to store the currently selected recipe and portion count
let currentRecipeId = null;
let currentPortions = 1;

// Function to highlight the selected card
function highlightSelectedCard(selectedId) {
    // Remove highlight from all cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('border-primary', 'shadow');
        card.classList.add('shadow-sm');
    });
    
    // Add highlight to selected card
    const selectedCard = document.getElementById(`card-${selectedId}`);
    if (selectedCard) {
        selectedCard.classList.add('border-primary', 'shadow');
        selectedCard.classList.remove('shadow-sm');
    }
}

// Function to calculate ingredient quantities based on portions
function calculateIngredientQuantity(baseQuantity, portions) {
    // Convert to number to ensure proper calculation
    const quantity = parseFloat(baseQuantity);
    
    if (isNaN(quantity)) {
        return baseQuantity; // Return original if not a number
    }
    
    // Calculate new quantity based on portions
    const newQuantity = quantity * portions;
    
    // Format the result to avoid too many decimal places
    // For small quantities, keep one decimal place
    // For larger quantities, round to whole numbers
    return newQuantity < 10 ? newQuantity.toFixed(1).replace(/\.0$/, '') : Math.round(newQuantity);
}

// Function to update ingredient list based on portion count
function updateIngredients(recipe, portions) {
    const ingredientsList = document.getElementById('ingredientsList');
    if (!ingredientsList) return;
    
    // Clear current ingredients
    ingredientsList.innerHTML = '';
    
    // Add updated ingredients
    recipe.ingredienti.forEach(ingrediente => {
        const newQuantity = calculateIngredientQuantity(ingrediente.quantità, portions);
        const li = document.createElement('li');
        li.textContent = `${ingrediente.nome}: ${newQuantity} ${ingrediente["unità di misura"]}`;
        ingredientsList.appendChild(li);
    });
}

// Function to handle portion changes
function changePortions(change) {
    // Get the new portion count
    const newPortions = Math.max(1, currentPortions + change); // Ensure minimum of 1
    
    // If no change, exit
    if (newPortions === currentPortions) return;
    
    // Update the current portions
    currentPortions = newPortions;
    
    // Update the display
    const portionCountElement = document.getElementById('portionCount');
    if (portionCountElement) {
        portionCountElement.textContent = currentPortions;
    }
    
    // Find the current recipe
    const recipe = recipes.find(r => r.id === currentRecipeId);
    if (recipe) {
        // Update the ingredients
        updateIngredients(recipe, currentPortions);
    }
}

// Function to display recipe details
function showRecipeDetails(recipeId) {
    // Find the recipe with the matching ID
    const selectedRecipe = recipes.find(recipe => recipe.id === recipeId);
    
    if (selectedRecipe) {
        // Update current recipe tracking
        currentRecipeId = recipeId;
        currentPortions = 1; // Reset portions when changing recipes
        
        // Highlight the selected card
        highlightSelectedCard(recipeId);
        
        // Scroll to the details section if it's not already visible
        const detailsOffset = detailsContainer.offsetTop;
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (detailsOffset > currentScroll + windowHeight || detailsOffset < currentScroll) {
            detailsContainer.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Create the HTML for the recipe details
        let detailsHTML = `
            <div class="card mt-4 shadow">
                <div class="card-header bg-primary text-white">
                    <h2 class="mb-0">${selectedRecipe.nome}</h2>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${selectedRecipe.immagineUrl}" alt="${selectedRecipe.nome}" class="img-fluid rounded mb-3">
                            <div class="info-box p-3 bg-light rounded">
                                <h5>Informazioni</h5>
                                <ul class="list-unstyled">
                                    <li><strong>Tempo di preparazione:</strong> ${selectedRecipe.tempo_di_preparazione}</li>
                                    <li><strong>Tempo di cottura:</strong> ${selectedRecipe.tempo_di_cottura}</li>
                                    <li><strong>Difficoltà:</strong> ${selectedRecipe.difficolta}</li>
                                    <li>
                                        <div class="d-flex align-items-center mt-2">
                                            <strong class="me-2">Porzioni:</strong>
                                            <div class="portion-control d-flex align-items-center">
                                                <button id="decreasePortions" class="btn btn-sm btn-outline-primary" style="width: 30px; height: 30px; padding: 0; display: flex; align-items: center; justify-content: center;">-</button>
                                                <span id="portionCount" class="mx-2">${currentPortions}</span>
                                                <button id="increasePortions" class="btn btn-sm btn-outline-primary" style="width: 30px; height: 30px; padding: 0; display: flex; align-items: center; justify-content: center;">+</button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="mb-4">
                                <h4 class="border-bottom pb-2">Ingredienti</h4>
                                <ul id="ingredientsList">`;
        
        // Add ingredients (initial state with 1 portion)
        selectedRecipe.ingredienti.forEach(ingrediente => {
            detailsHTML += `<li>${ingrediente.nome}: ${ingrediente.quantità} ${ingrediente["unità di misura"]}</li>`;
        });
        
        detailsHTML += `
                                </ul>
                            </div>
                            <div>
                                <h4 class="border-bottom pb-2">Preparazione</h4>
                                <ol class="preparation-steps">`;
        
        // Add preparation steps
        selectedRecipe.preparazione.forEach(step => {
            detailsHTML += `<li>${step}</li>`;
        });
        
        detailsHTML += `
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Update the details container
        detailsContainer.innerHTML = detailsHTML;
        
        // Make the details container visible if it was hidden
        detailsContainer.style.display = 'block';
        
        // Add event listeners for portion control buttons
        document.getElementById('decreasePortions').addEventListener('click', () => changePortions(-1));
        document.getElementById('increasePortions').addEventListener('click', () => changePortions(1));
    }
}

// Create recipe cards
recipes.forEach(recipe => {
    const col = document.createElement("div");
    col.className = "col"; 

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm transition-all";
    card.id = `card-${recipe.id}`;
    
    // Add hover effect and cursor pointer
    card.style.cursor = "pointer";
    card.style.transition = "all 0.3s ease";
    
    // Add hover effect with JavaScript
    card.addEventListener("mouseenter", function() {
        this.classList.add("shadow");
        this.style.transform = "translateY(-5px)";
    });
    
    card.addEventListener("mouseleave", function() {
        if (!this.classList.contains("border-primary")) {
            this.classList.remove("shadow");
        }
        this.style.transform = "translateY(0)";
    });
    
    // Add click event listener
    card.addEventListener("click", function() {
        showRecipeDetails(recipe.id);
    });

    const img = document.createElement("img");
    img.src = recipe.immagineUrl;
    img.alt = `Ricetta nr.${recipe.id}`;
    img.className = "card-img-top";
    img.style.height = "180px";
    img.style.objectFit = "cover";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const recipeName = document.createElement("h5");
    recipeName.className = "card-title";
    recipeName.innerHTML = `${recipe.nome}`;
    
    const recipeInfo = document.createElement("p");
    recipeInfo.className = "card-text text-muted small";
    recipeInfo.innerHTML = `
        <span class="me-2">⏱️ ${recipe.tempo_di_preparazione}</span>
        <span>🔥 ${recipe.difficolta}</span>
    `;

    cardBody.appendChild(recipeName);
    cardBody.appendChild(recipeInfo);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
});

// Initially hide the details container until a recipe is selected
detailsContainer.style.display = 'none';