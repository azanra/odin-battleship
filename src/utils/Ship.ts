const Ship = (currentLength: number) => {
  const length = currentLength;
  let hitAmount = 0;

  const hit = () => {
    if (hitAmount === length) return;
    hitAmount++;
  };

  const getHit = () => hitAmount;

  // Getter value will differ with variable if
  // Accessed outside of the factory
  const isSunk = () => getHit() === length;

  return { hit, getHit, isSunk };
};

export default Ship;
