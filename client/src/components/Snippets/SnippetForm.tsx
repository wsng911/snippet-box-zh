import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useState,
  useContext,
  useEffect
} from 'react';
import { SnippetsContext } from '../../store';
import { NewSnippet } from '../../typescript/interfaces';
import { Button, Card } from '../UI';

interface Props {
  inEdit?: boolean;
}

export const SnippetForm = (props: Props): JSX.Element => {
  const { inEdit = false } = props;
  const { createSnippet, currentSnippet, updateSnippet } =
    useContext(SnippetsContext);

  const [formData, setFormData] = useState<NewSnippet>({
    title: '',
    description: '',
    language: '',
    code: '',
    docs: '',
    isPinned: false,
    tags: []
  });

  useEffect(() => {
    if (inEdit) {
      if (currentSnippet) {
        setFormData({ ...currentSnippet });
      }
    }
  }, [currentSnippet]);

  const inputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const stringToTags = (e: ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',');
    setFormData({
      ...formData,
      tags
    });
  };

  const tagsToString = (): string => {
    return formData.tags.join(',');
  };

  const formHandler = (e: FormEvent) => {
    e.preventDefault();

    if (inEdit) {
      if (currentSnippet) {
        updateSnippet(formData, currentSnippet.id);
      }
    } else {
      createSnippet(formData);
    }
  };

  return (
    <Fragment>
      <div className='col-12 mt-3'>
        <Card>
          <form onSubmit={e => formHandler(e)}>
            {/* DETAILS SECTION */}
            <h5 className='card-title mb-3'>片段详情</h5>

            {/* TITLE */}
            <div className='mb-3'>
              <label htmlFor='title' className='form-label'>
                标题
              </label>
              <input
                type='text'
                className='form-control'
                id='title'
                name='title'
                value={formData.title}
                placeholder='递归复制所有文件'
                required
                onChange={e => inputHandler(e)}
              />
            </div>

            {/* DESCRIPTION */}
            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                简短描述
              </label>
              <input
                type='text'
                className='form-control'
                id='description'
                name='description'
                value={formData.description}
                placeholder='将所有文件从 src 复制到 dest 的 Bash 脚本'
                onChange={e => inputHandler(e)}
              />
            </div>

            {/* LANGUAGE */}
            <div className='mb-3'>
              <label htmlFor='language' className='form-label'>
                编程语言
              </label>
              <input
                type='text'
                className='form-control'
                id='language'
                name='language'
                value={formData.language}
                placeholder='python'
                required
                onChange={e => inputHandler(e)}
              />
            </div>

            {/* TAGS */}
            <div className='mb-3'>
              <label htmlFor='tags' className='form-label'>
                标签
              </label>
              <input
                type='text'
                className='form-control'
                id='tags'
                name='tags'
                value={tagsToString()}
                placeholder='自动化, 文件, 循环'
                onChange={e => stringToTags(e)}
              />
              <div className='form-text'>
                标签之间用英文逗号分隔，编程语言标签会自动添加
              </div>
            </div>
            <hr />

            {/* CODE SECTION */}
            <h5 className='card-title mb-3'>代码内容</h5>
            <div className='mb-3'>
              <textarea
                className='form-control'
                id='code'
                name='code'
                rows={10}
                value={formData.code}
                placeholder='cp -r ./src ./dest'
                required
                onChange={e => inputHandler(e)}
              ></textarea>
            </div>
            <hr />

            {/* DOCS SECTION */}
            <h5 className='card-title mb-3'>片段文档</h5>
            <div className='mb-3'>
              <textarea
                className='form-control'
                id='docs'
                name='docs'
                rows={10}
                value={formData.docs}
                placeholder='`-r` 参数表示 `--recursive`'
                onChange={e => inputHandler(e)}
              ></textarea>
            </div>

            {/* SUBMIT SECTION */}
            <div className='d-grid'>
              <Button
                text={`${inEdit ? '更新片段' : '创建片段'}`}
                color='secondary'
                type='submit'
              />
            </div>
          </form>
        </Card>
      </div>
    </Fragment>
  );
};
