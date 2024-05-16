
const Menu = ({theme}) => {
    return(
        <>
            <div className="contMenu">
                <div className="title">
                    <h1>Where in the world?</h1>
                </div>
                <div className="switchTheme">
                    <span>{theme}</span>
                </div>
            </div>
        </>
    )
}

export default Menu;