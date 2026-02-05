import "../styles/Spinner.css";

function Spinner({ size = 40 }) {
    return (
        <div className="page-loader">
            <div className="spinner-wrapper">
                <div className="spinner"></div>
            </div>
        </div>

    );
}

export default Spinner;
