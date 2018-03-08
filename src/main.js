import data from './data';
import validateData from './validate-data';
import getModel from './get-model';
import { getScore, getOverlappingScore } from "./score";
import optimizeScore from './optimize-score';
import { draw } from './drawing';

validateData(data);
// resolve group hierarchy
data.groups.forEach(group => {
  if (group.parent) {
    data.members.forEach(member => {
      if (member.groupIds.includes(group.id) &&
        !member.groupIds.includes(group.parent)
      ) {
        member.groupIds.push(group.parent);
      }
    })
  }
});
console.dir(data.members);
let model = getModel(data);
model = optimizeScore(data, model);
const score = getScore(data, model);

console.log('Final score is ' + score);
console.log('Overlapping score: ' + getOverlappingScore(data, model));

draw(model);