const request = require("request")
const cheerio = require("cheerio")
const course_url = "https://querycourse.ntust.edu.tw/querycourse/api/courses"
const Course = require('../../models/course')



getNTUSTcourse("1082",0,0,1,function (error, course) {
    if (!error) {
        console.log(course)
    } else {
        console.log("Error")
    }

})

/**
 * 
 * @param {學年度} year 
 * @param {台科課程} OnlyNTUST 
 * @param {研究所課程} OnlyMaster 
 * @param {大學部課程} OnlyUnderGraduate 
 * @param {*} callback 
 */
function getNTUSTcourse(year,OnlyNTUST,OnlyMaster,OnlyUnderGraduate,callback) {
    let body = {
        "Semester": year,
        "OnleyNTUST": OnlyNTUST,
        "OnlyMaster": OnlyMaster,
        "OnlyUnderGraduate": OnlyUnderGraduate,
        "Language": "zh"
    }
    request({
        method: 'POST',
        url: course_url,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
            let course = JSON.parse(body)
            callback(null, course)
        } else {
            callback(error, null)
            console.log("Error ! ! !")
        }

    })
}


