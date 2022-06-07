const startDay = () => {
  let today = new Date();
  let d = today.getDate();
  let mo = today.getMonth() + 1;
  let y = today.getFullYear();
  console.log(today.getDate());
  d = checkDay(d);
  mo = checkDay(mo);
  document.getElementById('date').innerHTML = d + '/' + mo + '/' + y;
  setTimeout(startDay, 1000);
};
const checkDay = (i) => {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
};
startDay();
