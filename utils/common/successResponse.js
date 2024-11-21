export default function successResponse(msg,data){
    return {
        success:true,
        message:msg,
        data:data
    }
}