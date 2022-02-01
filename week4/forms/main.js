const form = document.forms.search;


const input = form.elements.searchInput;
input.addEventListener('focus', () => alert('focused'), false);
