const express=require('express')
const {PlaylistModel}=require("../model/playlist.model")
const {UserModel}=require("../model/user.model")

const playlistRouter=express.Router()

playlistRouter.post("/add",async(req,res)=>{
    try {
        const {Title,Poster,Year,userId,public}=req.body
        const isPresent=await PlaylistModel.findOne({Title,userId})
        if(!isPresent)
        {
          const playlist = new PlaylistModel({ Title,Poster,Year,userId,public})
          await playlist.save();
          return res.send({data:playlist, message: ' Playlist added.'})
        }
        else{
          return res.send({message:"Already present in the playlist"})
        }

        
    } catch (error) {
        console.log(error)
    }
    
})

playlistRouter.get("/create",async (req,res)=>{
  try {
    const data=await UserModel.find()
    res.send(data)
  } catch (error) {
    console.log("err");
      console.log({ message: "Something went wrong", err:err.message });
  }
})

playlistRouter.get("/get/:userID", async (req, res) => {
    try {
      const data = await PlaylistModel.find({userId:req.params.userID});
    //   console.log(data);
      res.send({
          message:"Your Playlist",
          data : data
      });
    } catch (err) {
      console.log("err");
      console.log({ message: "Something went wrong", err:err.message });
    }
  });

  playlistRouter.get("/getPublic/:userID", async (req, res) => {
    try {
      const data = await PlaylistModel.find({userId:req.params.userID,public:true});
    //   console.log(data);
      res.send({
          message:"Your Playlist",
          data : data
      });
    } catch (err) {
      console.log("err");
      console.log({ message: "Something went wrong", err:err.message });
    }
  });
 
  playlistRouter.put('/update/:id', async (req, res) => {
    try {
        const playlistId = req.params.id;
        // const {public}=req.body
        const playlist = await PlaylistModel.findById(playlistId);
        // console.log(playlist)
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        if(playlist.public===true){
          playlist.public = false;
        }
        else{
          playlist.public=true
        }
        
        await playlist.save();

        res.json({ message: 'Playlist updated successfully', playlist });

    } catch (error) {
      console.log(error)
        res.status(500).json({ error: 'An error occurred while updating the playlist' });
    }
});


// Endpoint to delete a playlist
playlistRouter.delete('/delete/:id', async (req, res) => {
  try {
    const {id}=req.params
    const playlist = await PlaylistModel.findByIdAndDelete(id);

    res.json({ message: 'Playlist deleted successfully',playlist:playlist });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the playlist' });
  }
});



module.exports={playlistRouter}