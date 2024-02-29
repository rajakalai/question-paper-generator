import { Dispatch, ReducerAction } from "react"

interface option {
    name : string,
    value: string | number
}
interface OnchangeArgumentes {
    type: string,
    name : string, 
    value: (string | number)
}
interface input {
    label : string,
    id: string,
    options: option[],
    OnChange : any
}

export const Select = ({label, id, options, OnChange}: input) => {
    return (
        <>
            <label htmlFor={label}>label</label>
            <select name={label} id={id} onChange={(e) => OnChange({type : "UPDATE", name: label, value: e.target.value})}>
                {options.map((option, key) => (
                    <option value={option.value}>{option.name}</option>
                ))}
            </select>
        </>
    )
}