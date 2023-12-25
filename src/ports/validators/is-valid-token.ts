export interface IsValidTokenValidatorPort {
  validate: (token: string) => string | null
}
