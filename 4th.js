const api = async () =>{
    const result = await fetch ('https://raw.githubusercontent.com/jakiichu/data/main/data.json');
    return await result.json();
};
api().then(data => {
    const address = {
        "Город": data.address.city,
        "Улица": data.address.street,
        "Дом": data.address.house,
        "Отчет": `фамилия ${data.person.lastName} имя ${data.person.firstName} купил ${data.productsOrder.count} штук товаров ${data.productsOrder.product.name}`
    };
    console.log(address)
})
