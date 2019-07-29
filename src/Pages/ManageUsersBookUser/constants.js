const generateRange = ({start = 1, count}) => (new Array(count))
    .fill(null)
    .reduce((prev, curr, i) => {
        prev[i + start] = String(i + start);
        return prev;
    }, {});


export const NumBr_Title = {'Studio':'Studio', ...generateRange({count:5})};
export const NumBth_Title = generateRange({count:3});
export const HomeCondition_Title = {
    'Exceptionally Clean':'Exceptionally Clean',
    'Moderately Clean':'Moderately Clean',
    'Very Cluttered':'Very Cluttered',
};
export const NumKids_Title = generateRange({start:0,count:5});
export const NumPets_Title = generateRange({start:0,count:5});