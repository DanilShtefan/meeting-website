import React, { useState, useEffect, useCallback, useRef } from "react";
import { validator } from "../../../utils/validator";

const FormComponentLogin = ({children, validatorConfig}) => {
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({});
    const WithCallback = useRef(0)
    const isValid = Object.keys(errors).length === 0;

    const validate = useCallback(() => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    },[data])
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate()
        if(!isValid) return
        console.log(data)
    }
    const handleChange = useCallback((target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    },[])
    useEffect(() => {
        if(Object.keys(data).length >0){
            validate();
        }
    }, [data]);
    useEffect(()=>{
        WithCallback.current++;
        console.log(WithCallback)
    },[handleChange])

    const clonedElement = React.Children.map(children, (child)=>{
        let config = {}
        const childType = typeof child.type
        if(childType === 'object'){
            config = {...child.props, onChange:handleChange, value:data[child.props.name]||'', error:errors[child.props.name]}
        }
        else if (childType === 'string'){
            if(child.type === 'button'){
                if(child.props.type === 'submit'||child.props.type === undefined){
                    config = {...child.props, disabled:!isValid}   
                }
            }
        }
        return (React.cloneElement(child, config))
    })
    return (<form onSubmit = {handleSubmit}>
        {clonedElement}
    </form>)
}

export default FormComponentLogin;