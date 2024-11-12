import { IUser } from "../interface/responseInterface";
import "../styles/leaderboards.css";

function Leaderboards({ leaderboards }: { leaderboards: IUser[] }) {
  return (
    <div className="leaderboard">
      <div className="heading">Leaderboards</div>
      <div className="headings">
        <div className="headingText">name</div>
        <div className="headingText">wins</div>
        <div className="headingText">losses</div>
        <div className="headingText">draws</div>
        <div className="headingText">streak</div>
      </div>
      <div className="mappedValsGoHere">
        {leaderboards.map((user) => (
          <div className="oneItem">
            <div className="headingText name">{user.username}</div>
            <div className="headingText">{user.gameswon}</div>
            <div className="headingText">{user.gameslost}</div>
            <div className="headingText">{user.gamesdrawn}</div>
            <div className="headingText">{user.maxstreak}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboards;
