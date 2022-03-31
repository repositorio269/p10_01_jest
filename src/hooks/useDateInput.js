import { useState } from "react";

export default function useDateInput(data) {

    const [value, setValue] = useState(data.value);

    const handleOnChange = e => setValue(e.target.value)

    const input = (
        <>
            <label>{data.label}</label>
            <input type="date"
                   value={value}
                   onChange={handleOnChange}/>
        </>
    )

    return [input, value]

}