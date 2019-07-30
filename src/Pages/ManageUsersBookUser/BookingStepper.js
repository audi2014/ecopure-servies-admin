import React from "react";
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Typography from "@material-ui/core/Typography/Typography";
import StepContent from "@material-ui/core/StepContent/StepContent";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Button from "@material-ui/core/Button/Button";

export const BookingStepper = ({
                                   initialStep = 0,
                                   stepTitle_nextTitle = {
                                       Billing: 'Update billing info',
                                       Confirm: 'Finish'
                                   },
                                   pending,
                                   step_titles,
                                   getContentByStep,
                                   shouldNextStep,
                                   skippableSteps = []
                               }) => {
    const [activeStep, setActiveStep] = React.useState(initialStep);
    const [errorStep, setErrorStep] = React.useState(null);
    const [skippedSteps, setSkippedSteps] = React.useState([]);

    const isStepOptional = (idx) => !!skippableSteps.includes(step_titles[idx]);
    const isStepSkipped = (idx) => skippedSteps.includes(idx);
    const lastStep = Object.keys(step_titles).length - 1;
    const isLastStepActive = idx => idx >= lastStep && idx === activeStep;


    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    const handleNextPositive = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setErrorStep(null);
    };
    const handleNextNegative = () => {
        setErrorStep(activeStep);
    };

    function handleNext() {
        setSkippedSteps(skippedSteps.filter(idx => idx !== activeStep));
        const boolOrPromise = shouldNextStep(step_titles[activeStep]);
        if (typeof boolOrPromise === 'object' && boolOrPromise.then && typeof boolOrPromise.then === 'function') {
            // setPending(true);
            boolOrPromise
                .then(r => {
                    if (r === undefined) throw new Error('empty response data');
                })
                .then(r => {
                    handleNextPositive(r);
                })
                .catch(e => {
                    handleNextNegative(e);
                })
        } else if (boolOrPromise) {
            handleNextPositive(null);
        } else {
            handleNextNegative(null);
        }
    }

    function handleSkip() {
        if (isStepOptional(activeStep)) {
            setSkippedSteps([...skippedSteps, activeStep]);
            handleNextPositive();
        } else {
            alert("You can't skip a step that isn't optional.");
        }
    }

    return <Stepper activeStep={activeStep} orientation="vertical">
        {step_titles.map((stepTitle, idx) => <Step key={idx}>
            <StepLabel
                completed={(isStepSkipped(idx) ? false : (idx < activeStep)) || isLastStepActive(idx)}
                error={errorStep === idx}
                optional={isStepOptional(idx) ? <Typography variant="caption">Optional</Typography> : null}
            >
                {stepTitle}
            </StepLabel>
            <StepContent>
                <FormControl fullWidth>
                    {getContentByStep(stepTitle)}
                </FormControl>
                <div>
                    {
                        activeStep < lastStep
                            ? <div>
                                <Button
                                    disabled={pending || activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>

                                {isStepOptional(activeStep) && (
                                    <Button
                                        disabled={pending}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSkip}
                                    >
                                        Skip
                                    </Button>
                                )}

                                <Button
                                    disabled={pending}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                >
                                    {stepTitle_nextTitle[stepTitle] || 'Next'}
                                </Button>
                            </div>
                            : null
                    }

                </div>
            </StepContent>
        </Step>)}

    </Stepper>
}
