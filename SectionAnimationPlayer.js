class SectionAnimationPlayer {
    //Constructeur de la classe
    // trigger: element declancheur de l'animation
    // target: cible a animer
    constructor(trigger, target = trigger, root=null, threshold=0.5,rootMargin="0px") {
        this.trigger = document.querySelector(trigger);
        this.target = document.querySelector(target);
        if(this.trigger !== null && this.target !== null ){
            this.existing = true;
            this.options = {
              root:root,
              threshold:threshold,
              rootMargin:rootMargin
          }
        }else{
            this.existing === false;
        }
        this.observer = null
    }

    //Observeur des éléments et cibles
    setObserver(target, animation, callbackIn, callbackOut){

         this.observer = new IntersectionObserver(function(entries,observer){
            entries.forEach(entry => {
                if(entry.isIntersecting == true)
                {
                    //Appel une methode a l'entree de la cible
                    if(typeof callbackIn == "function"){
                        callbackIn();
                    }
                }else{
                     // Appel une methode lorsque sorti de la cible
                     if(typeof callbackOut == "function"){
                         callbackOut();
                     }
                }
            })
        },this.options);  
        
        //Initialise l'observation
        if(this.existing){

            this.observer.observe(this.trigger);
        }
    }

    static addClass(target, anim){
        anim.forEach(element => target.classList.add(element));
    }

    randomTime(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


// -----Methodes public 

    //Joue l'animation
    playCssAnimation(animation=[], delay = 0, visible = true){
        if(visible !== true){
            this.hide()
        }
        this.setObserver(this.target, animation, ()=>{
            setTimeout(()=>{
                SectionAnimationPlayer.addClass(this.target, animation);
            }, delay)
        })
    }

    //Joue les animations sur tous les enfants de la cible de maniere independante
    playCssAnimationOnChildren(animation=[], children=[], delay){
        this.setObserver(this.target, animation, ()=>{
            const childrenFetched = document.querySelectorAll(children);
                childrenFetched.forEach(child => setTimeout(()=>{
                    SectionAnimationPlayer.addClass(child, animation)
                }, delay));
        })
    }

    //Joue tous les enfants d'une section indiques en parametre de maniere aleatoire
    playAsMosaic(animation=[], ranTime=[], children=[]){
        let max = ranTime[0];
        let min = ranTime[1];
        this.setObserver(this.target, animation, ()=>{
            const childrenFetched = document.querySelectorAll(children) 
            //console.log(childrenFetched);
                childrenFetched.forEach(child => setTimeout(()=>{
                    SectionAnimationPlayer.addClass(child, animation)
                }, this.randomTime(min, max)));
            })
    }

    hide(target = this.target){
        if(target !== this.target){
            target = document.querySelector(target);
        }
        target.style.opacity = '0';
    }

}
