import React, { useState } from 'react'
import { Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;

function Comment(props) {

    const videoId = props.postId;
  
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("")
  
    const handleClick = (event) => {
      setcommentValue(event.currentTarget.value)
    }
  
    const onSubmit = (event) => {
      // 버튼 클릭됐을 때 refesh 동작이 안되도록
      event.preventDefault();
  
      //comment 내용 서버에 저장
      const variables ={
        content: commentValue,
        writer: user.userData._id,
        postId: videoId
      }
  
      Axios.post('/api/comment/saveComment',variables)
        .then(response=>{
          if(response.data.success){
            setcommentValue("")
            props.refreshFunction(response.data.result)
          }else{
            alert('코멘트를 저장하지 못했습니다.')
          }
        })
  
    }
  
    return(
      <div>
        <br />
        <p> Replies </p>
        <hr />
        <br />
        {/* Comment Lists */}
        {props.commentLists && props.commentLists.map((comment, index)=>(
             (!comment.responseTo &&
               <React.Fragment>
                 <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} />
                 <ReplyComment  refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists} />
               </React.Fragment>
  
         )
  
        ))}
  
        <form style={{display: 'flex'}} onSubmit={onSubmit} >
          <TextArea
            style={{width: '100%', borderRadius:'5px' }}
            onChange={handleClick}
            value={commentValue}
            placeholder="코멘트를 작성해 주세요"
            />
  
            <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
          </form>
      </div>
    )
  }

  export default Comment