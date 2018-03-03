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

function optimizeScore(data, model, draw) {
  const posCombinations = getFactorial(model.labels.length);
  console.log('Number of position permutations are '+ posCombinations);

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
      function process() {
        permutations(l, mod);
        l % 2 ? swapPositions(mod, i, l) : swapPositions(mod, 0, l); // even-odd check for alternating swaps
        variations++;
        mod.updateCircles();
        let score = getScore(data, mod);
        if (draw) draw(mod);
        if (score > maxScore) {
          maxScore = score;
          modelWithBestScore = mod;
        }
        if (i < l)
          setTimeout(process, 1)
        i++
      }
      process();
      permutations(l, mod);
    }
  }

  permutations(model.labels.length, model);
  console.log('Max score is ' + maxScore + ' among ' + variations + ' variations.');
  return modelWithBestScore;
}

export default optimizeScore;