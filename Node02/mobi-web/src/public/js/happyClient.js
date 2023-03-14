const years = document.getElementById('years');
const clients = document.getElementById('clients');
const projects = document.getElementById('projects');
const labs = document.getElementById('labs');
const offices = document.getElementById('offices');

let yearsCount = 0;
let clientsCount = 0;
let projectsCount = 0;
let labsCount = 0;
let officesCount = 0;

const incrementAmount = 1;

function updateNumbers1() {
  if (yearsCount < 27) {
    yearsCount += incrementAmount;
  }
  years.textContent = yearsCount + '+';
}
function updateNumbers2() {
    if (clientsCount < 500) {
        clientsCount += incrementAmount;
      }
      clients.textContent = clientsCount + '+';
  }
  function updateNumbers3() {
    if (projectsCount < 1000) {
        projectsCount += incrementAmount;
      }
      projects.textContent = projectsCount + '+';
  }
  function updateNumbers4() {
    if (labsCount < 3) {
        labsCount += incrementAmount;
      }
      labs.textContent = labsCount + '+';
  }
  function updateNumbers5() {
    if (officesCount < 3) {
        officesCount += incrementAmount;
      }
      offices.textContent = officesCount + '+';
  }

const workingDetails = document.querySelector('.working_details');
workingDetails.addEventListener('mouseenter', function() {
  setInterval(updateNumbers1, 160);
  setInterval(updateNumbers2, 9);
  setInterval(updateNumbers3, 1);
  setInterval(updateNumbers4, 1500);
  setInterval(updateNumbers5, 1500);
});
