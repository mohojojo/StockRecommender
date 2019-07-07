import { Action, ErrorCodes } from '../common/enums';

export const errorSendAction = (isRemove, message) => {
    return {
        type: Action.ERROR,
        message: isRemove ? '' : (message || ErrorCodes.ERROR_GENERAL)
    };
};
