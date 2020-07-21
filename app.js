const green = [3, 6];
const stayRed = [0, 1, 2, 4, 5, 7, 8];
const red = [0, 1, 4, 5, 7, 8];
const stayGreen = [2, 3, 6];

const greenVsRed = (args) => {
  const x = args[0];
  const y = args[1];
  const cells = args.slice(2, args.length - 3);
  const x1 = args[args.length - 3];
  const y1 = args[args.length - 2];
  const generationCount = args[args.length - 1];

  if (x > y || y >= 1000) {
    console.log(
      "Rows must be smaller or equal to columns and columns must be lower or equal than 1000"
    );
    return;
  }
  if (cells.length !== y) {
    console.log("The length of columns should be exactly " + y);
    return;
  }
  for (const elem of cells) {
    if (typeof elem !== "string") {
      console.log("The values for the cells should be strings");
      return;
    }
  }
  for (const i of cells) {
    if (i.length !== x) {
      console.log(`Error! The length of the rows should be exactly ${x}`);
      return;
    }
    const items = i.split("");
    for (const item of items) {
      if (+item !== 0 && +item !== 1) {
        console.log("Error! The values of the rows should be 1 or 0");
        return;
      }
    }
  }
  let generationZero = cells.map((row) => row.split("").map((x) => Number(x)));
  let finalGreenCount = 0;

  for (let i = 0; i <= generationCount; i++) {
    const nextGeneration = [];
    cells.map((i) => nextGeneration.push([]));
    for (let row = 0; row < generationZero.length; row++) {
      for (let col = 0; col < generationZero[row].length; col++) {
        const value = generationZero[row][col];
        let surroundedGreenCount = 0;

        const rowStart = Math.max(0, row - 1);
        const rowEnd = Math.min(row + 1, generationZero.length - 1);
        const colStart = Math.max(0, col - 1);
        const colEnd = Math.min(col + 1, generationZero[col].length - 1);

        for (let neighborRow = rowStart; neighborRow <= rowEnd; neighborRow++) {
          for (
            let neighborCol = colStart;
            neighborCol <= colEnd;
            neighborCol++
          ) {
            if (neighborRow !== row || neighborCol !== col) {
              const neighborValue = generationZero[neighborRow][neighborCol];
              if (neighborValue === 1) {
                surroundedGreenCount += 1;
              }
            }
          }
        }

        if (value === 0 && green.includes(surroundedGreenCount)) {
          nextGeneration[row][col] = 1;
        } else if (value === 0 && stayRed.includes(surroundedGreenCount)) {
          nextGeneration[row][col] = 0;
        } else if (value === 1 && red.includes(surroundedGreenCount)) {
          nextGeneration[row][col] = 0;
        } else if (value === 1 && stayGreen.includes(surroundedGreenCount)) {
          nextGeneration[row][col] = 1;
        }
      }
    }
    if (generationZero[y1][x1] === 1) {
      finalGreenCount += 1;
    }
    generationZero = [...nextGeneration];
  }
  console.log(finalGreenCount);
};

greenVsRed([3, 3, "000", "111", "000", 1, 0, 10]);
greenVsRed([4, 4, "1001", "1111", "0100", "1010", 2, 2, 15]);
