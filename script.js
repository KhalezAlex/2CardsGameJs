{
  let coatImage = "file:///D:/StepAcademy/JavaScript/Lesson_11/Alt/PNG/0.png";
  let images = [];
  for (let i = 1; i < 11; i++) images.push("PNG/gamer" + i + ".png");

  var arrayOfPics = new Array();
  for (let i = 0; i < 4; i++) arrayOfPics.push(new Array(5));

  for (let i = 0; i < arrayOfPics.length; i++)
    for (let j = 0; j < arrayOfPics[i].length; j++) arrayOfPics[i][j] = 0;

  let path = "file:///D:/StepAcademy/JavaScript/Lesson_11/Alt/"; //Заменить на путь на компе

  let round = ["", ""];

  function turn(i, j) {
    if (round[0] != "" && round[1] != "") {
      turnCoats();
    }
    let pic = document.getElementById(i + "_" + j).childNodes[0];
    if (round[0] == "" && pic.src == path + "PNG/0.png") {
      firstRoundMove(pic, i, j);
    } else {
      secondRoundMove(pic, i, j);
    }
  }

  function turnCoats() {
    document.getElementById(round[0]).childNodes[0].src = coatImage;
    document.getElementById(round[1]).childNodes[0].src = coatImage;
    round[0] = "";
    round[1] = "";
  }

  function firstRoundMove(pic, i, j) {
    pic.setAttribute("src", arrayOfPics[i][j]);
    round[0] = pic.parentElement.id;
  }

  function secondRoundMove(pic, i, j) {
    pic.setAttribute("src", arrayOfPics[i][j]);
    round[1] = pic.parentElement.id;
    if (round[0] == round[1]) {
      document
        .getElementById(round[0])
        .childNodes[0].setAttribute("src", coatImage);
    } else if (
      document.getElementById(round[0]).childNodes[0].src ==
      document.getElementById(round[1]).childNodes[0].src
    ) {
      document
        .getElementById(round[0])
        .setAttribute("onclick", "nullFunction()");
      document
        .getElementById(round[1])
        .setAttribute("onclick", "nullFunction()");
      round[0] = "";
      round[1] = "";
    }
  }

  function drawTable() {
    let table;
    let row;
    let cell;
    let coat;

    for (let i = 0; i < arrayOfPics.length; i++) {
      row = document.createElement("tr");
      for (let j = 0; j < arrayOfPics[i].length; j++) {
        cell = document.createElement("td");
        cell.id = i + "_" + j;
        cell.setAttribute("onclick", "turn(" + i + ", " + j + ")");
        coat = document.createElement("img");
        coat.src = "PNG/0.png";
        cell.appendChild(coat);
        row.appendChild(cell);
      }
      table = document.getElementById("table");
      table.appendChild(row);
    }
  }

  function getFreeCells(table) {
    let freeCells = 0;
    for (let i = 0; i < table.length; i++)
      for (let j = 0; j < table[i].length; j++)
        if (table[i][j] == 0) freeCells++;
    return freeCells;
  }

  function setPics(index) {
    let aim = parseInt(Math.random() * getFreeCells(arrayOfPics) + 1);
    let cords = 0;
    for (let i = 0; i < arrayOfPics.length; i++)
      for (let j = 0; j < arrayOfPics[i].length; j++)
        if (arrayOfPics[i][j] == 0) {
          cords++;
          if (cords == aim) {
            arrayOfPics[i][j] = images[index];
          }
        }
  }

  function setTable() {
    for (let i = 0; i < 10; i++) {
      setPics(i);
      setPics(i);
    }
  }

  function nullFunction() {
    return 0;
  }

  setTable();
  drawTable();
}
