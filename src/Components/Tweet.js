export const Tweet = ({ tweet, date }) => {

  return (
    <div className="Tweet">
      <div>{tweet} </div>
      <br/>{date}
    </div>
  );
};
