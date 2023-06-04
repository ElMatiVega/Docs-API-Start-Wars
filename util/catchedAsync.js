module.exports=(fnCB)=>{
    return function (req,res,next){
        fnCB(req,res).catch((err)=>{
           // console.log(err.response,'CatchError')
            next(err);
        })
    }
}