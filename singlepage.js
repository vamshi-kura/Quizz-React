/**
 * the last component in the quiz tag.
 * @param  props 
 */
function Summary(props){
    console.log(props.ua) 

    const val = 0
    return (
        <div>
            <ol>
            {props.ql.map((c,val) =>
                    <li key= {c.choices} >
                        <div>
                            {c.qt}
                            <br/>
                            <h5>Correct Answer are :</h5> {c.correctchoices.map((cc)=>
                            <span key = {cc[0]}>{cc}  &nbsp;</span>)}
                            <br/>
                            <br/>
                            {props.ua[val] ? <h5 className = "text-success"> Correct  </h5>:<h5 className = 'text-danger'> Incorrect Answer</h5>}
                        </div>
                    </li>,
                    val+1
            )}
            </ol>
        </div>
    )
}




/*
this is a main component where the main quiz runs
the state variables 
ind - used for the question tags retrieval from the array of question items.
choosedarr - A object that contains question nos. with the array of options chossed by user
arr - this is used in question component and similar to choosed arr 
correct ans are you used in summary tag
*/
class Quiz extends React.Component {
    constructor(props){
        super(props)
        this.displayOff = this.displayOff.bind(this)
        this.incc = this.incc.bind(this)
        this.dec = this.dec.bind(this)
        this.valuecheck = this.valuecheck.bind(this)
        this.setarr = this.setarr.bind(this)
        this.updatearr = this.updatearr.bind(this)
        // this.addElemToArr = this.addElemToArr.bind(this)
        // this.removeElemFromArr = this.removeElemFromArr.bind(this)
        
        this.state = {
            ind : 0,
            choosedarr : new Object(),
            arr : { },
            correctans :[]
            
        }
        this.questionitems = ''

    }
    /*
    this method used for to intialize state variable with key as question no. and empty array as value
    */
    setarr(){
        const l = this.props.object.Questions.length
        console.log(l)
        for (let i = 1; i <= l; i++) {
            console.log(this.state.arr[i])
            if (this.state.arr[i] === undefined){
                this.state.arr[i] = []  
                this.setState({
                    arr: this.state.arr
                })
            }
        }
        
    }
    /*
    this method used for to intialize state variable with key as question no. and empty array as value to update
    */
    updatearr(){
        const l = this.props.object.Questions.length
        console.log(this.state.choosedarr,'chosedArray')
        for (let i = 1; i <= l; i++) {
            if(this.state.choosedarr[i] === undefined){
                this.state.correctans.push(false)
            }else{
                if(this.state.choosedarr[i].length != this.props.object.Questions[i-1].correctchoices.length) {
                    this.state.correctans.push(false)
                }else{
                    for (let j = 0; j < this.state.choosedarr[i].length; j++){
                        if(!this.props.object.Questions[i-1].correctchoices.includes(this.state.choosedarr[i][j])){
                            this.state.correctans.push(false)
                            break
                        }
                        if(j === this.state.choosedarr[i].length - 1){
                            this.state.correctans.push(true)
                        }
                    }
                }
            }
            this.setState({
                correctans : this.state.correctans
            })
        }
    }
    /**
     * class variable to define style.
     */
    contdisplayon = {
        display : 'block'
    }
    /**
     * class variable to define style.
     */
    contdisplayoff = {
        display : 'None'
    }
    /**
     * to show the next div and call the display On funtion
     * @param  event  
     */
    displayOff(event){
        if (event.target.id === 'last') {
            this.updatearr()
        } else{
            this.setarr()
        
            this.questionitems = this.props.object.Questions.map((q) =>
            <Question  key = {q.qt[2]} qt = {q.qt} choices = {q.choices} arr = {this.state.arr}
            function1 = {this.addElemToArr} function2 = {this.removeElemFromArr} ind = {this.state.ind} />)
        }
        
        event.target.parentNode.style.display  = 'None'
        this.displayOn(event.target.parentNode.nextElementSibling)
    }
    /**
     * this method is called inside dispaly off method.
     */
    displayOn(tag) {
        tag.style.display = 'block'
    }
    // glitch occured so changed signature style.
    /**
     * this methiod is called as props to question tag
     */
    addElemToArr =  (val,id,newarr) => {
        // console.log(val,this.state.choosedarr,id)
        if (this.state.choosedarr[id] === undefined){
            this.state.choosedarr[id] = []
            this.setState({
                choosedarr : this.state.choosedarr
            })
        }
        this.state.choosedarr[id].push(val)
        this.setState({
            choosedarr : this.state.choosedarr
        })

    }  
     /**
     * this methiod is called as props to question tag
     */
    removeElemFromArr = (val,id,newarr) => {
       
        this.state.choosedarr[id] = this.state.choosedarr[id].filter((obj) => {
            return obj != val
        })
        this.setState({
            choosedarr: this.state.choosedarr
        })
        
    }
    /**
     * this  method is validation of indexes in the array.
     * @param  ind 
     * @param  event 
     */
    valuecheck (ind,event){
        if(ind <= 0 || ind > this.questionitems.length){
            event.target.disabled = 'true'
        } else{
            event.target.disabled = 'false'
        }  
    }
    /**
     * this method is called when user clicked previous button.
     * @param  event 
     */
    dec (event) {
        if(this.state.ind  === 0){
            return
        }
        this.state.ind -= 1
        this.setState({
            ind:this.state.ind
        })
        this.valuecheck(this.state.ind,event)
        // console.log(this.state.ind)
        const pn = event.target.nextElementSibling
        // console.log(pn.disabled)
        if(pn.disabled ===  true){
            pn.disabled = false
        }
    }
    /**
     * this method is called when user clicked next button.
     * @param  event 
     */

    incc(event) {
        // console.log(this.state.ind)
        
        this.state.ind += 1
        this.setState({
            ind:this.state.ind
        })
        this.valuecheck(this.state.ind,event)
        const pn = event.target.previousElementSibling
        // console.log(pn)
        if(pn.disabled ===  true){
            pn.disabled = false
        }
    }


    render (){
        // console.log(this.questionitems)
        console.log(this.state.choosedarr,this.state.arr)
        return (
            <div>
                <h1 className = "display-4" align = 'center'> {this.props.object.title} </h1>
                <div style= {this.contdisplayon} className = 'jumbotron'>
                    <h4 className = "display-5">Instructions :</h4>
                    <p> {this.props.object.Instructions}</p>
                    <button onClick = {this.displayOff} className = "btn btn-primary btn-lg"> Start Quiz</button>
                </div>
                <div style= {this.contdisplayoff} className = 'jumbotron'>
                    {this.state.ind > -1 && this.state.ind < this.questionitems.length &&
                    this.questionitems[this.state.ind] //<Question key = />
                    }
                    <button onClick = {this.dec} className = "btn btn-primary btn-lg"> Previous</button> 
                    &nbsp;
                    <button onClick = {this.incc} className = "btn btn-primary btn-lg"> Next </button>
                    <br/>
                    <br/>
                    <button id = 'last' onClick = {this.displayOff} className = "btn btn-primary btn-lg"> Finish Quiz</button>
                </div>
                <div  className ='jumbotron' style = {this.contdisplayoff} >
                    <h4 className = "display-5">Summary :</h4>
                    <Summary ql = {this.props.object.Questions} ua = {this.state.correctans} />
                </div>
                
            </div>
            
        )
    }
}
/*
this is a Question Component.
*/



class Question extends React.Component{
        // console.log(props)
        constructor(props){
            super(props)
            console.log(this.props.arr,'here')
            this.state = {
                arr_id : this.props.arr
            }

            this.callfunction = this.callfunction.bind(this)
        }
        /**
         * to update the variables the state variables of the quiz tag.
         * @param event 
         */
        callfunction(event) {
            // console.log(event.target.className)
           
            if(this.state.arr_id[event.target.className].includes(event.target.id)){
                
                const a = this.state.arr_id[event.target.className].filter((obj) => {
                    return obj != event.target.id
                })
                this.state.arr_id[event.target.className] = a
                this.setState({
                    arr_id : this.state.arr_id
                })
                this.props.function2(event.target.value,event.target.className,this.state.arr_id) //include state.arr and update over there
            }else {
                
                this.state.arr_id[event.target.className].push(event.target.id)
                this.setState({
                    arr_id : this.state.arr_id
                })
                this.props.function1(event.target.value,event.target.className,this.state.arr_id) //include state.arr and update over there
            }
        }
        val = 0
        render(){
            const val = this.val
            // console.log(this.state)
            return(
                <div>
                    <p> {this.props.qt}</p>
                    {this.props.choices.map((c,val) =>
                    <div key = {c[0]}>
                        {this.state.arr_id[this.props.qt[2]].includes(String(val)) ? <p > <input id = {val} value = {c} className = {this.props.qt[2]} onChange = {this.callfunction}  type ='checkbox' checked/> &nbsp;{c} 
                        </p> : <p ><input id = {val} value = {c} className = {this.props.qt[2]} onChange = {this.callfunction}  type ='checkbox'/> &nbsp;{c} </p>}
                    </div>,
                    val+1
        )}
                </div>
            )
        }
        
    }
    



const questions1 = {
    qt: "Q 1 - What is the output for −  S = [['him', 'sell'], [90, 28, 43]] S[0][1][1] ",
    choices : ["A - 'e'","B - 'i'","C - '90'","D - 'h'"],
    correctchoices :["A - 'e'"],
    points : 5
}
const questions2 = {
    qt: "Q 2 - Which among them will produce or contains these elements {'a', 'b', 'c'}? ",
    choices : ["A - Tuple(''abc'')","B - List(''abc'')","C - Set(['a','b','a','c'])","D - Set(['a','b','c'])"],
    correctchoices :["C - Set(['a','b','a','c'])","D - Set(['a','b','c'])"],
    points : 10
}

const quiz = {
    title : 'MSIT Quiz',
    Instructions : 'The quizzes consists of questions carefully designed to help you self-assess your comprehension of the information presented on the topics covered in the module. No data will be collected on the website regarding your responses or how many times you take the quiz.',
    Questions: [questions1,questions2],
    max_duration : 15
}

ReactDOM.render (
    <Quiz object = {quiz} />,
    document.getElementById('root')
)

/*
----------------------- xxxxxx The End xxxxxxx ---------------------------------------------
*/




// function Question(props){
//     // console.log(props)
//     let arr =[]
//     const options = {
//         0 :false,
//         1: false,
//         2 :false,
//         3 :false
//     }
//     const isChecked = (event) => {
//         console.log(event.target.defaultChecked)
        
//     }
//     const callfunction  = (event) => {
//         if(! options[event.target.id]) {
//             console.log(event.target.id)
//             options[event.target.id] = true 
//             props.function1(event.target.value,event.target.className)
//         }else{
//             options[event.target.id] = false
//             event.target.checked = options[event.target.id]
//             props.function2(event.target.value,event.target.className)
//         }
//     }
//     let val = 0 
//     return(
//         <div>
//             <p> {props.qt}</p>
//             {props.choices.map((c,val)=>
//             <p key = {c[0]}> <input id = {val} value = {c} defaultChecked ={options[val]}  className = {props.qt[2]}onChange = {callfunction} type ='checkbox'/> &nbsp;{c} </p>,
//             val+1
//             )}
//         </div>
//     )
// }







// class Question extends React.Component{
//     // console.log(props)
//     constructor(props){
//         super(props)
//         this.state = {

//             options : {}
//                 // 0 :this.state.options[0] ||false,
//                 // 1: this.state.options[1] ||false,
//                 // 2 :this.state.options[2] ||false,
//                 // 3 :this.state.options[3] ||false,
//             ,
//             arr_id : [],
//             arr:this.props.arr

//         }
//         this.callfunction = this.callfunction.bind(this)
//         // this.setCheck = this.setCheck.bind(this)
//     }

//     callfunction(event) {
//         console.log(this.state.arr_id,'log')
//         if (this.state.options[event.target.id] === undefined){
//             this.state.options[event.target.id] = false
//             this.setState({
//                 options  : this.state.options
//             })
//         }
//         if(! this.state.options[event.target.id]) {
//             console.log(event.target.id)
//             this.state.options[event.target.id] = true 
//             this.state.arr_id.push(event.target.id)
//             this.setState({
//                 options : this.state.options,
//                 arr_id : this.state.arr_id
//             })
//             this.props.function1(event.target.value,event.target.className)
//         }else{
//             this.state.options[event.target.id] = false
//             // const arr = 
//             // console.log(arr)
//             this.setState({
//                 options : this.state.options,
//                 arr_id : this.state.arr_id.filter((obj) => {
//                     return obj != event.target.id
//                 },
//                 () => {
//                     console.log(this.state,)
//                 })
                
//             })
//             this.props.array = this.state.arr_id
//             this.props.function2(event.target.value,event.target.className)
//         }
        
//     }
//     val = 0
//     render(){
//         const val = this.val
//         console.log(this.state)
//         return(
//             <div>
//                 <p> {this.props.qt}</p>
//                 {this.props.choices.map((c,val) =>
//                 <div key = {c[0]}>
//                     {this.state.arr_id.includes(String(val)) ? <p > <input id = {val} value = {c} className = {this.props.qt[2]} onChange = {this.callfunction}  type ='checkbox' checked/> &nbsp;{c} 
//                     </p> : <p ><input id = {val} value = {c} className = {this.props.qt[2]} onChange = {this.callfunction}  type ='checkbox'/> &nbsp;{c} </p>}
//                 </div>,
//                 val+1
//     )}
//             </div>
//         )
//     }
    
// }
