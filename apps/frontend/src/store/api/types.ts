export interface IUser {
  _id: string;
  username: string;
  position: string;
  status: string;
  role: string;
  biometrics?: IUserBiometrics;
  job?: IUserJob;
  military?: IUserMilitary;
  education?: IUserEducation;
}

interface IUserEducation {
  institute: string;
  startDate: string;
  endDate: string;
  profession: string;
  faculty: string;
  fiplomaNumber: string;
  issueDate: string;
}

interface IUserJob {
  jobAcceptedDate: string;
  jobReleaseDate: string;
  division: string;
  position: string;
  profession: string;
  workBrochureNumber: string;
  civilServantCode: string;
  admissionOrderNumber: string;
  receivedOrderDate: string;
  releaseOrderNumber: string;
  releaseOrderDate: string;
  contractNumber: string;
  contractStartDate: string;
  contractEndDate: string;
  contractName: string;
}

export interface IUserMilitary {
  militaryBrochure: string;
  disarmamentState: string;
  militaryServiceDate: string;
  militaryEmploymentDate: string;
}

export interface IUserBiometrics {
  phone?: number;
  firstname?: string;
  lastname?: string;
  surname?: string;
  birthDate?: string;
  familyStatus?: string;
  familyMembers?: number;
  VAT?: string;
  childrenNumber?: number;
  documentName?: string;
  documentNumber?: string;
  givenBy?: string;
  givenWas?: string;
  validUntil?: string;
  socialCardNumber?: string;
  residentialCommunity?: string;
  city?: string;
  street?: string;
  apartment?: string;
  phoneNumber?: number;
  email?: string;
}

export interface IGenericResponse {
  status: string;
  data: IGenericResponseData;
}

export interface IGenericResponseData {
  error: string;
  message: string;
  statusCode: number;
}
