// atoms/signupAtoms.ts
import { atom } from "jotai";

export interface SiblingData {
  name: string;
  age: string;
  gender: string;
  profession: string;
  maritalStatus: string;
}

export interface FormData {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  timeOfBirth: string;
  placeOfBirth: string;
  rashi: string;
  height: string;
  weight: string;
  maritalStatus: string;
  complexion: string;
  diet: string;
  drink: boolean;
  smoke: boolean;
  hobbies: string;
  religion: string;
  motherTongue: string;
  caste: string;
  subCaste: string;
  gotra: string;
  manglik: boolean;
  education: string;
  collegeName: string;
  collegeYear: string;
  schoolName: string;
  schoolYear: string;
  otherDegree: string;
  otherOrg: string;
  otherYear: string;
  employedIn: string;
  workingSince: string;
  organization: string;
  annualIncome: string;
  familyType: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  familyIncome: string;
  permanentAddress: string;
  residentialAddress: string;
  city: string;
  state: string;
  country: string;
  numberOfCars: string;
  numberOfBikes: string;
  profileImage: string; // new field
  numberOfSiblings: string;
  siblings: SiblingData[];
}

export const formDataAtom = atom<FormData>({
  email: "",
  password: "",
  name: "",
  dateOfBirth: "",
  gender: "",
  timeOfBirth: "",
  placeOfBirth: "",
  rashi: "",
  height: "",
  weight: "",
  maritalStatus: "",
  complexion: "",
  diet: "",
  drink: false,
  smoke: false,
  hobbies: "",
  religion: "",
  motherTongue: "",
  caste: "",
  subCaste: "",
  gotra: "",
  manglik: false,
  education: "",
  collegeName: "",
  collegeYear: "",
  schoolName: "",
  schoolYear: "",
  otherDegree: "",
  otherOrg: "",
  otherYear: "",
  employedIn: "",
  workingSince: "",
  organization: "",
  annualIncome: "",
  familyType: "",
  fatherName: "",
  fatherOccupation: "",
  motherName: "",
  motherOccupation: "",
  familyIncome: "",
  permanentAddress: "",
  residentialAddress: "",
  city: "",
  state: "",
  country: "",
  numberOfCars: "0",
  numberOfBikes: "0",
  profileImage: "",
  numberOfSiblings: "0",
  siblings: [],
});

export const isSubmittingAtom = atom(false);
export const profileFileAtom = atom<File | null>(null);
