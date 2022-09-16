const isValidInputAmount = (v: string) => (v.match(/[0-9\.,]/) ? true : false);

export default isValidInputAmount;
