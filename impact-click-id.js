const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const paramsObject = {};
for (const [key, value] of params.entries()) {
  paramsObject[key] = value;
}
const irclickid = paramsObject.irclickid;
document.getElementById("irclickid").value = irclickid;
