export const CharacterCounter = ({ counter, limit }) => {
  return (
    <div className="Twitter-counter">
      {counter} / {limit - counter}
    </div>
  );
};
