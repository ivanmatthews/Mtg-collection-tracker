async function searchCard() {
  const name = document.getElementById("search").value;

  const res = await fetch(
    `https://api.scryfall.com/cards/named?exact=${name}`
  );
  const card = await res.json();

  document.getElementById("result").innerHTML = `
    <h2>${card.name}</h2>
    <img src="${card.image_uris?.small}" />
    <br>
    <button onclick='addToCollection(${JSON.stringify(card)})'>
      Add to Collection
    </button>
  `;
}

function addToCollection(card) {
  let collection = JSON.parse(localStorage.getItem("mtg")) || [];

  const existing = collection.find(c => c.id === card.id);

  if (existing) {
    existing.quantity++;
  } else {
    collection.push({
      id: card.id,
      name: card.name,
      quantity: 1
    });
  }

  localStorage.setItem("mtg", JSON.stringify(collection));
  alert("Added!");
}
