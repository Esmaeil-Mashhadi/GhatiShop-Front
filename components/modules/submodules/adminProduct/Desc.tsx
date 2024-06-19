import { Editor } from '@tinymce/tinymce-react';
import { useContext } from 'react';
import { AdminProductContext } from '../../admin/Product';

const RichTextEditor = () => {

  const contextData = useContext(AdminProductContext)
  const handleEditorChange = (content: string) => {
    contextData?.setProductData({
      ...contextData.productData , 
      description : content
    })
  };


  return (
    <Editor
      apiKey="uu80dgcw3vviznbfqg85u80tio9fi4ffwz2trt5fmajlteyd"
      init={{
        height: 500,
        menubar: false,
        plugins: [ 
          'link'
        ],
        toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | link  ' +
        'forecolor backcolor ',
        skin: 'oxide-dark', 
        content_style: 'body { background: rgba(43, 51, 56); color: #fff; }',
      }}
      onEditorChange={handleEditorChange}  
    />

  );
};

export default RichTextEditor;