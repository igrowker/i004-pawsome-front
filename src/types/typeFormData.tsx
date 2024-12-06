type PersonalData = {
  fullName: string;
  birth: string;
  gender: string;
  address: string;
  contactTel: string;
  email: string;
};

type Availability = {
  availableDays: string;
  availableHours: string;
  frecuency: string;
};

type ExperienceAndSkills = {
  experience: string;
  preferenceArea: string;
  knowledge: string;
};

type Motivation = {
  volunteer: string;
  learn: string;
};

type RolePreferences = {
  role: string;
  individualTeam: string;
};

type HealthConditions = {
  medicalConditions: string;
  alergics: string;
};

type SelectedVolunteering = {
  volunteeringId: string;
  volunteeringName: string;
  volunteeringDescription: string;
};

type AdditionalObservations = {
  additionalInfo: string;
};

type AdditionalMessage = string

type FormData = {
  personalData: PersonalData;
  availability: Availability;
  experienceAndSkills: ExperienceAndSkills;
  motivation: Motivation;
  rolePreferences: RolePreferences;
  healthConditions: HealthConditions;
  selectedVolunteering: SelectedVolunteering;
  additionalObservations: AdditionalObservations;
  additionalMessage: AdditionalMessage
};

export default FormData;