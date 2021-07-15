import * as Types from './Types'

const alartAction = (msg, color, timeout = 4000) => dispatch => {
    dispatch({
        type: Types.GET__ALART,
        payload: {
            msg,
            color
        }
    })
    setTimeout(() => dispatch({
        type: Types.REMOVE__ALART
    }), timeout)
}

export default alartAction