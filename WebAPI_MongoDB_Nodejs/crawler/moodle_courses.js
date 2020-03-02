const request = require("request")
const cheerio = require("cheerio")
const moodle_url = 'https://moodle.ntust.edu.tw/login/index.php'

/**
 * get moodle token and set cookie
 */
function getTokenCookie(url, callback) {
    let token;
    let cookie;
    console.log("start crawler ! ! !")
    request({
        method: 'GET',
        url: url,
    }, function (error, response, body) {
        let $ = cheerio.load(body)
        if (!error && response.statusCode == 200) {
            let cookieA
            let cookieB
            $('form').first().find('input').each(function (i, e) {
                if ($(e).attr("name") == 'logintoken') {
                    token = $(e).attr('value')
                }
            })
            if (response.headers['set-cookie'] != null) {
                cookieA = response.headers['set-cookie'][0].split(';')[0]
                cookieB = response.headers['set-cookie'][1].split(';')[0]
                cookie = cookieA + "; " + cookieB
            }
            return callback(null, token, cookie, cookieB)
        } else {
            return callback(error, null, null);
        }
    })
}


/**
 * send account and password cookie to POST
 * update cookie
 */

function post(account, password, callback) {
    getTokenCookie(moodle_url, function (err, token, cookie, cookieB) {
        if (!err) {
            console.log("Start Post ! ! !")
            request({
                method: 'POST',
                url: moodle_url,
                headers: {
                    cookie: cookie
                },
                form: {
                    username: account,
                    password: password,
                    logintoken: token
                }
            }, function (error, response, body) {
                if (!error && response.statusCode == 303 && response.headers['set-cookie'] != null) {
                    let url = response.headers['location']
                    let cookieA = response.headers['set-cookie'][0].split(';')[0]
                    let cookie = cookieA + "; " + cookieB
                    return callback(null, url, cookie)
                } else {
                    return callback(err, null)
                }
            })
        }
        else {
            console.log("Error ! ! !")
            return callback(err, null)
        }
    })
}
/**
 * 
 * @param {moodle account} account 
 * @param {moodle password} password 
 * @param {*} callback 
 */
function getUrlId(account, password, callback) {
    post(account, password, function (err, url, cookie) {
        console.log("Get course ! ! !")
        if (!err) {
            request({
                method: 'GET',
                url: url,
                headers: {
                    cookie: cookie
                }
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let $ = cheerio.load(body)
                    let data = []
                    $('div.courses.frontpage-course-list-enrolled').find('h3.coursename').each(function (i, e) {
                        let a = $(e).text()
                        let b = a.match(/(\d{3}.\d)【.{1,}】([A-Z0-9]{9})/)
                        if (b != null) {
                            if (b[1] == '108.2') {
                                data.push(b[2])
                            }
                        }
                    })
                    return callback(null, data)
                } else {
                    return callback(error, null)
                }
            })
        } else {
            console.log("Error ! ! !")
            return callback(err, null)
        }
    })
}
getUrlId('b10609039', 'xxc222uut', function (err, data) {
    if (!err) {
        console.log("Get course secceed ! ! !")
        console.log(data)
    } else {
        console.log("Error ! ! !")
    }
})
