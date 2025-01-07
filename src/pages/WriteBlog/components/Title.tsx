import { Input } from 'antd';

interface handleTitleProps {
  handleTitle: (title: string) => void;
}
const Title: React.FC<handleTitleProps> = ({ handleTitle }) => {
  const titleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    handleTitle(e.target.value);
  };

  return (
    <Input
      showCount
      maxLength={20}
      style={{ width: '50vw', height: '40px', marginBottom: '10px' }}
      onChange={titleInput}
      placeholder="请输入文章标题"
      size="large"
      variant="outlined"
    />
  );
};
export default Title;
