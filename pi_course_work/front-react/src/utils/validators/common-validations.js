
export const required = value => (value ? undefined : 'Required');

export const requiredMes = (message) => value => (value ? undefined : message);