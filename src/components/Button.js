import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
    return (
        <button data-testid='button-id' onClick={onClick} style={{ backgroundColor: color }} className='btn'>
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
