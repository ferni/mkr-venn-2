import data from './data';
import validateData from './validate-data';
import getModel from './get-model';
import { getScore, getCorrectnessScore, getOverlappingScore, getAreasScore } from "./score";
import optimizeScore from './optimize-score';
import { draw, drawText } from './drawing';

validateData(data);
// resolve group hierarchy
let newAdded;
do {
  newAdded = false;
  data.groups.forEach(group => {
    if (group.parent) {
      data.members.forEach(member => {
        if (member.groupIds.includes(group.id) &&
          !member.groupIds.includes(group.parent)
        ) {
          member.groupIds.push(group.parent);
          newAdded = true;
        }
      })
    }
  });
} while(newAdded);

drawText('Generating...');

setTimeout(function() {
  let model = getModel(data);
  console.time('Score optimization');
  model = optimizeScore(data, model);
  console.timeEnd('Score optimization');
  console.time('Scoring');
  const score = getScore(data, model);
  console.timeEnd('Scoring');
  console.time('Correctness score');
  getCorrectnessScore(data, model);
  console.timeEnd('Correctness score');
  console.time('Overlapping score');
  getOverlappingScore(data, model);
  console.timeEnd('Overlapping score');
  console.time('Area score');
  getAreasScore(data, model);
  console.timeEnd('Area score');

  console.log('Final score is ' + score);

  draw(model);
}, 0);
