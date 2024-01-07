export const translateKeysToEng = (value: DataKeys): string => {
  switch (value) {
    case 'Imię': {
      return 'firstName';
    }
    case 'Nazwisko': {
      return 'lastName';
    }
    case 'Nr telefonu': {
      return 'phone';
    }
    case 'PESEL': {
      return 'pesel';
    }
    case 'Data urodzenia': {
      return 'birthDate';
    }
    default: {
      return value;
    }
  }
};

export type DataKeys = 'Imię' | 'Nazwisko' | 'Nr telefonu' | 'PESEL' | 'Data urodzenia';
