import { useState } from "react";

export default function useNumberInput(data) {

    const [value, setValue] = useState(data.value);

    const handleOnChange = e => setValue(e.target.value);

    // useEffect con alguna librería de precisión

    const input = (
        <>
            <label>{data.label}</label>
            <input type="number"
                   value={value}
                   onChange={handleOnChange}/>
        </>
    )

    return [input, Number(value)]

}