const add = document.querySelector('.Add');
const submit = document.querySelector('.Submit');
const tasklist = document.querySelector('.task-list');


let count = 3;


add.addEventListener('click', (e)=>{

    count++;

    const newitem = document.createElement('div');
    newitem.setAttribute('class', 'parent');

    let str =   `<div class="child-1">
                    <li class="text">Counter ${count}</li>
                </div>
                <div class="child-2">
                    <span class="dec"><button class="dec hidden">-</button></span>
                    <span><p class="val">0</p></span>
                    <span class="inc"><button class="inc hidden">+</button></span>
                </div>`

    newitem.innerHTML = str;
    tasklist.append(newitem);

    const increment = newitem.querySelector('.inc');
    const decrement = newitem.querySelector('.dec');


    increment.addEventListener('click', (e)=>{
    const val = newitem.querySelector('.val');
        val.textContent = parseInt(val.textContent) + 1;
    })

    decrement.addEventListener('click', (e)=>{
      const val = newitem.querySelector('.val');
      const low = parseInt(val.textContent);

      if(low > 0){
        val.textContent = low - 1;
      }

      toggelbutton(increment, decrement);

    })
    
});


submit.addEventListener('click', function(){
    const hide = document.querySelectorAll('.hidden');
    hide.forEach(function(element){
      element.classList.toggle('hidden');
      element.classList.toggle('hideable');
    })

})

function toggelbutton(incrementbutton, decrementbutton){
      incrementbutton.classList.toggle('hidden');
      incrementbutton.classList.toggle('hideable');
      decrementbutton.classList.toggle('hidden');
      decrementbutton.classList.toggle('hidden');
}

