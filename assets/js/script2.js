function fillTemplate(pokemonprevious) {
    let nameprevious = pokemonprevious.name;
    let pictureprevious = pokemonprevious.sprites.front_default;

    //Fill the template and append it to the HTML DOM
    let template = document.querySelector('#template');
    let evoTemplate= document.querySelector("#evolution");
    evoTemplate.innerHTML = "";

    // in template get id of h tag and picture
    let evoName1 = template.content.querySelector(".evoname1");
    evoName1.innerText = nameprevious;
    let evoPicture= template.content.querySelector(".evopic1");
    evoPicture.setAttribute("src" , pictureprevious);

    let clone = template.content.cloneNode(true);
    evoTemplate.appendChild(clone);
}
