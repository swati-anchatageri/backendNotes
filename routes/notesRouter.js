const expresss=require("express")
const {NotesModel}=require("../model/notesmodel")
const {auth}=require("../middleware/auth.middleware")
const notesRouter=expresss.Router()

notesRouter.use(auth)

notesRouter.post("/create",async(req,res)=>{
    try {
        const note = new NotesModel(req.body)
        await note.save()
        res.send({"msg":"New note is added"})
    } catch (error) {
        res.send({"error":error})
    }
})

notesRouter.get("/",async(req,res)=>{
    try {
        const notes = await NotesModel.find({userID:req.body.userID})
        res.send(notes)
    } catch (error) {
        res.send({"error":error})
    }
})

notesRouter.patch("/update/:noteId",async(req,res)=>{
    const {noteId}=req.params
    const note=await NotesModel.findOne({_id:noteId})
    try {
        if(req.body.userID!==note.userID){
            res.send({"msg":"You are not authorized"})
        }else{
            await NotesModel.findByIdAndUpdate({_id:noteId},req.body)
            res.send({"msg":`Note updated with id ${noteId} has been updated`})
        }
    } catch (error) {
        res.send({"error":error})
    }
})

// ghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh




notesRouter.delete("/delete/:noteId",async(req,res)=>{
    const {noteId}=req.params
    const note=await NotesModel.findOne({_id:noteId})
    try {
        if(req.body.userID!==note.userID){
            res.send({"msg":"You are not authorized"})
        }else{
            await NotesModel.findByIdAndDelete({_id:noteId})
            res.send({"msg":`Note updated with id ${noteId} has been delete`})
        }
        
    } catch (error) {
        res.send({"error":error})
    }
})

module.exports={
    notesRouter
}