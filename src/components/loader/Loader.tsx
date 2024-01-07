import './Loader.css';
import { RotatingLines } from 'react-loader-spinner';

function Loader(): JSX.Element {
  return (
    <div className="spinner-wrapper">
      <RotatingLines
        strokeColor="#c0c0c0"
        strokeWidth="5"
        animationDuration="0.75"
        width="100"
      />
    </div>
  );
}

export default Loader;
