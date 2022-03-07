class SectionAnimationPlayer {

    //Constructeur de la classe
    constructor(selector, target = selector) {
      this.selector = document.querySelector(selector);
      this.target = document.querySelector(target);
      this.options = {
        root:null,
        threshold:0.5,
        rootMargin:"0px"
    }
        this.observer = null

      console.log(this.target);
    }

    //Observeur des éléments et cibles
    setObserver(target, animation, callbackIn, callbackOut){

         this.observer = new IntersectionObserver(function(entries,observer){
            entries.forEach(entry => {
                console.log(entry);
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
    }

    static addClass(target, anim){
        anim.forEach(element => target.classList.add(element));
    }

    randomTime(min, max){
        console.log(Math.floor(Math.random() * (max - min + 1) + min));
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

// -----Methodes public 

    //Joue l'animation
    playCssAnimation(animation=[], delay = 0){
        this.setObserver(this.target, animation, ()=>{
            setTimeout(()=>{
                SectionAnimationPlayer.addClass(this.target, animation);
            }, delay)
        })
        this.observer.observe(this.selector);
    }

    //Joue les animations sur tous les enfants de la cible de maniere independante
    playCssAnimationOnChildren(animation=[], children=[], delay){
        this.setObserver(this.target, animation, ()=>{
            const childrenFetched = document.querySelectorAll(children) 
            console.log(childrenFetched);
                childrenFetched.forEach(child => setTimeout(()=>{
                    SectionAnimationPlayer.addClass(child, animation)
                }, delay));
        })
        this.observer.observe(this.selector);
    }

    //Joue tous les enfants d'une section indiques en parametre de maniere aleatoire
    playAsMosaic(animation=[], ranTime=[], children=[]){
        let max = ranTime[0];
        let min = ranTime[1];
        this.setObserver(this.target, animation, ()=>{
            const childrenFetched = document.querySelectorAll(children) 
            console.log(childrenFetched);
                childrenFetched.forEach(child => setTimeout(()=>{
                    SectionAnimationPlayer.addClass(child, animation)
                }, this.randomTime(min, max)));
            })
            this.observer.observe(this.selector);
    }

}
