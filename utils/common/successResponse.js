export default function customSuccessResponse(msg,data){
    return {
        success:true,
        message:msg,
        data:data
    }
}