const barElts = document.getElementsByClassName("bar__bar");

const today = new Date()
    .toLocaleString("en-us", { weekday: "long" })
    .toLowerCase()
    .slice(0, 3);

fetch("./data.json").then((results) =>
    results.json().then((data) => parseData(data))
);

function parseData(data) {
    let max = data[0];
    let maxIndex = 0;
    for (let i = 0; i < data.length; i += 1) {
        if (data[i].amount > max.amount) {
            max = data[i];
            maxIndex = i;
        }
        if (data[i].day === today) {
            barElts[i].style.backgroundColor = "var(--clr-primary-cyan)";
        }
    }

    barElts[maxIndex].style.height = "150px";

    for (let i = 0; i < data.length; i += 1) {
        const height = (data[i].amount * 150) / data[maxIndex].amount;
        barElts[i].style.height = `${height}px`;
    }
}
