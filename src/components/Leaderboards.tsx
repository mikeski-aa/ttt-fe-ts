import { Dispatch, SetStateAction, useState } from "react";
import { IUser } from "../interface/responseInterface";
import "../styles/leaderboards.css";
import { getLbs } from "../services/userCalls";
import LoadingBox from "./LoadingBox";

function Leaderboards({
  leaderboards,
  setLeaderboards,
}: {
  leaderboards: IUser[];
  setLeaderboards: Dispatch<SetStateAction<IUser[] | undefined>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const handleRefreshClick = async () => {
    setLoading(true);
    const newlbs = await getLbs();
    if (newlbs.users) {
      setLoading(false);
      setLeaderboards(newlbs.users);
    }
  };
  return (
    <div className="leaderboard">
      {loading ? (
        <LoadingBox text="Updating leaderboards..." />
      ) : (
        <>
          <div className="heading">Leaderboards</div>
          <button
            onClick={handleRefreshClick}
            className="leaderboardrefreshbtn"
          >
            Update
          </button>
          <div className="headings">
            <div className="headingText">name</div>
            <div className="headingText">wins</div>
            <div className="headingText">losses</div>
            <div className="headingText">draws</div>
            <div className="headingText">streak</div>
          </div>
          <div className="mappedValsGoHere">
            {leaderboards.map((user, index) => (
              <div className="oneItem" key={index}>
                <div className="headingText name">{user.username}</div>
                <div className="headingText">{user.gameswon}</div>
                <div className="headingText">{user.gameslost}</div>
                <div className="headingText">{user.gamesdrawn}</div>
                <div className="headingText">{user.maxstreak}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Leaderboards;
