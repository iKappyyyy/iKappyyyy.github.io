const VALUE_NAME = 0;
const VALUE_VALUE = 1;

export function inputIsValid(urlInput) {
  let url = urlInput.value;
  const conditionOne = url.startsWith("https://map.wynncraft.com/?coords=");

  url = url.replace("https://map.wynncraft.com/?coords=", "");
  url = url.substring(0, url.indexOf("#"));
  const conditionTwo = /^[0-9,-]+$/.test(url);
  return (conditionOne && conditionTwo);
}

export function getSeparateCoordinatesList(urlInput) {
  let url = urlInput.value.replace("https://map.wynncraft.com/?coords=", "");
  url = url.substring(0, url.indexOf("#"));
  const seperateValuesCoordinatesList = url.split(",");
  const coordinatesList = [];
  let tempList = [];
  for (let i = 0; i < seperateValuesCoordinatesList.length; i++) {
    if (i !== 0 && !(i % 4)) {
      coordinatesList.push(tempList);
      tempList = [];
    }

    tempList.push(seperateValuesCoordinatesList[i]);
  }

  if (tempList.length) {
    coordinatesList.push(tempList);
  }

  return coordinatesList;
}

function* separateCoordinatesGenerator(values) {
  const nameOfValueList = ["X", "Y", "Z", "R"];
  for (let i = 0; i < values.length; i++) {
    yield [nameOfValueList[i], values[i]];
  }
}

export function getCoordinatesHtml(coordinatesList) {
  let html = '';
  coordinatesList.forEach((coordinates, index) => {
    html += `
    <div class="coordinates-grid">
      <div class="coordinate">
        <p class="coordinate-header">Coordinate #${index + 1}</p>
        <div class="coordinate-values">
    `
    for (let value of separateCoordinatesGenerator(coordinates)) {
      html += `          <p>${value[VALUE_NAME]}</p>`
      html += `          <p>${value[VALUE_VALUE]}</p>`
    }
    html += `
        </div>
      </div>
    </div>
    `
  });

  return html;
}
