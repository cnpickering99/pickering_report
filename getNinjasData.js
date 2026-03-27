const fs = require('fs/promises');

const FACILITY_ID = "43e81fe2-44b4-4806-8aae-b3b843755bd8"
let allCourses = [];
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiI4MjM0NmUyZS0wMjJhLTQzYjUtOTIwNS1mODgwODAyM2NmNDAiLCJpc3MiOiJodHRwczovL2NvZGVuaW5qYXN1c2IyYy5iMmNsb2dpbi5jb20vNTYzM2Y2OTgtZGYzNC00MWY1LWE2MjUtM2RhZmQ5ZjgwZTNmL3YyLjAvIiwiZXhwIjoxNzc0NjU2MTQwLCJuYmYiOjE3NzQ2NTI1NDAsIm9pZCI6IjdlOTMwZWM4LTE4NWMtNDE4MC05Yzk5LWQ2OWVjYWQ3ZTQxNiIsInN1YiI6IjdlOTMwZWM4LTE4NWMtNDE4MC05Yzk5LWQ2OWVjYWQ3ZTQxNiIsIm5hbWUiOiJTZW5zZWkgU2Vuc2VpIiwiZ2l2ZW5fbmFtZSI6IlNlbnNlaSIsImZhbWlseV9uYW1lIjoiU2Vuc2VpIiwiZXh0ZW5zaW9uX1VzZXJSb2xlIjoiU3RhZmYiLCJ0ZnAiOiJCMkNfMV9TaWduSW4iLCJub25jZSI6ImZmMDgzM2ViLTJhYWItNGNhYi1iNzQyLTNiYTBiNzIxZWQzZiIsInNjcCI6IkFwaS5BY2Nlc3MuRnVsbCIsImF6cCI6IjQ2ZThjZWM4LWEyNWItNGI1MC05MDUzLTQ2OWU5MDZhMzY0ZSIsInZlciI6IjEuMCIsImlhdCI6MTc3NDY1MjU0MH0.YuNqc11yTphktzF3v2OpMogxdiT_pcspANI6jrCkhaZz6cCVvLf9DPK_20qZqxHMEWdkxkfqKVuS18o-kDZZa5RAx7fM8uQgTnaEDbclB9e3bqvEQvGvIvy5UdGaiM0rcl8RIMq6DaCXjzkPwHF8vKs_5yyh2zZtp9fj9cW5Xjopnvxx0F-RZFtx89EcEOXrBJtzoQdbZnYV6BTvU4JYZSzOjpzopt8GijWz2kWD8RewE9V5_YTlf80nG-k3Atd3wE2PCE-FWyq0y9zHdYHGlTvJfQjLMB1W9TkcOyVkDANsjXJNK8hVHYdwJT-h_fUPtOsAQiXmVC-eT2oxso0Csw";

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
                    let endDate = new Date(project.completedDate);
                    
                    let diffTime = Math.abs(endDate - startDate);
                    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    let line =`${ninja.firstName} ${ninja.lastName}, ${theCourse.name}, level-${level.sequence} ${project.activityType}, ${project.activityTitle.replace(new RegExp(',','g'), ' ')}, ${project.startDate.split('T')[0]}, ${project.completedDate.split('T')[0]}, ${diffDays}`;
                    
                    console.log(line);
                    
                    await fs.writeFile('ninja_report_all.csv', `${line}\n`, { encoding: 'utf8', flag: 'a' });
                
                }

            }

        }

    }
}


async function getninjasBeltInfo(){
    let guideFormattedData = await guideFormatted();
    let ninjas = await getAllNinjas();
    let ninjaNamesAndCourseIds = ninjas.map(ninja => {
        let tmp = {
            firstName: ninja.firstName,
            lastName: ninja.lastName,
            theLogout: new Date(ninja.sessionLogoutTime),
            currentCourseName : getCourseNameById(ninja.currentCouseId)
        };
        return tmp;
    });

    for (let i = 0; i < ninjaNamesAndCourseIds.length; i++) {
        const ninja = ninjaNamesAndCourseIds[i];


        let line = `${ninja.firstName} ${ninja.lastName}, ${ninja.currentCourseName}`;

        console.log(line);

        await fs.writeFile('ninja_current_belts.csv', `${line}\n`, { encoding: 'utf8', flag: 'a' });


    }

}

//main();
getNinjasFullData();
//getninjasBeltInfo();