import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useContext } from 'react';
import { isThemeDark } from '../../Contexts/Theme';

const ProfileCreate = ()=> {

    const {setIsAcountNavOpen, isAcountNavOpen} = useContext(isThemeDark);
    return (
        <div className="prof-create">
            <div className="create icon">
                <VideoCallIcon />
            </div>
            <div className="notific icon">
                <NotificationsNoneOutlinedIcon />
            </div>
            <div className="user-img icon open-menu" onClick={()=> setIsAcountNavOpen(!isAcountNavOpen)} >
                <AccountCircleOutlinedIcon className='user-img open-menu'  onClick={()=> setIsAcountNavOpen(!isAcountNavOpen)}/>
            </div>
        </div>
    )
}

export default ProfileCreate;