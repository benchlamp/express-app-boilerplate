(function() {
    
    var addButton = document.querySelector(".btn-add");
    var deleteButton = document.querySelector(".btn-delete");
    var clickNum = document.querySelector("#click-num");
    var apiURL = "https://express-app-boilerplate-jamesrea83.c9users.io/api/clicks"

    function ready(fn) {
        if (typeof fn !== "function") {
            return;
        }
        
        if (document.readyState === "complete") {
            return fn()
        }
        
        document.addEventListener("DOMContentLoaded", fn, false);
    }
    
    function ajaxRequest(method, url, callback) {
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                callback(xmlhttp.response);
            }
        };
        
        xmlhttp.open(method, url, true);
        xmlhttp.send();
    }
    
    
    function updateClickcount(data) {
        var clickObject = JSON.parse(data);
        clickNum.innerHTML = clickObject.clicks;
    }
    
    ready(ajaxRequest("GET", apiURL, updateClickcount));
    
    addButton.addEventListener("click", function() {
        ajaxRequest("POST", apiURL, function() {
            ajaxRequest("GET", apiURL, updateClickcount);
        });
    }, false);
    
    
    deleteButton.addEventListener("click", function() {
        ajaxRequest("DELETE", apiURL, function() {
            ajaxRequest("GET", apiURL, updateClickcount);
        });
    });
    
    
})();