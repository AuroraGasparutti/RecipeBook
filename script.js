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
            "tempo di_cottura": "2 minuti",
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

const recipesDiv = document.getElementById("recipesDiv");

const row = document.createElement("div");
row.className = "row row-cols-5 g-3";
recipesDiv.appendChild(row);

recipes.forEach(recipe => {
    const col = document.createElement("div");
    col.className = "col"; 

    const card = document.createElement("div");
    card.className = "card h-100";
    card.id = `${recipe.id}`;
    
    // Make the card clickable with cursor pointer
    card.style.cursor = "pointer";
    
    // Add click event listener to the card
    card.addEventListener("click", function() {
        showRecipeDetails(recipe.id);
    });

    const img = document.createElement("img");
    img.src = recipe.immagineUrl;
    img.alt = `Ricetta nr.${recipe.id}`;
    img.className = "card-img-top";

    const recipeName = document.createElement("h3");
    recipeName.className = "card-text";
    recipeName.innerHTML = `${recipe.nome}`;

    card.appendChild(img);
    card.appendChild(recipeName);
    col.appendChild(card);
    row.appendChild(col);
});

// Function to handle the click event
function showRecipeDetails(recipeId) {
    console.log(`Recipe clicked: ${recipeId}`);
    
    // Find the recipe with the matching ID
    const selectedRecipe = recipes.find(recipe => recipe.id === recipeId);
    
    if (selectedRecipe) {
        // Here you can implement what happens when a recipe is clicked
        // For example, you could display a modal with recipe details
        // or navigate to a different page
        
        alert(`Hai selezionato: ${selectedRecipe.nome}`);
        
        // You can expand this function to show more details or
        // redirect to a detailed recipe page
    }
}

