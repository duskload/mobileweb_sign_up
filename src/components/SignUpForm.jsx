import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { FormControl, InputLabel, InputAdornment, OutlinedInput, IconButton } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

import { Button } from './Button.jsx'
import { PasswordHints } from './PasswordHints.jsx'

import { colors } from '../utils/types.js'
import {
  digitsSchema,
  letterCaseSchema,
  minCharsSchema,
  validateEmail,
} from '../utils/validationUtils.js'

import './SignUpForm.scss'

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isEmailErrored, setEmailErrored] = useState(false)

  const { control, handleSubmit, watch, getValues } = useForm()

  const { email } = getValues()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const _validateEmail = email => {
    let result

    if (!validateEmail(email)) {
      setEmailErrored(true)
      result = false
    }

    if (validateEmail(email)) {
      setEmailErrored(false)
      result = true
    }

    return result
  }

  const onSubmit = data => {
    const isEmailValid = _validateEmail(data.email)
    const hasMinCharacters = minCharsSchema.validate(data.password)
    const hasDigits = digitsSchema.validate(data.password)
    const hasUpperLowerCaseCharacters = letterCaseSchema.validate(data.password)

    if (isEmailValid && hasMinCharacters && hasDigits && hasUpperLowerCaseCharacters) {
      alert("You've signed up successfully")
    }
  }

  const errorStyle = {
    '& fieldset': {
      borderColor: colors.error,
      outline: colors.error,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${colors.error} !important`,
    },
    input: {
      color: colors.error,
    },
  }

  const successStyle = {
    '& fieldset': {
      borderColor: colors.success,
      outline: colors.success,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${colors.success} !important`,
    },
    input: {
      color: colors.success,
    },
  }

  const emailColorsStyle = isEmailErrored
    ? errorStyle
    : email && validateEmail(email)
      ? successStyle
      : {}

  return (
    <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => {
          return (
            <FormControl sx={{ m: 1, width: '315px' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                {...field}
                sx={emailColorsStyle}
                id="outlined-adornment-email"
                type="text"
                placeholder="example@gmail.com"
                label="Email"
              />
              {isEmailErrored && <div className="form-error-email">Email is invalid</div>}
            </FormControl>
          )
        }}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => {
          return (
            <FormControl sx={{ m: 1, width: '315px' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                {...field}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                inputProps={{
                  maxLength: 64,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Create your passowrd"
                label="Password"
              />
            </FormControl>
          )
        }}
      />

      <PasswordHints password={watch('password')} />

      <Button title={'Sign up'} />
    </form>
  )
}
