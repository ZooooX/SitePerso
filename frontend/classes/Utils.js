import * as TWEEN from '@tweenjs/tween.js';
import axios from "axios";

export default class Utils {

    //Move object using the tween
    static moveObject(object, from, to, speed){
        const coords = {
            x:from.x,
            y:from.y,
            z:from.z
        }

        return new TWEEN.Tween(coords)
                .to({ x: to.x, y: to.y , z: to.z }, speed)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() =>
                    object.position.set(coords.x, coords.y , coords.z)
                )
                .start();
    }


    static toggleDOMElementDisplay(element){
        element.classList.toggle("invisible");
    }

    static createProjectsPage(projects){
        const projectsSection = document.getElementById("projects");

        const imagePopupContainer = document.getElementById("imagePopupContainer");
        const imagePopup = document.getElementById("imagePopup");
        const videoPopup = document.getElementById("videoPopup");

        projects.forEach(project => {
            const div = document.createElement('div');
            div.classList.add("project");

            const projectTitle = document.createElement('h4');
            projectTitle.classList.add("projectTitle");
            projectTitle.innerHTML = project.title;
            div.appendChild(projectTitle);

            const projectContent = document.createElement('div');
            projectContent.classList.add("projectContent");
            div.appendChild(projectContent);

            const leftSide = document.createElement('div');
            leftSide.classList.add("leftSide");
            projectContent.appendChild(leftSide);

            const rightSide = document.createElement('div');
            rightSide.classList.add("rightSide");
            projectContent.appendChild(rightSide);

            
            const projectDesc = document.createElement('p');
            projectDesc.classList.add("projectDesc");
            projectDesc.innerHTML = project.desc;
            leftSide.appendChild(projectDesc);

            const projectTechs = document.createElement('p');
            projectTechs.classList.add("projectTechs");
            let techs = `Techs : `;
            project.techs.forEach(tech => {
                techs+= tech + ", ";
            });
            techs = techs.slice(0, -1);
            techs = techs.slice(0, -1);
            projectTechs.innerHTML = techs;
            div.appendChild(projectTechs);

            const projectImg = document.createElement('img');
            if(project.img == ""){
                projectImg.src = "./assets/img/green2.jpg";
            }
            else{
                projectImg.src = project.img;
            }

            projectImg.addEventListener('click', (elem) => {
                imagePopup.classList.add("invisible");
                videoPopup.classList.add("invisible");

                if(project.video){
                    videoPopup.src = project.video;
                    this.toggleDOMElementDisplay(videoPopup);
                }
                else{
                    imagePopup.src = elem.target.src;
                    this.toggleDOMElementDisplay(imagePopup);
                }

                this.toggleDOMElementDisplay(imagePopupContainer);
            });
            projectImg.classList.add("hoversound");
            rightSide.appendChild(projectImg);

            const linksContainer = document.createElement("div");
            linksContainer.classList.add("linksContainer");

            if(project.github){
                const gitLink = document.createElement('a');
                gitLink.target = "blank";
                gitLink.href = project.github;
                gitLink.classList.add("btn");
                gitLink.classList.add("hoversound");

                const gitSVG = `
                    <span>Github</span>
                    <svg height="24" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" class="">
                        <path fill="white" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                `;

                gitLink.insertAdjacentHTML('beforeend', gitSVG);
                linksContainer.appendChild(gitLink);
            }
            
            if(project.demo) {
                const demoLink = document.createElement('a');
                demoLink.target = "blank";
                demoLink.href = project.demo;
                demoLink.classList.add("btn");
                demoLink.classList.add("hoversound");

                const demoSVG = `
                    <span>Demo</span>
                    <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
                        <path d="M 19.980469 2.9902344 A 1.0001 1.0001 0 0 0 19.869141 3 L 15 3 A 1.0001 1.0001 0 1 0 15 5 L 17.585938 5 L 8.2929688 14.292969 A 1.0001 1.0001 0 1 0 9.7070312 15.707031 L 19 6.4140625 L 19 9 A 1.0001 1.0001 0 1 0 21 9 L 21 4.1269531 A 1.0001 1.0001 0 0 0 19.980469 2.9902344 z M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 13 A 1.0001 1.0001 0 1 0 19 13 L 19 19 L 5 19 L 5 5 L 11 5 A 1.0001 1.0001 0 1 0 11 3 L 5 3 z"/>
                    </svg>
                `;

                demoLink.insertAdjacentHTML('beforeend', demoSVG);
                linksContainer.appendChild(demoLink);
            }

            rightSide.appendChild(linksContainer);
            
            projectsSection.appendChild(div);
        });
    }

    static sendMail(fullname, email, text){
        axios.post("http://localhost:3000/api/sendmail",{fullname : fullname,email : email,message : text})
            .then((res) => {
                this.showSuccessMessage("Message bien envoyé ! :)");
                console.log(res);
            }).catch((err) => {
                this.showErrorMessage("Erreur lors de l'envoi du message ! :(");
                console.log(err);
            });
    }

    static showErrorMessage(message){
        const errorMessage  = document.getElementById("error");
        errorMessage.innerHTML = message;
        this.toggleDOMElementDisplay(errorMessage);

        setTimeout(() => {
            this.toggleDOMElementDisplay(errorMessage);
        }, 5000);
    }

    static showSuccessMessage(message){
        const successMessage  = document.getElementById("success");
        successMessage.innerHTML = message;
        this.toggleDOMElementDisplay(successMessage);

        setTimeout(() => {
            this.toggleDOMElementDisplay(successMessage);
        }, 5000);
    }
}

