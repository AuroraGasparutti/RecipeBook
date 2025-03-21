const recipes = [
        {
            "nome": "Pasta frolla",
            "tempo_di_preparazione": "20 minuti",
            "tempo_di_cottura": "15 minuti",
            "difficolta": "Media",
            "porzione": "1",
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
            "nome": "Omelette",
            "tempo_di_preparazione": "5 minuti",
            "tempo_di_cottura": "5 minuti",
            "difficolta": "Facile",
            "porzione": "1",
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
            "nome": "Toast con avocado",
            "tempo_di_preparazione": "5 minuti",
            "tempo di_cottura": "2 minuti",
            "difficolta": "Facile",
            "porzione": "1",
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

randomBtn.addEventListener("click", suspance);

const row = document.createElement("div");
row.className = "row row-cols-5 g-3";
cardsDiv.appendChild(row);

cardData.forEach(student => {
    const col = document.createElement("div");
    col.className = "col"; 

    const card = document.createElement("div");
    card.className = "card h-100";
    card.id = `${student.numero}`;

    const img = document.createElement("img");
    img.src = student.immagine;
    img.alt = `Studente nr.${student.numero}`;
    img.className = "card-img-top";

    const studNameSurname = document.createElement("p");
    studNameSurname.className = "card-text";
    studNameSurname.innerHTML = `${student.nome} ${student.cognome}`;

    card.appendChild(img);
    card.appendChild(studNameSurname);
    col.appendChild(card);
    row.appendChild(col);
});
