import Utils from './Utils';

export default class DOMCategory {
    static focusedCategory = null;

    static profileContainer = document.getElementById('profileContainer');
    static projectsContainer = document.getElementById('projectsContainer');
    static contactContainer = document.getElementById('contactContainer');
    static skillsContainer = document.getElementById('skillsContainer');

    static backBtn = document.getElementById("backBtn");

    static show(selected){

        Utils.toggleDOMElementDisplay(this.backBtn);

        switch (selected) {
            case "Profil":
                Utils.toggleDOMElementDisplay(this.profileContainer);
                this.focusedCategory = this.profileContainer;
                break;
            case "Projets" : 
                Utils.toggleDOMElementDisplay(this.projectsContainer);
                this.focusedCategory = this.projectsContainer;
                break;
            case "Contact" : 
                Utils.toggleDOMElementDisplay(this.contactContainer);
                this.focusedCategory = this.contactContainer;
                break;
            case "Skills" : 
                Utils.toggleDOMElementDisplay(this.skillsContainer);
                this.focusedCategory = this.skillsContainer;
                break;    
            default:
                break;
        }
    }

    static hide(){

        Utils.toggleDOMElementDisplay(this.backBtn);
        
        if(this.focusedCategory){
            Utils.toggleDOMElementDisplay(this.focusedCategory);
            this.focusedCategory = null;
        }
    }
}