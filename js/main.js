const links = [
    {
        label: "Week1 notes",
        url: "week1/index.html"
    },
    {
        label: "Week2 notes",
        url: "week2/index.html"
    },
    {
        label: "Week3 notes",
        url: "week3/index.html"
    },
    {
        label: "Week4 notes",
        url: "week4/index.html"
    },
    {
        label: "Week 5 and 6 notes",
        url: "week5/index.html"
    },
    {
        label: "Week 7 notes",
        url: "week7/index.html"
    }

]

const week1 = [
    {text: "Always Design for Small devices first and think corectly from the beginning"},
    {text: "Mobile users are the majority with difference sizes and resolutions"},
    {text: "Understand users is the first step to build good UX pages"},
    {text: "Poor design causes companies to lose business"},
    {text: "It's important to reduce the cognitive user processing by creating fluid forms"}
    
]

const week2 = [
    {text: "Always Design for Small devices first and think corectly from the beginning"},
    {text: "Mobile users are the majority with difference sizes and resolutions"},
]

const week3 = [
    {text: "Always Design for Small devices first and think corectly from the beginning"},
    {text: "Mobile users are the majority with difference sizes and resolutions"},
]

const weeks = [week1, week2, week3]

function getMenu() {
    let list = document.getElementById("menu-list");    
    links.forEach(function (item) {
        let li = document.createElement('li');
        let a = document.createElement('a')
        a.textContent = item.label;
        a.setAttribute('href', item.url);
        li.appendChild(a)
        list.appendChild(li);
    });
}

function generateNotes(elementID, weekIndex){
    let list = document.getElementById(elementID);    
    weeks[weekIndex].forEach(function (item) {
        let li = document.createElement('li');        
        li.textContent = item.text;
        list.appendChild(li);
    });
}