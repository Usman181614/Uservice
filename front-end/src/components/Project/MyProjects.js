import React, {useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar';

function MyProjects() {

    const [myProjects,setMyProjects] = useState('')

    useEffect(() => {
        console.log("My Project")
        fetch('/myprojects',{
            method:"get",
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
			}
        })
        .then((res)=>res.json())
        .then(({projects})=>{
            console.log("myProjects ",projects)
            setMyProjects(projects)
        })

    }, [])

     var projectList = 0
     if(myProjects)
     {
         projectList = myProjects.map((project)=>{
            return(
               <div style={{border:"solid",borderWidth:"1px",width:"300px",height:"250px",margin:"10px "}}>
                   <Link to={"/myproject/" +project.projectId}>
                   <div >
                       <img style={{width:"300px",height:"125px"}} src={project.projectThumbnail} />
                   </div>
                   <div>
                       <p><strong>{project.title}</strong></p>
                       <p>{project.projectDescription}</p>
                   </div>
                   </Link>
               </div>
            )
        })
     }

    return (
        <div>
            <h1>My Projects</h1>
            <Navbar />

            <div style = {{display:"flex"}} >
                {projectList}
            </div>

        </div>
    )
}

export default MyProjects
