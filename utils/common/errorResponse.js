export default function customErrorResponse(msg,error={}){
    return {
        message:msg,
        success:false,
        error:error,
    }
}