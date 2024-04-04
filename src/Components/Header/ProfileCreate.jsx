import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useContext } from 'react';
import { statesContext } from '../../Contexts/statesContext';

const ProfileCreate = ()=> {

    const { theme, setIsAcountNavOpen, isAcountNavOpen } = useContext(statesContext);

    return (
        <div className='prof-create'>
            <div className={`t-color-${theme} back-hov-c-${theme}-2 create icon`}>
                <VideoCallIcon />
            </div>
            <div className={`t-color-${theme} back-hov-c-${theme}-2  notific icon`}>
                <NotificationsNoneOutlinedIcon />
            </div>
            <div 
                className={` t-color-${theme} back-hov-c-${theme}-2  user-img icon open-menu`}
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