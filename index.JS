fetch("./index.JSON")
.then(response => response.json())
.then(Data => loadChallenges(Data));

//ppossibly ad search funtionality laterS
    
function loadChallenges(Data) {
    let mainContainer = document.getElementById("container");
    mainContainer.innerHTML = ``;
    for (challenge of Data.challenges){
        console.log(challenge);
        let div = document.createElement("div");
        div.innerHTML = ` 
        <div class=" w-100 my-md-3 ps-md-3">
            <div class="text-bg-dark me-md-3 text-center overflow-hidden">
                <div class="img-container" >
                    <img src = ${challenge.url} alt=${challenge.alt} width="400">
                </div>    
                <div class="my-3 py-3">
                    <h2 class="display-5">${challenge.title}</h2>
                    <p class="lead">${challenge.description}</p>
                </div>
            </div>
        </div>`;
        mainContainer.appendChild(div);
    }
}
