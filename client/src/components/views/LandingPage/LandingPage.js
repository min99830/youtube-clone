import React from 'react'
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import { FaCode } from "react-icons/fa";
import Axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([])

    useEffect(() => {
        
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success) {
                setVideo(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패 했습니다.')
            }
        })
    }, [])

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration = minutes * 60));

        return <Col lg={6} md={8} xs={24}>
        <a href={`/video/post/${video._id}`}>
            <div style={{ position: 'relative' }}>
                <img style={{width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`}/>
                <div className="duration">
                    <span>{minutes}: {seconds}</span>
                </div>
                
            </div>
        </a>
        <br />
        <Meta
            avatar={
                <Avatar src={video.writer.image} />
            }
            title={video.title}
            description=""
        />
        <span>{video.writer.name}</span><br />
        <span style={{marginLeft: '3rem'}}>{video.views} views</span>
        - <span> {moment(video.createAt).format("MMM Do YY")} </span>
    </Col>
    })
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Tite level={2} > Recomended</Tite>
            <hr />
            <Row gutter={[32, 16]}>

                {renderCards}
                
            </Row>
        </div>
    )
}

export default LandingPage