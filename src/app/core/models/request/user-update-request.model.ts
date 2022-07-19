export interface UserUpdateRequest {
    ID: number;
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: number;
    email: string;
    phoneNumber: string;
    gender: number;
    biography: string;
    education: string;
    workExperience: string;
    skills: string;
    interests: string;
    public: boolean;
}
