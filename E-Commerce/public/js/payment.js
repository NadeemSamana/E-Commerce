// console.log('connected');


const buybutton = document.getElementById('buybtn');

async function makeorder(amount){
    try {
        const response = await axios({
            method: 'post',
            url: `/order`,
            data:{ amount },
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        })
    
        const {order} = response.data;
        // console.log(response.data);
        const options = {
            "key": "rzp_test_GMMPWlI8Gjq5SS", // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "E-commerce",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:5000/payment-verify",
            // "prefill": {
            //     "name": "Gaurav Kumar",
            //     "email": "gaurav.kumar@example.com",
            //     "contact": "9000090000"
            // },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    }
    catch (e) {
        window.location.replace('/login');
    }
}



buybutton.addEventListener('click', (e)=>{
    const amount = document.querySelector('#product-price').innerText.split(' ').pop();
    // console.log(amount);
    makeorder(amount);
})

