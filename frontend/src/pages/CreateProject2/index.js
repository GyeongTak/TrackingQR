import React, {useEffect, useState, useRef} from 'react'; //필요한 라이브러리 첨부
import MainMenu from '../../components/MainMenu';
import Footer from '../../components/Footer';
import 'antd/dist/antd.min.css';
import { useInput } from 'utils/useInput';
import { postRequest } from 'apis/request';
import { Form, DatePicker } from 'antd';
import './index.css';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from 'components/Editor';
import QuillEditor from 'components/TestEditor';

const CreateProjectPage2 = ({ placeholder, value, ...rest }) => {
  
    useEffect(() => {
    }); 

    const [images, setImages] = useState([]); 
    const [fileImage, setFileImage] = useState("");
    const [ imagePrevious, setImagePrevious ] = useState([]); 
    const [ description, onChangeContent ] = useInput('');

    const onChangeFile = (e) => {
        if (e.target.files[0]) {
        setImages([...images, e.target.files[0]]);
        const reader = new FileReader();
        
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            setImagePrevious([...imagePrevious, e.target.result]);
        };
        
        }
    }


    //미리보기를 위해 파일 저장
    const saveFileImage = (e) => {
      setFileImage(URL.createObjectURL(e.target.files[0]));
    };


    //이미지 파일 삭제 버튼
    const deleteFileImage = () => {
      URL.revokeObjectURL(fileImage);
      setFileImage("");
    };   
    

    const onSubmit = async (e) =>{
        e.preventDefault();
       
        const formData = new FormData();
        formData.append('images', images);
        formData.append('small_image', fileImage);
        formData.append('description', description);

        const result = await postRequest(formData);
    
    };

    //이미지 등록 버튼 커스텀을 위한 코드
    const imageInput = useRef();

    const onCickImageUpload = () => {
        imageInput.current.click();
      };

    return (
        <>
        <MainMenu />
        <span style={{position:'absolute', marginTop:'50px' ,marginLeft:'280px' , textAlign:'center', fontSize:'35px', 
        fontWeight:'bold'}}>디자이너님의 프로젝트를 직접 등록해주세요!</span>
        <hr style={{width:'900px',marginTop:'120px', marginLeft:'280px'}}></hr>

        <Form name="time_related_controls" >
                <div style={{display:'flex', alignItems:'start', marginLeft:'300px', marginTop:'30px'}}>
                    <div style={{fontSize:'16px'}}>[ 프로젝트 참여기간 ]</div>
                    <Form.Item name="range-picker" style={{marginRight:'5px', marginLeft:'-140px', marginTop:'50px'}} >
                        <DatePicker.RangePicker />
                    </Form.Item>
                </div>
        </Form>

        <div style={{marginTop:'10px', fontWeight:'bold'}}>
          <span style={{marginLeft:'300px', fontSize:'16px', fontWeight:'normal'}}>[ 프로젝트 대표 이미지를 첨부해주세요 ]</span>
        </div>

        <div style={{textAlign:'center', marginTop:'30px', marginLeft:'290px', width:'940px', height:'220px', borderRadius: 10,
        border:'1px solid gray'}}>
            <input type="file" multiple onChange={saveFileImage} style={{marginTop:'20px', display:'none'}} ref={imageInput}/>
            <button style={{width:'150px', height:'150px', marginLeft:'-50px',marginTop:'20px', backgroundColor:'rgb(231, 236, 240)', fontSize:'50px', border:'1px solid rgb(246, 249, 251)'}} 
            onClick={onCickImageUpload}>+</button>

            <button style={{borderRadius: 10, border:'1px solid rgb(246, 249, 251)', backgroundColor:'rgb(231, 236, 240)', color:'black', width: "120px", height: "30px", 
            cursor: "pointer", position:'absolute', marginTop:'180px', marginLeft:'-135px'}}
                    onClick={() => deleteFileImage()}
            >
              이미지 삭제
            </button>

            <div style={{position:'absolute', marginLeft:'370px', marginTop:'-150px'}}>
                {fileImage && (
                  <img
                    alt="sample"
                    src={fileImage}
                    style={{height:'150px', width:'150px' }}
                  />
                )}
            </div>
        </div>

        <div style={{marginTop:'30px', textAlign:'center'}}>
          <div style={{fontSize:'16px', textAlign:'left', marginLeft:'300px', height:'10px'}}>[ 프로젝트 타이틀 ]</div>
          <textarea
            onChange={onChangeContent}
            maxLength={50} //50자 제한
            multiline={false}
            style={{
              padding:20,
              fontSize:15,
              marginTop: 40,
              paddingHorizontal: 10,
              width:940,
              height: 70,
              borderRadius: 10,
              borderWidth: 1,
              borderColor:'gray'
            }}
            placeholder="프로젝트 제목을 입력해주세요"
          />
        </div>

        <div style={{fontSize:'16px', textAlign:'left', marginLeft:'300px', height:'10px', marginTop:'40px'}}>[ 프로젝트 상세설명 ]</div>
        <div style={{marginTop:'40px', textAlign:'center', width:'940px', marginLeft:'290px'}}>
            <Editor></Editor>
        </div>
        <div style={{marginTop:'40px', textAlign:'center', width:'940px', marginLeft:'290px'}}>
            <QuillEditor></QuillEditor>
        </div>
      
        <button className='submit' type='submit' onClick={onSubmit}>등록</button><br/><br/><br/><br/>
        
        <Footer />
        </>
        
      );
    };


export default CreateProjectPage2;