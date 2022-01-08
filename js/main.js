const links = [
    {
        label: "Week1 notes",
        url: "week1/index.html"
    }
]

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