/*

  Tries out different positions for the labels in order to maximize its score.

 */
import {getScore} from "./score";

function getFactorial(n) {
  let r;
  for (r = 1; n > 1; n--) {
    r *= n
  }
  return r;
}

function extractPos(object) {
  return {x: object.x, y: object.y};
}

function swapPositions(model, indexA, indexB) {
  let auxPos = extractPos(model.labels[indexA]);
  Object.assign(model.labels[indexA], extractPos(model.labels[indexB]));
  Object.assign(model.labels[indexB], auxPos);
}

function findBestStartingPosition(data, model) {
  const posCombinations = getFactorial(model.labels.length);
  console.log('Number of initial position permutations are '+ posCombinations);

  let maxScore = getScore(data, model);
  let modelWithBestScore = model;
  let variations = 1;
  // Find permutations of positions recursively via Heap's Algorithm
  // (adapted from https://gist.github.com/MarkNixon/ef896d2936b425de6138 )
  function permutations(len, mod) {
    mod = mod.getCopy();
    var i = 0, l = len - 1;
    if (len === 1) {
      return;
    } else {
      for (i; i < l; i++) {
        permutations(l, mod);
        l % 2 ? swapPositions(mod, i, l) : swapPositions(mod, 0, l); // even-odd check for alternating swaps
        variations++;
        mod.updateCircles();
        let score = getScore(data, mod);
        if (score > maxScore) {
          maxScore = score;
          modelWithBestScore = mod;
        }
      }
      permutations(l, mod);
    }
  }

  permutations(model.labels.length, model);
  return modelWithBestScore;
}


function optimizeScore(data, model) {
  model = findBestStartingPosition(data, model);

  // try moving labels around
  const dis = 5; // move distance
  const movements = [
    {x: dis, y: 0},
    {x: dis, y: dis},
    {x: 0, y: dis},
    {x: -dis, y: dis},
    {x: -dis, y: 0},
    {x: -dis, y: -dis},
    {x: 0, y: -dis},
    {x: dis, y: -dis}
  ];

  function move(label, movement) {
    label.x += movement.x;
    label.y += movement.y;
    //console.log('Move ' + label.getText() + ' to ' + movement.x + ',' + movement.y);
  }

  let prevMaxScore;
  let prevBestModel;
  let maxScore = getScore(data, model);
  let modelWithBestScore = model;
  let variations = 0;
  do {
    prevMaxScore = maxScore;
    prevBestModel = modelWithBestScore;
    for (let i = model.labels.length - 1; i >= 0; i--) {
      for (let m = movements.length - 1; m >= 0; m--) {
        let mod = prevBestModel.getCopy();
        move(mod.labels[i], movements[m]);
        mod.updateCircles();
        let score = getScore(data, mod);
        variations++;
        if (score > maxScore) {
          maxScore = score;
          modelWithBestScore = mod;
        }
      }
    }
  } while(maxScore > prevMaxScore);
  console.log(variations + ' variations have been evaluated');
  return modelWithBestScore;
}

export default optimizeScore;