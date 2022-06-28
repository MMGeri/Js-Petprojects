import { JsonLoader } from "../modules/JsonLoader.js"
import { ToTableConverter } from "../modules/ToTableConverter.js"

const fileInput = $('#file-input')
const body = $('body')

const jl = new JsonLoader()

fileInput.change(async e=> {
        let jsonString= await jl.loadJson(e)
        let jsonObject = JSON.parse(jsonString); 
        let newTable = $('<table>')
        
        ToTableConverter.objectToTable(jsonObject,newTable)
        body.append(newTable)
    }
)

