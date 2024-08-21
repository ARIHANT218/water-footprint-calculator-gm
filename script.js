function calculateFootprint() {
    const item = document.getElementById('itemInput').value.trim().toLowerCase();
    const waterFootprintData = {
        apple: 70,
        banana: 160,
        beef: 15415,
        chocolate: 17196,
        book:440,
        Milk: 1000,
        Rice: 2500,
        Bread: 1600,
        jeans: 7600,
        tShirt: 2500
    };

    const result = waterFootprintData[item];

    if (result) {
        document.getElementById('result').innerText = `The water footprint of ${item} is ${result} liters.`;
    } else {
        document.getElementById('result').innerText = 'Water footprint data not available for this item.';
    }
}
