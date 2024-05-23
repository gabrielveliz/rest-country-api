import { Link } from 'react-router-dom';
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
                <div className="switchTheme" onClick={ChangeTheme}>
                    <span>{theme}</span>
                </div>
            </div>
        </>
    )
}

export default Menu;