import Select from "react-select";
import { useRef } from "react";

export const BasicSelect = (props: any) => {

    return <Select 
            options={props.options} 
            onChange={(e: any)=>props.dispatch({type: props.actionType, value: e.value})}
            styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width: '200px',
                  ...props.style
                }),
              }}
              placeholder={props.placeholder}
            />
}


export const QuestionSelect = (props: any) => {
  const selectRef = useRef<any>(null)

  return <Select 
          ref={selectRef}
          options={props.options} 
          onChange={(e: any)=>{
            console.log('data', e)
             props.dispatch({type: props.actionType, value: {value:e.value, label: e.label}})
              //selectRef?.current.clearValue()
            }
          }
          styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: '200px',
                ...props.style
              }),
            }}
            placeholder={props.placeholder}
            noOptionsMessage={({ inputValue }) => `No result found for "${inputValue}"`}
          />
}