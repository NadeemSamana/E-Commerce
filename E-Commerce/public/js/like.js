

async function likeButton(productid, btn){

    try {
        const response = await axios({
            method: 'post',
            url: `/products/${productid}/like`,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        })

        if(btn.classList.contains('fa-heart-o')){
            btn.classList.remove('fa-heart-o');
            btn.classList.add('fa-heart');
        }
        else{
            btn.classList.remove('fa-heart');
            btn.classList.add('fa-heart-o');
        }
    
        // console.log(response);
    }
    catch (e) {
        // console.log(e);
        window.location.replace('/login');    
    }

}

window.document.addEventListener('click', (e)=>{
    const btn = e.target;

    if(btn.classList.contains('product-like-button')){
        const productid = btn.getAttribute('product-id');
        console.log(productid);
        likeButton(productid, btn);
    }
})



