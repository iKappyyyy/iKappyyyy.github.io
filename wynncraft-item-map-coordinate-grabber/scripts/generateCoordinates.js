const VALUE_NAME = 0;
const VALUE_VALUE = 1;

export function inputIsValid(urlInput) {
  return (urlInput.value.startsWith("https://map.wynncraft.com/?coords="));
}

export function getSeparateCoordinatesList(urlInput) {
  let url = urlInput.value.replace("https://map.wynncraft.com/?coords=", "");
  url = url.substring(0, url.indexOf(",0#"));
  const urlList = url.split(",0,");
  return urlList;
}

function* separateCoordinatesGenerator(coordinates) {
  const nameOfValueList = ["X", "Y", "Z"];
  const values = coordinates.split(",");
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
