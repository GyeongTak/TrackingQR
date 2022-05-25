import React, {Component, ReactElement, useEffect, useState} from 'react'; //필요한 라이브러리 첨부
import MainMenu from '../../components/MainMenu';
import Footer from '../../components/Footer';
import 'antd/dist/antd.min.css';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import { TextInput } from 'react-native-web';
import { useInput } from 'utils/useInput';
import './index.css';

const ARRAY = [0, 1, 2, 3, 4]; //별의 개수가 5개이니 인덱스 0~4

function WriteReviewPage() {

    const [clicked, setClicked] = useState([false, false, false, false, false]); //하나를 클릭하면 true, flase, ... 이런식으로 바뀌게
  
    const handleStarClick = index => { //el에 찍힌 값이 index로 들어와 index-1 까지는 true로 변경
      let clickStates = [...clicked];
      for (let i = 0; i < 5; i++) {
        clickStates[i] = i <= index ? true : false;
      }
      setClicked(clickStates);
    };
  
    useEffect(() => {
    }, [clicked]); 
  
    const sendReview = () => {
      let score = clicked.filter(Boolean).length; //true 표시한 별 개수만 체크
      console.log(score); //별점 개수에 따라 score 제대로 출력되는거 확인 완료
     
      // fetch('http://localhost:8000/writeReview', {
      //   method: 'POST',
      //   Headers: {
      //     Authroization: '권한 코드',
      //   },
      //   body: JSON.stringify({
      //     write_review_id:1
      //     star: score,
      //   }),
      // });
    };


    //별점 아래 UI 관련 코드
    const [photos, setPhotos] = useState([]); 
    const [ imagePrevious, setImagePrevious ] = useState([]); 
    const [ description, onChangeContent ] = useInput('');

    const onChangeFile = (e) => {
        if (e.target.files[0]) {
        setPhotos([...photos, e.target.files[0]]);
        const reader = new FileReader();
        
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            setImagePrevious([...imagePrevious, e.target.result]);
        };
        
        }
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        
        let score = clicked.filter(Boolean).length; //true 표시한 별 개수만 체크
        console.log(score); //별점 개수에 따라 score 제대로 출력되는거 확인 완료

        const formData = new FormData();
        formData.append('photos', photos);
        formData.append('description', description);
        formData.append('score', score);

    
    
    };

    return (
        <>
        <MainMenu />
        <Wrap>
          <RatingText style={{marginTop:'40px', textAlign:'center', fontSize:'30px', fontWeight:'bold'}}>고객님의 소중한 후기를 들려주세요!</RatingText>
          <Stars style={{marginLeft:'640px', marginTop:'20px'}}>
            {ARRAY.map((el, idx) => { //map은 배열을 받아 새로운 배열로 리턴하는 함수 -> 인덱스 값이 el로 찍히게 됨
              return (
                <FaStar //svg로 나타냄
                  key={idx}
                  size="50"
                  onClick={() => handleStarClick(el)}
                  className={clicked[el] && 'redStar'}
                />
              );
            })}
          </Stars>
        </Wrap>
        <hr style={{width:'1000px', marginTop:'50px'}}></hr>
        <div style={{marginTop:'30px', textAlign:'center'}}>
          <span style={{fontSize:'18px', fontWeight:'bold'}}>평점에 따른 이유를 작성해주세요</span><br/>
          <span style={{fontSize:'18px', fontWeight:'bold'}}>어떤 점이 좋았나요?</span><br/>
          <textarea
            onChange={onChangeContent}
            maxLength={200} //200자 제한
            multiline={true}
            style={{
              padding:20,
              fontSize:15,
              marginTop: 40,
              paddingHorizontal: 10,
              width:940,
              height: 240,
              borderRadius: 10,
              borderWidth: 1,
              borderColor:'aliceblue',
              backgroundColor:'aliceblue'
            }}
            placeholder="최소 10글자 이상 입력해주세요"
          />
        </div>
        <div style={{textAlign:'center', marginTop:'30px', marginLeft:'290px', width:'940px', height:'200px', borderRadius: 10,
        border:'2px solid skyblue'}}>
            <input type="file" multiple onClick={onChangeFile} style={{marginTop:'20px'}}/>
            <div style={{display: 'flex'}}>
                {imagePrevious.map((p, index)=> <div><img key={index} alt="미리보기" src={p} height={'100px'} width={'100px'}></img></div>)}
            </div>
        </div>
        <button className='submit' type='submit'>등록</button><br/><br/><br/><br/>
        
        <Footer />
        </>
        
      );
    }


export default WriteReviewPage;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 12px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: rgb(238, 237, 237);
    cursor: pointer;
  }

  :hover svg {
    color: rgb(254, 94, 94);
  }

  & svg:hover ~ svg {
    color: rgb(238, 237, 237);
  }

  .redStar {
    color: rgb(254, 94, 94);
  }
`;