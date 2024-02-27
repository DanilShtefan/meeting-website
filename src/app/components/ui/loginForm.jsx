import React from "react";
import CheckBoxField from "../common/form/checkBoxField";
import FormComponentLogin from "../common/form/FormComponentLogin";
import { TextField } from "../common/form/fields";

const LoginForm = () => {
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };

    return (
        <FormComponentLogin validatorConfig = {validatorConfig} >
            <TextField
                label="Электронная почта"
                name="email"
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
            />
            <CheckBoxField
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
            >
                Submit
            </button>
        </FormComponentLogin>
    );
};

export default LoginForm;
