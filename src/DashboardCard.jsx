import { useState   } from "react"

function DashboardCard(props){
  const [amt, setAmt] = useState(0)
    return(
        <div className="bg-white border-none rounded-sm shadow-lg w-50 px-[1vw] py-[1vh]">
          <span className="text-xl">{props.name}</span>
          <p className="text-emerald-500 text-2xl"><span id="total-balance">{amt}</span><span>NGN</span></p>
        </div>
    )
}
export default DashboardCard