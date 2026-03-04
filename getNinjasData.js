const fs = require('fs/promises');

const FACILITY_ID = "43e81fe2-44b4-4806-8aae-b3b843755bd8"
let allCourses = [];
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiI4MjM0NmUyZS0wMjJhLTQzYjUtOTIwNS1mODgwODAyM2NmNDAiLCJpc3MiOiJodHRwczovL2NvZGVuaW5qYXN1c2IyYy5iMmNsb2dpbi5jb20vNTYzM2Y2OTgtZGYzNC00MWY1LWE2MjUtM2RhZmQ5ZjgwZTNmL3YyLjAvIiwiZXhwIjoxNzcyNTg0MjcxLCJuYmYiOjE3NzI1ODA2NzEsIm9pZCI6IjdlOTMwZWM4LTE4NWMtNDE4MC05Yzk5LWQ2OWVjYWQ3ZTQxNiIsInN1YiI6IjdlOTMwZWM4LTE4NWMtNDE4MC05Yzk5LWQ2OWVjYWQ3ZTQxNiIsIm5hbWUiOiJTZW5zZWkgU2Vuc2VpIiwiZ2l2ZW5fbmFtZSI6IlNlbnNlaSIsImZhbWlseV9uYW1lIjoiU2Vuc2VpIiwiZXh0ZW5zaW9uX1VzZXJSb2xlIjoiU3RhZmYiLCJ0ZnAiOiJCMkNfMV9TaWduSW4iLCJub25jZSI6IjhlZmE3YWJiLWMxOWYtNDMwMC1hYWVjLTVkMjk2YzFlMTBhOSIsInNjcCI6IkFwaS5BY2Nlc3MuRnVsbCIsImF6cCI6IjQ2ZThjZWM4LWEyNWItNGI1MC05MDUzLTQ2OWU5MDZhMzY0ZSIsInZlciI6IjEuMCIsImlhdCI6MTc3MjU4MDY3MX0.oIHLJ6DZ8ae7mev_CvF4hRYf_JKwx7CPazgj6CzIWgRn0VvKXgN6GSjVLyTtSs4oFf24_yZh9lKglCnVP_VdS1Kd0keM6ryzYDAcXVW7JXfm4xHsmyZv9Al4HcGAG9huloJdDxhOR6WxkulkFlIUvfaVZYuEiyL9xUoWMNSlt0WmvmrPNeGV16t2J7B5Tbo0Djv_PbtpI2uVHEEcUGGt8B3kHJ4-Oifw65aiIn6MLCFK6G_PX4-Zc-cGJyfcWkegd5mn7SgcczcQOfSWXnM1bl4SGuhuU9wYSVBOzwiBo3tD_t5URoglwYFqX3vs0AykouNgs5iRzawtpJvufiG6tQ";

async function getAllNinjas() {
    let result = await fetch("https://api.impact.codeninjas.com/center/api/common/ninjas?sortBy=None&&displayFilters=All&&isSensei=true", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": `Bearer ${token}`,
            "facilityid": FACILITY_ID,
            "priority": "u=1, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-region": "US"
        },
        "body": null,
        "method": "GET"
    });

    let actualData = await result.json();

    return actualData.ninjaInfos;
}

async function guide() {
    let result = await fetch("https://api.impact.codeninjas.com/center/api/sensei/guide", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization":  `Bearer ${token}`,
            "facilityid": FACILITY_ID,
            "priority": "u=1, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-region": "US"
        },
        "body": null,
        "method": "GET"
    });

    return await result.json();
}

async function guideFormatted(){
    let guideData = await guide()
    let courses = guideData[0].courses;

    let courseNames = courses.map(course => {
        const courseData = {
            name: course.name,
            courseid : course.id,
            courseData : course.levels.map(i => `${i.name} - ${i.id}`)
        }

        return courseData;
    });
    allCourses = courseNames;
    return courseNames;
}

function getCourseNameById(courseId){
    let item = allCourses.find(course => course.courseid === courseId)
    return item.name;
}

async function ninjaInfo(courseId, userId) {

    let result = await fetch(`https://api.impact.codeninjas.com/center/api/common/ninjaInfo?courseId=${courseId}&userId=${userId}&getBeltChangeInfo=false`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": `Bearer ${token}`,
            "facilityid": FACILITY_ID,
            "priority": "u=1, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-region": "US"
        },
        "body": null,
        "method": "GET"
    });

    return await result.json();
}

async function getBeltInfo(levelId, userId, currentLevelId){
    let result = await fetch(`https://api.impact.codeninjas.com/api/myninjas/beltinfo?levelId=${levelId}&ninjaId=${userId}&currentLevelId=${currentLevelId}`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": `Bearer ${token}`,
            "facilityid": FACILITY_ID,
            "priority": "u=1, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-region": "US"
        },
        "body": null,
        "method": "GET"
    });

    return await result.json();

}


async function main() {

    let guideFormattedData = await guideFormatted();
    // console.log(guideFormattedData);
    // return;

    let ninjas = await getAllNinjas()

    let ninjaNamesAndCourseIds = ninjas.map(ninja => {
        let tmp = {
            userId: ninja.id,
            firstName: ninja.firstName,
            lastName: ninja.lastName,
            lastLogout: ninja.sessionLogoutTime,
            theLogout: new Date(ninja.sessionLogoutTime),
            currentCourseid : ninja.currentCouseId, // belt
            currentLevelId: ninja.currentLevelId
        };
        return tmp;
    });


    for (let i = 0; i < ninjaNamesAndCourseIds.length; i++) {
    let allNinjas =[];//todo push modified info in it....
    //for (let i = 0; i < 2; i++) {
        const ninja = ninjaNamesAndCourseIds[i];
        
        

        const userInfo = await ninjaInfo(ninja.currentCourseid, ninja.userId);

        const courseName =getCourseNameById(ninja.currentCourseid);

        const levelId = userInfo.courseLevels[0].id;
        
        const beltInfo =  await getBeltInfo(levelId, ninja.userId, ninja.currentCourseid)
        
        //let startDate = new Date(beltInfo.projects[0].startDate);
        const startDate = new Date(beltInfo.projects[0].startDate);
        const now = new Date();
        const diffTime = Math.abs(now - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
        
        //console.log(diffDays + " days");

        console.log(`${ninja.firstName} ${ninja.lastName}, ${courseName}, ${beltInfo.projects[0].startDate}, ${diffDays} days `);


        //item.currentCourseName = getCourseNameById(item.currentCourseid);
        //console.log(item);

        //get user belt info 
       // await getBeltInfo( item., item.userId, item.currentCourseid)

    }


    //let guideFormattedData  = await guideFormatted()
    //console.log(guideFormattedData);

}

//main();


async function getNinjasFullData(){
    let guideFormattedData = await guideFormatted();
    let ninjas = await getAllNinjas()

    let ninjaNamesAndCourseIds = ninjas.map(ninja => {
        let tmp = {
            userId: ninja.id,
            firstName: ninja.firstName,
            lastName: ninja.lastName,
            lastLogout: ninja.sessionLogoutTime,
            theLogout: new Date(ninja.sessionLogoutTime),
            currentCourseid : ninja.currentCouseId, // belt
            currentLevelId: ninja.currentLevelId
        };
        return tmp;
    });

    //generate column names based on courses and levels
    // let columnNames = ["Full Name"];
    // allCourses.forEach(course => {
    //     columnNames.push(course.name);
    //     columnNames.push(...course.courseData.map(item=> item.split(' - ')[0]));
    // });

    // console.log(columnNames.join(", "));


    for (let i = 0; i < ninjaNamesAndCourseIds.length; i++) {//each ninja
        const ninja = ninjaNamesAndCourseIds[i];
        const currentCourseid = ninja.currentCourseid;

        for (let j = 0; j < allCourses.length; j++) { // each course => belt
            const theCourse = allCourses[j];
            //console.log(`${theCourse.name}...`);
            //console.log(theCourse.courseid, ninja.currentCourseid);
            const userInfo = await ninjaInfo(theCourse.courseid, ninja.userId);

            //console.log(userInfo);
            for (let k = 0; k < userInfo.courseLevels.length; k++) { // each level in the course
                const level = userInfo.courseLevels[k];
               
                const beltInfo = await getBeltInfo(level.id, ninja.userId, currentCourseid);
                if(beltInfo.projects.length === 0){
                    continue;
                }
                for (let n = 0; n < beltInfo.projects.length; n++) {
                    const project = beltInfo.projects[n]; // activity
                    const startDate = new Date(project.startDate);
                    const endDate = new Date(project.completedDate);
                    
                    const diffTime = Math.abs(endDate - startDate);
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                

                    const line =`${ninja.firstName} ${ninja.lastName}, ${theCourse.name}, ${project.activityType}, ${project.activityTitle}, ${project.startDate.split('T')[0]}, ${project.completedDate.split('T')[0]}, ${diffDays}`;
                    console.log(line);

                    //fs.appendFileSync('ninja_report.txt', `${line}\n`);
                    await fs.writeFile('ninja_report2.csv', `${line}\n`, { encoding: 'utf8', flag: 'a' });

                }

            }

        }

    }
}

getNinjasFullData();