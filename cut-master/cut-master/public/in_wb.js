function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, value) {
    const d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + value + ";" + expires + ";path=/"
}

function checkCookie() {
    let user = getCookie("username_log");
    let time = getCookie("visit_rec_log");

    const now = new Date()
    const time_sec = now.toString().split(" ")[4].split(":");
    const time_sec_now = Number(time_sec[0]) * 3600 + Number(time_sec[1]) * 60 + Number(time_sec[2]);

    if (user !== "") {
        alert("Welcome again " + user + ", you was here " + (time_sec_now - time) + "sec before");
        setCookie("visit_rec_log", time_sec_now)
    } else {
        alert("Please, do registration, user")
        window.location.href = 'register.html';
    }
}

checkCookie()