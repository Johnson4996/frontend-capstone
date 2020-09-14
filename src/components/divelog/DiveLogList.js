import React,{useContext, useEffect} from "react"
import {LogContext} from "./DiveLogProvider"
import "./divelog.css"
import { Link } from "react-router-dom"



export const DiveLogList = () =>{
const {diveLogs,getDiveLogs} = useContext(LogContext)

useEffect(() => {
    getDiveLogs()
}, [])

return(
    <div className="recentDives">
        <div className="recentDivesTop">
        <h4>Recent Dives</h4>
        <button className="viewAllBtn">View All</button> 
        </div>
        <article className= "logListContainer">
            {
                diveLogs.reverse().map(dl => {
                    if(dl.userId === parseInt(localStorage.getItem("activeUser"))){
                        return(
                            <Link className="log-link"
                            to={{
                                pathname: `/divelog/${dl.id}`,
                                state: { chosenLog: dl }
                            }}>
                        <section className = {dl.id}>
                            <h3 className="logTitle">{dl.title}</h3>
                            <p className="log--date">{dl.date}</p>
                            <p className="log--location">{dl.location}</p>
                        </section>
                        </Link>
                            )
                    }
                    
                })
            }
        </article>
    </div>
)


}
