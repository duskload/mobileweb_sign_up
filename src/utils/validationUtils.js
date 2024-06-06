import PasswordValidator from 'password-validator'

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

export const minCharsSchema = new PasswordValidator()
minCharsSchema.is().min(8)

export const digitsSchema = new PasswordValidator()
digitsSchema.is().digits(1)

export const letterCaseSchema = new PasswordValidator()
letterCaseSchema.is().uppercase(1).lowercase(1)

export const passwordSchema = new PasswordValidator()
passwordSchema.is().min(8).is().max(64).is().digits(1).is().uppercase(1).lowercase(1)
