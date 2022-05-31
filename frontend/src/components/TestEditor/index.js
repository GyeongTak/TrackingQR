import React, {useState, useMemo} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postProject } from 'apis/project';

const QuillEditor = () => {
    //이미지 url 제어
    function imageUrlHandler() {
        const range = this.quill.getSelection();
        const url = prompt('please copy paste the image url here.');

        if (url) {
            //커서위치에 imageUrl 삽입
            this.quill.insertEmbed(range.index, 'image', url);
        }
    }

    //이미지 제어
    function imageHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', '.png, .jpg, .jpeg');
        input.click();

        input.onchange  = async(e) => {

            
            const files = e.target.files;
            const formData = new FormData();
            formData.append('files', files[0]);

            //file 등록
            const tempFile = await postProject(formData);
            console.log('check');
            /*
            tempFile.then(response => {
                //커서위치 및 fileSrno 얻기
                const fileSrno = response.fileSrno;
                const range = this.quill.getSelection();
                this.quill.insertEmbed(range.index, 'image', 'http://localhost:8002/master/api/v1/upload/img/'+fileSrno);
            });
            */
        }
    }

    const [value, setValue] = useState('');

    //Quill Editor 모듈 구성
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{header: [1,2,false]}],
                ['bold', 'italic', 'underline'],
                [{list:'ordered'}, {list:'bullet'}],
                ['imageUrl', 'image', 'code-block']
            ],
            handlers: {
                imageUrl: imageUrlHandler,
                image: imageHandler
            }
        }
    }), [])

    console.log(value);

    return (
        <ReactQuill theme='snow' value={value} modules={modules} onChange={setValue} />
    );
}

export default QuillEditor;