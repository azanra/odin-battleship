const Ship = (currentLength: number) => {
  const length = currentLength;
  let hitAmount = 0;

  const hit = () => {
    if (hitAmount === length) return;
    hitAmount++;
  };

  const getHit = () => hitAmount;

  const isSunk = () => hitAmount === length;

  return { hit, getHit, isSunk };
};

export default Ship;
