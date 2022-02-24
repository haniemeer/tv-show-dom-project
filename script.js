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
    ///took the episodes in option tag
     let selector=document.querySelector('#episode') 
     let option=document.createElement('option')
     option.innerText=element.name
     selector.appendChild(option)
     ///format like S01E09
     if (element.number>=10) {
              option.innerText=`S0${element.season} -E${element.number}-${element.name}`

     }else{
        option.innerText=`S0${element.season} -E0${element.number}-${element.name}`
     }
        ////selector of episodes
              let select=document.querySelector('#episode')
            select.addEventListener('change',()=>{
                getcard=document.querySelectorAll('.title')
                 for(let el of getcard){
                  const sl=select.value.slice(9)
                   if(el.innerText===sl){
                    el.parentElement.parentElement.style.display='block'
                    }else{
                    el.parentElement.parentElement.style.display='none'  
                     }
                     if(select.value==="all"){
                         el.parentElement.parentElement.style.display='block'
                     }
                    //live searchhh
                    
                }
                
                
            })

             let inpt=document.querySelector('input')
                    inpt.addEventListener('keyup',()=>{
                        let liveShare=document.querySelectorAll('.title')
                        let search=inpt.value
                         select.value="all"
                        //  console.log(search)
                        //  console.log(element.name)
                        //  console.log(element.name.toLowerCase().includes(search.toLowerCase()))
                        for (let live of liveShare) {
                       if(element.name.toLowerCase().includes(search.toLowerCase())){
                          
                           live.parentElement.parentElement.style.display='block'
                       }else{
                           live.parentElement.parentElement.style.display='none'
                       }
                         }
                             })
    }
   
   
})

   

