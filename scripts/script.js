const navHamburger = document.getElementById('nav-hamburger');
const navMobile = document.getElementById('nav-mobile');
const navClose = document.getElementById('nav-close');

const qteElements = document.querySelectorAll('.qte');
const priceElements = document.querySelectorAll('.price');
const soustotal = document.getElementById('sous-total');
const taxes = document.getElementById('taxes');
const totalCommande = document.getElementById('total');

//Navigation

navHamburger.addEventListener('click', () => {
    navMobile.classList.toggle('active');

    if (navMobile.classList.contains('active')) {
        navMobile.classList.remove('hidden');
    } else {
        navMobile.classList.add('hidden');
    }
});

navClose.addEventListener('click', () => {
    navMobile.classList.add('hidden');

    if (navMobile.classList.contains('hidden')) {
        navMobile.classList.remove('active');
    } else {
        navMobile.classList.add('active');
    }
});


//Calcul ma commande
const getQteAndPrice = (priceElement, qteElement) => {
    if (priceElement && priceElement.textContent) { 
        let price = parseFloat(priceElement.textContent.replace("$", ""));
        let qte = parseInt(qteElement.value);

        if (qte < 0) {
            qteElement.value = 0;
            return false;
        }

        if (!isNaN(price) && !isNaN(qte)) {
            return price * qte;
        }
    }
    return 0;
};

const getSousTotal = () => {
    let sousTotal = 0;

    qteElements.forEach((qteElement, index) => {
    const priceElement = priceElements[index];
    const totalForThisItem = getQteAndPrice(priceElement, qteElement);
    sousTotal += totalForThisItem;
    });
    soustotal.innerText = `$ ${sousTotal.toFixed(2)}`;
    
} 

const getTaxes = () => {
    let sousTotal = soustotal.innerText;
    sousTotal = parseFloat(sousTotal.replace('$', '').trim());

    let totalTaxes = sousTotal * 0.15;
    taxes.innerText = `$ ${totalTaxes.toFixed(2)}`; 

}

const getTotal = () => {
    let sousTotal = soustotal.innerText;
    sousTotal = parseFloat(sousTotal.replace('$', '').trim());
    let totalTaxes = taxes.innerText;
    totalTaxes = parseFloat(totalTaxes.replace('$', '').trim());

    console.log(`Sous-total:${sousTotal}`)
    console.log(`taxes:${totalTaxes}`)

    let total = sousTotal += totalTaxes;
    totalCommande.innerText = `$ ${total.toFixed(2)}`; 

}


qteElements.forEach((qteElement) => {
    qteElement.addEventListener('input', () => {
        getSousTotal();
        getTaxes();
        getTotal();
    });
});

