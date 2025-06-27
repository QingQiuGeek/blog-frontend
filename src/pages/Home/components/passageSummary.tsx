import { Typography } from 'antd';
import '../css/index.css';
const { Paragraph } = Typography;
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
      <Paragraph style={{ width: 'auto' }}>
        <a>{children}</a>
      </Paragraph>
    </div>
  );
};

export default PassageSummary;
