export default function CustomErrorResponse(error){
    return {
        success:false,
        error:error,
    }
}