'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  result[0] = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const actionsObj = actions[i];
    const { type } = actionsObj;

    if (type === 'addProperties') {
      const action1 = { ...result[i] };

      Object.assign(action1, actionsObj.extraData);
      result.push(action1);
    }

    if (type === 'removeProperties') {
      const action2 = { ...result[i] };

      for (const delIteration of actionsObj.keysToRemove) {
        delete action2[delIteration];
      }

      result.push(action2);
    }

    if (type === 'clear') {
      const action3 = {};

      result.push(action3);
    }
  }

  result.shift();

  return result;
}

module.exports = transformStateWithClones;
