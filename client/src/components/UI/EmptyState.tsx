import { Link } from 'react-router-dom';

export const EmptyState = (): JSX.Element => {
  const editorLink = (
    <Link to='/editor' className='fw-bold text-success text-decoration-none'>
      <span>编辑器</span>
    </Link>
  );

  return (
    <div className='col-12 d-flex flex-column align-items-center'>
      <h4>您还没有任何代码片段</h4>
      <p>前往 {editorLink} 创建一个吧</p>
    </div>
  );
};
