import {useEffect,useState,useContext} from 'react'
import ProfilePic from '../../styles/images/profile.svg'
import Navbar from '../Navbar'
import Pic1 from '../../styles/images/2.jpg'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {UserContext} from '../../App'



function Project() {

	const {state,dispatch} = useContext(UserContext)

	const [projectInfo, setprojectInfo] = useState({})
	const [projectReview,setProjectReview] = useState(['Great Project'])
	const [bool,setBool] = useState(false)
	const {id} = useParams();

	const addReview = (e)=>{
		e.preventDefault()
		projectReview.push(e.target.value)
		console.log("Add Review")
    }

	
    
    const apply = ()=>{
        console.log("apply")
		fetch('/applyonproject',{
			method:"post",
			headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
			},
			body:JSON.stringify({
				id:id
			})

		})
    }

	useEffect(() => {
		fetch('/getproject',{
			method:"post",
			headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
			},
			body:JSON.stringify({
				id:id
			})
		})
		.then((res)=>res.json())
		.then((project)=>{
			console.log("Project: ",project)
			setprojectInfo(project)
		})
	}, [])

	useEffect(() => {
		console.log("ProjectInfo: ",projectInfo)
	}, [projectInfo])

	useEffect(() => {
		console.log("ProjectInfo: ",projectInfo)
	}, [projectReview])

	

    return (
        <div>
            <Navbar />
            
            <section id="project" style={{width: "100%", height: "100%", padding: "70px 10px"}}>
		<div class="search-box">
			<form action="#" method="POST" class="search" style={{display: "flex", flexDirection: "row", position: "relative", justifyContent: "center", alignItems: "center"}}>        
				<input type="text" placeholder="Search..." />
				<button class="btn" style={{display: "inlineBlock", width: "48px", display: "flex", background: "none", border: "none", padding: "0px 0px", margin: "0px 0px"}}><i class="fa fa-search"></i></button>
			</form>
		</div>

		<div class="project">
			<div class="project-header">
				<div class="profile-img">
					<img src={ProfilePic} alt="" class="profile-image" />
				</div>
				<div class="profile-nav-info">
					<Link to="/userprofile"><h2 class="username">{projectInfo.project?projectInfo.project[0].author:"Loading.."}</h2></Link>
					<div class="address-info">
						<span class="state">Karachi,</span>
						<span class="country">Pakistan</span>
					</div>
				</div>
			</div>
			<div class="project-settings">
				<button class="ctn"> <i class="fa fa-bars"></i></button>
				<div class="options">
					<a class="project-edit" href="#" ><i class="fa fa-edit"></i>Edit</a>
					<a class="project-remove" href="#" ><i class="fa fa-remove"></i>Remove</a>
				</div>
				
				
			</div>
			<div class="project-date" style={{position: "relative", padding: "2px 2px"}}>
				<span class="day">Sunday &nbsp;</span>
				<span class="date"> Oct 21, 2020</span>
			</div>

			<div class="project-post">
				<div class="project-block">
					<div class="project-img">
						<img class="project-img" src={projectInfo.project?projectInfo.project[0].projectThumbnail:"Loading.."} alt="" width="400px" style={{height: "100%"}} />
					</div>
                    <button onClick={apply} >{bool?"applied":"apply"}</button>
					<div class="project-ratings" style={{margin: "20px  0px", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
						<span class="ratings" style={{fontSize: ".8rem", color: "gray", fontWeight: "500"}}>
							<i class="fa fa-star" style={{color: "#7e27cf", fontSize: "1rem",  marginRight: "2px"}}></i>
							<i class="fa fa-star" style={{color: "#7e27cf", fontSize: "1rem",  marginRight: "2px"}}></i>
							<i class="fa fa-star" style={{color: "#7e27cf", fontSize: "1rem",  marginRight: "2px"}}></i>
							<i class="fa fa-star" style={{color: "#7e27cf", fontSize: "1rem",  marginRight: "2px"}}></i>
							<i class="fa fa-star-o" aria-hidden="true" style={{color: "#7e27cf", fontSize: "1rem",  marginRight: "2px"}}></i>
						&nbsp;0 &nbsp; &nbsp;</span>
						<span class="project-reviews" style={{fontSize: ".8rem", color: "gray", fontWeight: "500"}}>&nbsp;<i class="fa fa-eye" style={{color: "#7e27cf", fontSize: "1rem", fontWeight: "600", marginRight: "4px"}}></i>&nbsp;21&nbsp; &nbsp;</span>
						<span class="project-likes" style={{fontSize: ".8rem", color: "gray", fontWeight: "500"}}>&nbsp;<i class="fa fa-heart-o"style={{color: "#7e27cf", fontSize: "1rem", marginRight: "4px"}}></i>&nbsp;2.4k&nbsp; &nbsp;</span>
					</div>
				</div>
				<div class="project-content" >
					<h3 class="project-title">{projectInfo.project?projectInfo.project[0].title:"Loading.."}</h3>
					<h4 class="project-category"> {projectInfo.project?projectInfo.project[0].categoryOne:"Loading.."} {projectInfo.project?projectInfo.project[0].categoryTwo :"Loading.."}</h4>
					<p class="project-description">{projectInfo.project?projectInfo.project[0].projectDescription:"Loading.."}</p> 
				</div>
			</div>
			<div class="comment-box">
				<form onSubmit={(e)=>{addReview(e)}} class="comments" style={{display: "flex", flexDirection: "row", position: "Relative", justifyContent: "left", alignItems: "left", padding: "0px 0px"}}>        
					<input type="text" placeholder="Your Reviews..." />
					<button class="btn" style={{display: "inline-block", width: "48px", display: "flex", background: "none", border: "none", padding: "0px 0px", margin: "0px 0px"}}><i class="fa fa-comment"></i></button>
				</form>
				<p>{projectReview}</p>
			</div>

		</div>

    </section>

        </div>
    )
}

export default Project
