import * as Types from './Types'
import shortid from 'shortid'

const alartAction = (msg, color, timeout = 5000) => dispatch => {
    const id = shortid.generate()
    dispatch({
        type: Types.GET__ALART,
        payload: {
            msg, color, id
        }
    })
    setTimeout(() => dispatch({
        type: Types.REMOVE__ALART,
        payload: id
    }), timeout)
}

export default alartAction