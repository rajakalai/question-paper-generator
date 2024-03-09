import { useEffect, useReducer } from "react"
// import { Select } from "../common/input"
import Select  from 'react-select'
import CustomSelectProps from "../common/customSelect"

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

let optionsData = [
    {name : 'sixth', value : 6},
    {name : 'seventh', value : 7},
    {name : 'eight', value : 8},
    {name : 'ninth', value : 9}
]

let subjectOptions = [
    {name : 'tamil', value : 'tamil'},
    {name : 'english', value : 'english'},
    {name : 'math', value : 'math'},
    {name : 'science', value : 'science'}
]

interface InitialState {
    class: string | null | number,
    subject: string | null | number,
    exam: string | null | number
}
interface Action {
    type : 'UPDATE',
    name : string,
    value : any
}
const initialState : InitialState = {
    class: null,
    subject: null,
    exam: null
}

const reducer = (state : InitialState, action: Action) => {
    switch (action.type) {
        case 'UPDATE':
            console.log(action, state)
            return {
                ...state,
                [action.name] : action.value
            }
        default:
            return state
    }
}

const Home = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState)

    useEffect(() => {
        console.log('state', state)
    })

    return (
        <div>
            Home components
            {/* <Select label='class' id='class' options={optionsData} OnChange={dispatch}/>
            <Select label='subject' id='subject' options={subjectOptions} OnChange={dispatch}/> */}
            <div style={{display: 'flex',}}>
                <Select options={options} />
                <Select options={options} />
                <CustomSelectProps />
            </div>
        </div>
    )
}

export default Home