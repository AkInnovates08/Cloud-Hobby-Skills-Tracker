export default function Loading({text="Loading..."}) {
  return <div className="loading-state"><div className="loader small"></div><span>{text}</span></div>;
}