import cx from 'classnames'
import { digitsSchema, letterCaseSchema, minCharsSchema } from '../utils/validationUtils.js'

import './PasswordHints.scss'
import { useEffect, useState } from 'react'

export function PasswordHints({ password }) {
  const [passwordHints, setPasswordHints] = useState({
    hasCharactersError: false,
    hasLetterCaseError: false,
    hasDigitsError: false,

    hasDigits: false,
    hasMinCharacters: false,
    hasUpperLowerCaseCharacters: false,
  })

  useEffect(() => {
    const hasMinCharacters = minCharsSchema.validate(password || '')
    const hasDigits = digitsSchema.validate(password || '')
    const hasUpperLowerCaseCharacters = letterCaseSchema.validate(password || '')

    const hasCharactersError = !hasMinCharacters
    const hasDigitsError = !hasDigits
    const hasLetterCaseError = !hasUpperLowerCaseCharacters

    setPasswordHints({
      hasCharactersError,
      hasLetterCaseError,
      hasDigitsError,

      hasDigits,
      hasMinCharacters,
      hasUpperLowerCaseCharacters,
    })
  }, [password])

  const charactersClass = cx({
    'password-hints--item': true,
    error: passwordHints.hasCharactersError,
    default: !password,
    success: !passwordHints.hasCharactersError && passwordHints.hasMinCharacters,
  })
  const digitsClass = cx({
    'password-hints--item': true,
    error: passwordHints.hasDigitsError && !passwordHints.hasDigits,
    default: !password,
    success: passwordHints.hasDigits && !passwordHints.hasDigitsError,
  })
  const letterCaseClass = cx({
    'password-hints--item': true,
    error: passwordHints.hasLetterCaseError && !passwordHints.hasUpperLowerCaseCharacters,
    default: !password,
    success: passwordHints.hasUpperLowerCaseCharacters && !passwordHints.hasLetterCaseError,
  })

  return (
    <ul className="password-hints">
      <li className={charactersClass}>8 characters or more (no spaces)</li>
      <li className={letterCaseClass}>Uppercase and lowercase letters</li>
      <li className={digitsClass}>At least one digit </li>
    </ul>
  )
}
