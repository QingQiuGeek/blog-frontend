import '../css/index.css';
const PassageSummary = ({ children }: any) => {
  return (
    <div
      className="content-div"
      style={{
        marginTop: '10px',
        // marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <span className="content-p">{children}</span>
    </div>
  );
};

export default PassageSummary;
