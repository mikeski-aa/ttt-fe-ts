import loadinggif from "../assets/gear-spinner.svg";

function LoadingBox({ text }: { text: string }) {
  return (
    <div className="loadingBox">
      <div className="loadingText">{text}</div>
      <img className="loadingGifStyle" src={loadinggif} />
    </div>
  );
}

export default LoadingBox;
