import {TriangleAlert} from "lucide-react"
import Swal from 'sweetalert2'
import { useAuthStore } from "../store/useAuthStore"


const DeleteAccount = () => {

    const { deleteAccount, authUser } = useAuthStore()

    const handleAlert = () =>
    {    
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteAccount()
              Swal.fire({
                title: "Deleted!",
                text: "Your Boo-mates gonna miss you.",
                icon: "success",
                
              })
            }
          })
    }

    return (
            <div>
            { authUser && (
            <>      
            <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span> Delete my account </span>
                
                <button 
                onClick={handleAlert}
                className=" flex gap-2 px-4 py-2 rounded-lg font-semibold bg-pink-600 hover:bg-slate-50 active:bg-pink-600
                        text-slate-50 hover:text-pink-600 active:text-slate-50 "> 
                
                <TriangleAlert className="size-5"/>
                <span> Delete </span>
                        
                </button>                
            </div>
                </div>
                </>
                )}
            </div>
    )
}

export default DeleteAccount
