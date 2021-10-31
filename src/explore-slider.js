

export class ExploreSlider{
    constructor() {
        this.topExploreSlide = document.querySelector('.expl-img');
        this.exploreSlider = document.querySelector('.explore-slider input');


        this.exploreSlider.addEventListener('input', () => this.slideWidthChange());
    }
    
    slideWidthChange(){
        this.topExploreSlide.style.width = this.exploreSlider.value + '%'

        console.log(this.exploreSlider.value )
       }
       
}
 


