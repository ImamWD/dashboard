let inputs = document.getElementsByClassName('INP');
let button_add = document.getElementById('addCar');
let loc ;
//____________________ get selector years_____________________________
let yearSelect = document.getElementById('inputGroupSelect03');
let val;
for(let i=2000;i<2023;i++)
{
    val += `
 <option value="${i}">${i}</option>`;
}
yearSelect.innerHTML = val;
//____________________ show and close List_____________________________
function show()
{
    let inputs1 = document.getElementById('inputs');
    inputs1.style.transform = 'translateX(0%)';
    inputs1.style.display = 'block';
    inputs1.style.visibility = 'visible';
    inputs1.style.animation = 'move-right .7s' ;
    document.getElementById('table').style.animation = 'move-table .5s' ;
    document.getElementById('table').style.transform = 'translateX(0%)';
    document.getElementById('title').innerHTML = "Add List";
    inputs[0].value ="";
    inputs[1].value = "";
    document.getElementById('addCar').innerHTML = "Add <i class=\"fa-solid fa-circle-plus \"></i>";
    document.getElementById('addCar').style.background = "#198754";

}
function close1()
{
    let inputs = document.getElementById('inputs');
    inputs.style.transition = 'all .7s';
    inputs.style.animation = 'move-left .7s' ;
    inputs.style.visibility = 'hidden';
    document.getElementById('table').style.animation = 'stop-table .5s' ;
    document.getElementById('table').style.transform = 'translateX(-12%)';
}
//____________________Dashboard js_____________________________
let Cars = [];
let rows = document.getElementById('table_body');
if(JSON.parse(localStorage.getItem("Cars")) == null)
{
    Cars =[];
}
else {
    Cars = JSON.parse(localStorage.getItem("Cars"));
    Display();
}
function Onclick()
{
    if(button_add.innerText.includes("Add")) {
        let path = inputs[4].value.split("\\");

        let Car =
            {
                car_name: inputs[0].value,
                car_price: inputs[1].value,
                car_color: inputs[2].value,
                car_year: inputs[3].value,
                car_image: path[2]
            };
        Cars.push(Car);
        localStorage.setItem("Cars", JSON.stringify(Cars));
        Display();
        clear_inputs();
    }
    else
    {
        let path = inputs[4].value.split("\\");
        Cars[loc].car_name = inputs[0].value;
        Cars[loc].car_price = inputs[1].value;
        Cars[loc].car_color = inputs[2].value;
        Cars[loc].car_year= inputs[3].value;
        Cars[loc].car_image = path[2];
        localStorage.setItem("Cars", JSON.stringify(Cars));

        Display();
        clear_inputs();
    }
}
function Display()
{
    let val =" ";
    for(let i=0;i<Cars.length;i++)
    {
        val += `
                <tr>
                    <td>${i+1}</td>
                    <td>${Cars[i].car_name}</td>
                    <td>${Cars[i].car_price} $</td>
                    <td>${Cars[i].car_color}</td>
                    <td>${Cars[i].car_year}</td>
                    <td><img style="width: 120px;height: 70px;text-align: center" class="car-img" src="imgs/${Cars[i].car_image}"></td>
                    <td><button onclick="delete_item(${i})" class="btn btn-danger">Delete <i class="fa-solid fa-circle-minus"></i></button></td>
                    <td><button onclick="edit_item(${i})" class="btn btn-info">Edit <i class="fa-solid fa-pen"></i></button></td>
                </tr>` ;
    }
    rows.innerHTML = val;
}
function clear_inputs()
{
     inputs[0].value = "";
     inputs[1].value = "";

}
function delete_all()
{
    let size = Cars.length;
    for(let i=0;i<size;i++)
    {
        Cars.pop();
    }
    localStorage.setItem("Cars",JSON.stringify(Cars));
    Display();
}
function delete_item(index)
{
    Cars.splice(index,1);
    localStorage.setItem("Cars",JSON.stringify(Cars));
    Display();
}
function check()
{
    let flag =false;
    for(let i=0;i<2;i++)
    {
        if(inputs[i].value == null)
        {
            flag = true;
        }
    }
    return flag;
}
function edit_item(index)
{
    show();
    inputs[0].value = Cars[index].car_name;
    inputs[1].value = Cars[index].car_price;
    inputs[2].value = Cars[index].car_color;
    inputs[3].value = Cars[index].car_year;
    document.getElementById('title').innerHTML = "Edit Car : "+ Cars[index].car_name;
    document.getElementById('addCar').innerHTML = "Edit <i class=\"fa-solid fa-pen\"></i>";
    document.getElementById('addCar').style.background = "#0DCAF0";
    loc = index;
}
//_________________________search_____________________________
let search_input = document.getElementById('search');
let select_search = document.getElementById('sel_search');
function search1(name)
{
    let val =" ";
    if(select_search.value === "name")
    {
        for(let i=0;i<Cars.length;i++)
        {
            if(Cars[i].car_name.includes(name.value))
            {
                val += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${Cars[i].car_name}</td>
                    <td>${Cars[i].car_price} $</td>
                    <td>${Cars[i].car_color}</td>
                    <td>${Cars[i].car_year}</td>
                    <td><img style="width: 120px;height: 70px;text-align: center" class="car-img" src="imgs/${Cars[i].car_image}"></td>
                    <td><button onclick="delete_item(${i})" class="btn btn-danger">Delete <i class="fa-solid fa-circle-minus"></i></button></td>
                    <td><button onclick="edit_item(${i})" class="btn btn-info">Edit <i class="fa-solid fa-pen"></i></button></td>
                </tr>`;
            }
        }
        rows.innerHTML = val;
    }
    else if(select_search.value === "price")
    {
        for(let i=0;i<Cars.length;i++)
        {
            if(Cars[i].car_price.autocapitalize.includes(name.value.autocapitalize))
            {
                val += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${Cars[i].car_name}</td>
                    <td>${Cars[i].car_price} $</td>
                    <td>${Cars[i].car_color}</td>
                    <td>${Cars[i].car_year}</td>
                    <td><img style="width: 120px;height: 70px;text-align: center" class="car-img" src="imgs/${Cars[i].car_image}"></td>
                    <td><button onclick="delete_item(${i})" class="btn btn-danger">Delete <i class="fa-solid fa-circle-minus"></i></button></td>
                    <td><button onclick="edit_item(${i})" class="btn btn-info">Edit <i class="fa-solid fa-pen"></i></button></td>
                </tr>`;
            }
        }
        rows.innerHTML = val;
    }
    else
    {
        for(let i=0;i<Cars.length;i++)
        {
            if(Cars[i].car_year.autocapitalize.includes(name.value.autocapitalize))
            {
                val += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${Cars[i].car_name}</td>
                    <td>${Cars[i].car_price} $</td>
                    <td>${Cars[i].car_color}</td>
                    <td>${Cars[i].car_year}</td>
                    <td><img style="width: 120px;height: 70px;text-align: center" class="car-img" src="imgs/${Cars[i].car_image}"></td>
                    <td><button onclick="delete_item(${i})" class="btn btn-danger">Delete <i class="fa-solid fa-circle-minus"></i></button></td>
                    <td><button onclick="edit_item(${i})" class="btn btn-info">Edit <i class="fa-solid fa-pen"></i></button></td>
                </tr>`;
            }
        }
        rows.innerHTML = val;
    }


}

