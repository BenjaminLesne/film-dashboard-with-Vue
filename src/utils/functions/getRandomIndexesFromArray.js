function getRandomIndexesFromArray(
  numberOfRun,
  arrayLength,
  currentChosenIndexes
) {
  //the goal is to get X different random index of an array.
  //X = numberOfRun

  currentChosenIndexes = currentChosenIndexes ?? [];
  const newChosenIndex = Math.floor(Math.random() * arrayLength);

  //if the new index generated was already selected in a previous run of this recursive function
  //then call this function again with the same arguments received
  if (currentChosenIndexes.includes(newChosenIndex)) {
    return getRandomIndexesFromArray(
      numberOfRun,
      arrayLength,
      currentChosenIndexes
    );
  }

  const newCurrentChosenIndexes = [...currentChosenIndexes, newChosenIndex];

  const newNumberOfRun = numberOfRun - 1;

  //return the random indexes we asked
  if (newNumberOfRun === 0) return newCurrentChosenIndexes;

  //... or rerun this function with new args if we don't have enough indexes.
  return getRandomIndexesFromArray(
    newNumberOfRun,
    arrayLength,
    newCurrentChosenIndexes
  );
}

export default getRandomIndexesFromArray;
