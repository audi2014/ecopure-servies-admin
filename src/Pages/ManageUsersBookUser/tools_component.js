import {StepTitle_columns} from "./columns";
import {makeRequestData} from "./tools";


const validateStep = ({setErrors, state, user, errors, stepTitle}) => {
    const nextErrors = {};
    Object.keys(StepTitle_columns[stepTitle]).forEach(index => {
        const field = StepTitle_columns[stepTitle][index].field;
        const required = !!StepTitle_columns[stepTitle][index].required;
        const title = !!StepTitle_columns[stepTitle][index].title;
        const value = state[field];
        if (required && !value) {
            nextErrors[field] = `Empty required field ${title}`;
        }
    });
    if (Object.keys(nextErrors).length) {
        setErrors({...errors, ...nextErrors});
        return false;
    } else {
        return true;
    }
};


export const makeValidateStepWithCardUpdating = ({setErrors, state, user, errors, users_addBillingInfo_request, users_HomeCleaning_request}) => stepTitle => {
    if (validateStep({stepTitle, setErrors, state, user, errors})) {
        if (stepTitle === 'Billing') {
            return users_addBillingInfo_request({
                ...state,
                email: user.email,
            });
        } else if (stepTitle === 'Confirm') {
            const body = makeRequestData({...state, token:user.token});
            return users_HomeCleaning_request(body);
        } else {
            return true;
        }
    } else {
        return false;
    }
};

