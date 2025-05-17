class ResetPasswordRequestDTO {
  newPassword!: string;

  confirmPassword!: string;

  resetPasswordToken?: string;
}

export { ResetPasswordRequestDTO };
