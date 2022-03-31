import { useState } from "react";

export default function useSelectInput(data) {

    const [value, setValue] = useState(data.value);

    const handleOnChange = e => setValue(e.target.value)

    const input = (
        <>
            <label>{data.label}</label>
            <select value={value}
                    onChange={handleOnChange}>
                {data.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.text}</option>
                })}
            </select>
        </>
    )

    return [input, value];
}