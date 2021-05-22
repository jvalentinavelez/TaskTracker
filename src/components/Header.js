
// const Header = (props) => {
//     return (
//         <header>
//             <h1>{props.title}</h1>
//         </header>
//     )
// }

import PropTypes from 'prop-types'
import Button from './Button'
import {useLocation} from 'react-router-dom'


//Destructuring as object ({}), there is no need to use {props.title}
const Header = ({ title, onAdd, showAdd }) => {
    // const onClick = () => {
    //     console.log('click')
    // }
    const location = useLocation()

    return (
        <header className='header'>
            {/* <h1 style={{color:'red',backgroundColor:'black'}}>{title}</h1> */}
            {/* <h1 style={headingStyle}>{title}</h1> */}
            <h1>{title}</h1>
            {/* <button className='btn'>Add</button> */}
            {location.pathname  === '/' && (
                <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
            )}
            {/* <Button color='blue' text='Hello 1'/>
            <Button color='red' text='Hello 2'/> */}
        </header>
    )
}

//Stablish default props for Header component
Header.defaultProps = {
    title:'Task Tracker',
}

Header.propTypes={
    title: PropTypes.string.isRequired,
}

//CSS in JSX
// const headingStyle = {
//     color:'red',backgroundColor:'black'
// }

export default Header
