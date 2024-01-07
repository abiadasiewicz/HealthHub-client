export const formatPhoneNr = (input: string | undefined): string => {
  return input ? input.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3') : '';
};
