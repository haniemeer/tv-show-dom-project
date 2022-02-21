function root(imgsrc,title,summary,url,airtime){
 let rootcard=document.createElement('div')
 rootcard.classList.add('card')

 let imag=document.createElement('div')
 imag.classList.add('image')
 let image1=document.createElement('img')
 image1.classList.add('image1')
 image1.src=imgsrc
 image1.alt=title
 imag.appendChild(image1)
 rootcard.appendChild(imag)
 let cardbody=document.createElement('div')
 cardbody.classList.add('cardbody')
 let h3=document.createElement('h3')
 h3.classList.add('title')
 h3.innerText=title
 cardbody.appendChild(h3)
 let p=document.createElement('p')
 p.classList.add('summary')
 p.innerText= summary
 cardbody.appendChild(p)
 let a=document.createElement('a')
 a.classList.add('link')
 a.href=url
 let i=document.createElement('i')
 i.classList.add('bi', 'bi-play-circle')
 i.innerText="watch?"
 a.appendChild(i)
 cardbody.appendChild(a)
 let span=document.createElement('span')
 span.classList.add('time')
 let i2=document.createElement('i')
 i2.classList.add('bi', 'bi-alarm')
 span.appendChild(i2)
 span.innerText="      00:"+airtime
 cardbody.appendChild(span)
 rootcard.appendChild(cardbody)
 let container=document.querySelector('.container')
container.appendChild(rootcard)
   
}

const movieData=async ()=>{
    try {
       const res=await fetch('https://api.tvmaze.com/shows/41524/episodes')
       const data=await res.json()
      return data 
      
    }catch(err){
     console.log(err)
    }
}
movieData()
.then((data)=>{
    for (const element of data) {
     root(element.image.medium,element.name,element.summary,element.url,element.runtime) 

     let selector=document.querySelector('#episode') 
     let option=document.createElement('option')
     option.innerText=element.name
     selector.appendChild(option)
     selector.addEventListener('change',(e)=>{
        
        if(selector.value===element.name){
            rootcard.style.display='block' 
        }else{
            rootcard.style.display='none' 
        }
     
        
      })
      
     ///format like S01E09
     if (element.number>=10) {
              option.innerText=`S0${element.season} -E${element.number}-${element.name}`

     }else{
        option.innerText=`S0${element.season} -E0${element.number}-${element.name}`

     }


     
     
    

    

    
    }
})

