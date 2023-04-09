
const ErrorMessageResponse = (err,res)=>{
    console.log(err)
        ErrorMsgs = err.errors;
        var errorList = []
        Object.keys(ErrorMsgs).forEach(element => {
            errorList.push(ErrorMsgs[element].message)
            console.log(ErrorMsgs[element].message)
           
        });
        res.status(400).json({'errors': errorList})
}
module.exports = {
    ErrorMessageResponse
}