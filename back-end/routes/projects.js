const express = require('express')
const requireLogin = require('../middleware/requireLogin')
const router = express.Router()
const mysql = require('mysql')

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "usman1234",
    database : "Uservice"
})


router.post('/publishproject',(requireLogin),(req,res)=>{
    console.log("PublishProjectAPI: ",req.body)
    
    const project = req.body
    project.author = req.user.userName

    let d = new Date();

    let SQL1 = `INSERT INTO projects (title, projectDescription, projectThumbnail, author,date_published) VALUES (?, ?, ?, ?,?) `
    db.query(SQL1,[project.title,project.projectDescription,project.projectThumbnail,project.author,d],(error,result)=>{
      if(error)
            throw error
        else
        {
            console.log(result)
            const skills = [[result.insertId,req.body.categories[0]],[result.insertId,req.body.categories[1]],[result.insertId,req.body.categories[2]]]
            let SQL2 = "INSERT INTO project_skills (projectId,skills) VALUES ?"
            db.query(SQL2,[skills],(err,res)=>{
                if(err)
                    throw err
                else
                {
                    console.log(res)
                }
            })
        }
    })

})

router.post('/hasapplied',(req,res)=>{
    console.log("hasAppliedApi: ",req.body)
    
    let SQL = "SELECT * FROM applicants WHERE (project = ? AND applicant = ?)"
    db.query(SQL,[req.body.id,req.body.userName],(err,result)=>{
        if(err)
            throw err
        if(result[0])
        {
            res.json({bool:true})
        }
        else{
            res.json({bool:false})
        }
    })
})

router.post('/discoverprojects',requireLogin,(req,res)=>{
    console.log("discoverProjectApi: ",req.body)
    const {user} = req.body
    let SQL = `SELECT * FROM projects WHERE (projectId IN (SELECT projectId FROM project_skills as p, user_skills as u WHERE p.skills= u.skills AND u.userName = ?)) AND author != ?`
    db.query(SQL,[user,user],(err,projects)=>{
        if(err)
            throw err
        else
        {
            console.log(projects)
            res.json({projects})
        }
    })
    
})

router.get('/myprojects',(requireLogin),(req,res)=>{
    console.log("myProjectsApi",req.user.userName)
    const {userName} = req.user

    let SQL = "SELECT * FROM projects WHERE author = ?"
    db.query(SQL,userName,(err,projects)=>{
        if(err)
            throw err
        console.log(projects)
        res.json({projects})
    })

    
})

router.post('/getproject',(req,res)=>{
    console.log("getProjectApi: ",req.body)

    let SQL = `SELECT * FROM projects WHERE projectId=?`
    db.query(SQL,req.body.id,(err,result)=>{
        console.log(result)
        const project = result
        res.json({project})
    })
})

router.post('/applyonproject',(requireLogin),(req,res)=>{

    const projectId = req.body.id
    const {userName} = req.user

    console.log("ApplyonprojectApi", projectId,userName)

    let SQL1 = `SELECT id FROM applicants WHERE project= ? AND applicant =?`
    db.query(SQL1,[projectId,userName],(err,result)=>{
        if(err)
            throw err
        if(!(result.length))
        {
            let SQL2 = `INSERT INTO applicants (project,applicant) VALUES (?,?)`
            db.query(SQL2,[projectId,userName],(err,result)=>{
                if(err)
                    throw err
                console.log(result)      
            })
        }
    })

    
    
})

router.post('/getapplicants',(req,res)=>{
    console.log('getApplicantsApi',req.body);
    id = req.body.id;
    console.log(id)
    let SQL = 'SELECT * FROM Users WHERE Users.userName IN (SELECT applicant FROM applicants INNER JOIN projects WHERE applicants.project = ?)'
    db.query(SQL,id,(err,result)=>{
        if(err)
            throw err
        console.log("Result: ",result)
    })
})

module.exports.router= router