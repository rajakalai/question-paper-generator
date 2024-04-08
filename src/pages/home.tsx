import React, { useEffect, useReducer } from "react"
import { BasicSelect, QuestionSelect } from "../common/react-select"
import { questions } from "../mockData"
import generatePDF, { Resolution, Margin, Options } from 'react-to-pdf';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';


type InitialState = {
    class: number,
    subject: number,
    questions: any[],
    selectedQuestions: any[]
}

type Action = {
    type: string,
    value: any
}
function reducer(state : InitialState, action : Action) {
    switch (action?.type) {
        case 'UPDATE_CLASS':
            return {
                ...state,
                class: action.value
            }
        case 'UPDATE_SUBJECT':
            return {
                ...state,
                subject: action.value
            }
        case 'ADD_QUESTION':
            return {
                ...state,
                selectedQuestions : [...state.selectedQuestions, {id: action.value?.value, key: state.selectedQuestions.length+1, question: action.value?.label}]
            }
        case 'REMOVE_QUESTION':
            return {
                ...state,
                selectedQuestions : state.selectedQuestions.filter((value => value.id != action.value.value))
            }
        default:
            return state
    }
}

const Home = () => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    

    let initialState = {
        class: null,
        subject: null,
        questions:[],
        selectedQuestions: []

    }

    const [ state, dispatch ]: any[]= useReducer<any>(reducer, initialState);

    useEffect(()=> {
        console.log('state', state)
    })

    let classOptions = [
        {label : 'sixth', value : 6},
        {label : 'seventh', value : 7},
        {label : 'eight', value : 8},
        {label : 'ninth', value : 9}
    ]
    
    let subjectOptions = [
        {label : 'tamil', value : 'tamil'},
        {label : 'english', value : 'english'},
        {label : 'math', value : 'math'},
        {label : 'science', value : 'science'}
    ]
    let classProps = {
        placeholder: 'select class',
        options : classOptions,
        actionType: 'UPDATE_CLASS',
        dispatch: dispatch
    }

    let subjectProps = {
        placeholder: 'select subject',
        options : subjectOptions,
        actionType: 'UPDATE_SUBJECT',
        dispatch: dispatch,
        style: {
            width: '250px'
        }
    }
    let questionsProps = {
        placeholder: 'select question',
        options : questions.map((value: any, key) => ({value: value?.id, label: value.question, ...value})),
        actionType: 'ADD_QUESTION',
        dispatch: dispatch,
        style: {
            width: '250px'
        }
    }

    const options:Options = {
        // default is `save`
        method: 'open',
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.HIGH,
        page: {
           // margin is in MM, default is Margin.NONE = 0
           margin: Margin.SMALL,
           // default is 'A4'
           format: 'letter',
           // default is 'portrait'
           orientation: 'landscape',
        },
        canvas: {
           // default is 'image/jpeg' for better size performance
           mimeType: 'image/png',
           qualityRatio: 1
        },
        // Customize any value passed to the jsPDF instance and html2canvas
        // function. You probably will not need this and things can break, 
        // so use with caution.
        overrides: {
           // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
           pdf: {
              compress: true
           },
           // see https://html2canvas.hertzen.com/configuration for more options
           canvas: {
              useCORS: true
           }
        },
     };
     
     // you can use a function to return the target element besides using React refs
     const getTargetElement = () => document.getElementById('content-id');
     

    return (
        <div>
            <div className="flex w-[calc(100vw-200px)] justify-between my-5">
                <BasicSelect {...classProps}/>
                <BasicSelect {...subjectProps}/>
                <QuestionSelect {...questionsProps}/>
            </div>

            <button className="bg-green-400 rounded text-white font-bold py-3 px-5 hover:bg-green-600 px-10" onClick={() => generatePDF(getTargetElement, options)}>Download PDF</button>
            <div id="content-id">
                {state?.selectedQuestions.map((value: any, key: number) => (
                    <div key={key}>

                        <p className="text-3xl font-bold underline" style={{color:'red',}}>
                            <span>{value.key} . </span>
                            <span>{value.question}</span>
                        </p>
                    </div>
                ))}
            </div>
            <Editor editorState={editorState} onChange={setEditorState} />;
        </div>
    )
}

function DragAndDropList(elements: any) {
    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
}

export default Home