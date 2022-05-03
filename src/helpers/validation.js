import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Bạn chưa nhập email'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải từ 6 đến 32 kí tự')
    .max(32, 'Mật khẩu phải từ 6 đến 32 kí tự')
    .required('Bạn chưa nhập mật khẩu!')
})
export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Bạn chưa nhập email'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải từ 6 đến 32 kí tự')
    .max(32, 'Mật khẩu phải từ 6 đến 32 kí tự')
    .required('Bạn chưa nhập mật khẩu!'),
  fullName: Yup.string()
    .min(6, 'Full name phải từ 6 đến 32 kí tự')
    .max(32, 'Full name phải từ 6 đến 32 kí tự')
    .required('Bạn chưa nhập Full name!')
})


export const handleTime = (time) => {
  const timeExpired = new Date(time)
  return (
      (timeExpired.getDate() < 10 ? ('0' + timeExpired.getDate()) : timeExpired.getDate()) 
      + '/' + 
      (timeExpired.getMonth() + 1 < 10 ?  '0' + (timeExpired.getMonth() + 1) : (timeExpired.getMonth() + 1))
      + '/' + 
      timeExpired.getFullYear()
  )
}

export const handleDate = (date) => {
    return moment(date).format("DD/MM/YYYY - h:mm:ss a")
}

export const convertToDate = (date) => {
    return moment(date).format("DD/MM/YYYY")
}

export const timeSince = (date) => {
    return moment(date).fromNow()
}

export const convertVND = (value) => {
  return (value || 0).toLocaleString('vi', {style : 'currency', currency : 'VND'})
}