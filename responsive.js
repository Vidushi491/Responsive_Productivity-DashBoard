// Open full pages like tabs
function openFeatures() {
    var elem = document.querySelectorAll(".elem")
    var fullElem = document.querySelectorAll(".fullElem")
    var fullelemback = document.querySelectorAll(".fullElem .back")

    elem.forEach(function(elem){
        elem.addEventListener("click", function(){
            fullElem.forEach(f => f.style.display = "none");
            document.querySelector('#main').style.display = "none";
            fullElem[elem.id].style.display = "block";
        })
    });

    fullelemback.forEach(function(back){
        back.addEventListener("click", function(){
            fullElem[back.id].style.display = "none";
            document.querySelector('#main').style.display = "block";
        })
    });
}
openFeatures();

// Theme changer
function theme(){
    var theme = document.querySelector('.theme')
    var root = document.documentElement
    var flag = 0
    theme.addEventListener('click', function(){
        if(flag == 0){
            root.style.setProperty('--pri','#EDDFB3')
            root.style.setProperty('--sec','#B09B71')
            root.style.setProperty('--tri1','#B09B71')
            root.style.setProperty('--tri2','#B09B71')
            flag = 1
        }else if(flag == 1){
            root.style.setProperty('--pri','#828181ff')
            root.style.setProperty('--sec','#494949')
            root.style.setProperty('--tri1','#494949')
            root.style.setProperty('--tri2','#494949')
            flag = 2
        }else{
            root.style.setProperty('--pri','#0C0C0C')
            root.style.setProperty('--sec','#4a3834ff')
            root.style.setProperty('--tri1','#4a3834ff')
            root.style.setProperty('--tri2','#4a3834ff')
            flag = 0
        }
    })
}
theme();
