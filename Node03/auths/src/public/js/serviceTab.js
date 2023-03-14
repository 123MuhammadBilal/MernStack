var tab1=document.getElementById("tab_1");
var tab2=document.getElementById("tab_2");
var page1=document.getElementById("page1");
var page2=document.getElementById("page2");

tab1.addEventListener('click', () => {
  tab1.classList.add("active");
  tab2.classList.remove("active");
  page2.classList.add("displaynone");
  page1.classList.remove("displaynone");
});

tab2.addEventListener('click', () => {
  tab2.classList.add("active");
  tab1.classList.remove("active");
  page1.classList.add("displaynone");
  page2.classList.remove("displaynone");
});
