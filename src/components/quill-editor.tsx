'use client'

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

import 'react-quill-new/dist/quill.snow.css';
import CreateFlowEmailBody from "@/dto/CreateFlowEmailBody";
import dynamic from 'next/dynamic';

const QuillEditor = ({
    disabled,
    setCreateFlowEmailBody,
    createFlowEmailBody
}: {
    disabled: boolean;
    setCreateFlowEmailBody: React.Dispatch<React.SetStateAction<CreateFlowEmailBody | null>>;
    createFlowEmailBody: CreateFlowEmailBody;
}) => {
    const handleChange = (value: string) => {
        setCreateFlowEmailBody((prev) => {
            if (!prev) return prev;
        
            return {
              ...prev,
              content: value,
            };
          })
    };

    return (
        <div>
            <ReactQuill
                readOnly = {disabled}
                value={createFlowEmailBody.content || ""} // Không có giá trị mặc định ban đầu
                onChange={handleChange}
                theme="snow"
                modules={{
                    toolbar: [
                        [{ 'font': [] }, { 'size': [] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }, { 'align': [] }],
                        ['link', 'image'],
                        ['clean'] // remove formatting
                    ]
                }}
            />
        </div>
    );
};

export default QuillEditor;
