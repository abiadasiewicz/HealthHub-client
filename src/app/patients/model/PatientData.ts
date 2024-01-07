export interface PatientData {
  personalData: PersonalData;
  fotoUrl?: string;
  address: AddressData;
  contact: ContactData;
}

interface AddressData {
  city: string;
  street: string;
  postcode: string;
  country: string;
  province: string;
}

interface ContactData {
  phoneNr: string;
  email: string;
}
interface PersonalData {
  firstName: string;
  lastName: string;
  birthDate: string;
  pesel: string;
}
