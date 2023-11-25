import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useContext } from 'react';
import { statesContext } from '../../Contexts/statesContext';

const ProfileCreate = ()=> {

    const { theme, setIsAcountNavOpen, isAcountNavOpen } = useContext(statesContext);

    return (
        <div className={`${theme} prof-create`}>
            <div className={`${theme} create icon`}>
                <VideoCallIcon />
            </div>
            <div className={`${theme} notific icon`}>
                <NotificationsNoneOutlinedIcon />
            </div>
            <div 
                className={`${theme} user-img icon open-menu`}
                onClick={()=> setIsAcountNavOpen(!isAcountNavOpen)} 
                >
                <AccountCircleOutlinedIcon 
                    className={`${theme} user-img open-menu`} 
                    onClick={()=> setIsAcountNavOpen(!isAcountNavOpen)}
                    />
            </div>
        </div>
    )
}

export default ProfileCreate;