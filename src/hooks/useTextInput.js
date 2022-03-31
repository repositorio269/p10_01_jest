import { useEffect, useState } from "react"

export default function useTextInput(inputData) {

    const [data, setData] = useState(inputData);
    const [validation, setValidation] = useState({
        valid: data.valid,
        errorMessage: data.errorMessages[0]
    })

    const handleOnChange = e => setData({...data, value: e.target.value});

    useEffect(() => {
        if(data.value.length === 0 && !validation.valid) {
            setValidation({
                valid: false,
                errorMessage: data.errorMessages[0]
            })
        } else if(!new RegExp(data.pattern).test(data.value)) {
            setValidation({
                valid: false,
                errorMessage: data.errorMessages[1]
            })
        } else {
            setValidation({
                valid: true,
                errorMessage: ''
            })
        }
    }, [data, validation.valid])

    const input = (
        <>
            <label>
                {data.label}
                <span className="alert" data-testid={data.messageTestId}>{validation.errorMessage}</span>
            </label>
            <input data-testid={data.inputTestId} type="text" 
                   value={data.value}
                   maxLength={data.maxLength}
                   onChange={handleOnChange}/>
        </>
    )

    return [input, data.value, validation.valid];
}