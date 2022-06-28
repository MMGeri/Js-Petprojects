export class JsonLoader{

    async loadJson(e){
        const fileReader = new FileReader();
        var file = e.target.files[0]
        var files = new Promise((resolve)=>{
            fileReader.onload=function(){
                resolve(fileReader.result)
            }
        });
        fileReader.readAsText(file);
        return files;
    }

    
}
