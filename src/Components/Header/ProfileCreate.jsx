import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const ProfileCreate = ()=> {
    return (
        <div className="prof-create">
            <div className="create icon">
                <VideoCallIcon />
            </div>
            <div className="notific icon">
                <NotificationsNoneOutlinedIcon />
            </div>
            <div className="user-img icon">
                <AccountCircleOutlinedIcon />
            </div>
        </div>
    )
}

export default ProfileCreate;