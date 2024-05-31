const text = document.querySelector("#text");
const data = document.querySelector(".data");
const totalresults = document.querySelector("#totalresults");

let t;

async function fetchData(value) {
    // const response = await fetch("http://www.myjsons.com/v/fb263132");
    // const data = await response.json();
    if(value) {
        const filterData = dummyData.filter(e => e.toLowerCase().includes(value));
        return filterData;
    } else {
        return [];
    }
}

const createParagraphs = (name) => {
    const paragraph = document.createElement("p");
    paragraph.style.padding = Number(name) ? "0px" : "15px";
    paragraph.style.cursor = Number(name) ? "default" : "pointer";
    paragraph.classList.add(Number(name) ? 'count' : 'paragraph');
    paragraph.innerHTML += Number(name) ? name + " results found" : name;
    return paragraph;
}

function debounce(value) {
    if(t) {
        clearTimeout(t);
    }
    t = setTimeout(async() => {
        const responseData = await fetchData(value);
        if(responseData.length) {
            const getcount = createParagraphs(responseData.length);
            data.appendChild(getcount);
        }

        responseData.forEach((name) => {
            const para = createParagraphs(name);
            data.appendChild(para);
        });
    }, 1200);
}

text.addEventListener("keyup", (e) => {
    data.innerHTML = "";
    debounce(e.target.value.trim());
});

window.addEventListener("mouseover", () => {
    if(document.querySelectorAll(".paragraph")) {
        document.querySelectorAll(".paragraph").forEach((e) => {
            e.addEventListener("mouseover", () => {
                e.style.backgroundColor = "#f4c774";
            });
            e.addEventListener("mouseout", () => {
                e.style.backgroundColor = "#fad99c";
            });
        });
    }
});
