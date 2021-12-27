import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

export const SignInSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Mật khẩu phải từ 6 đến 32 kí tự')
    .max(32, 'Mật khẩu phải từ 6 đến 32 kí tự')
    .required('Bạn chưa nhập mật khẩu!'),
  email: Yup.string().email('Email không hợp lệ').required('Bạn chưa nhập email'),
})