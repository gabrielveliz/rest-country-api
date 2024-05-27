import { Link } from 'react-router-dom';
import { FaMoon,FaSun } from "react-icons/fa";
import "../styles/Menu.css"

const Menu = ({theme,ChangeTheme}) => {
    return(
        <>
            <div className="contMenu">
                <div className="title">
                <Link to={`/home`} className='link'> 
                    <h1>Where in the world?</h1>
                </Link>
                </div>
                <div className="switchTheme cursor" onClick={ChangeTheme}>
                    
                        {theme===0 ? <><span>Dark Mode</span><span><FaMoon /></span></> : <><span>Light Mode</span><span><FaSun /></span></>}
                    
                    
                </div>
            </div>
        </>
    )
}

export default Menu;