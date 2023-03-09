const url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
 const tablebody =document.getElementById('table-body')
 const content= document.getElementById('info-content')
 const searchbox=document.getElementById("search-box");




function table(users){
    tablebody.innerHTML=""
   const row= document.createElement('tr');
   row.classList.add('data-row')
   console.log(column(users[0].firstName,1))
   users.forEach(user => {
    const row =document.createElement('tr');
    row.classList.add('data-row')
    row.setAttribute('id',user.id);
     row.appendChild(column(user.id,1))
     row.appendChild(column(user.firstName,2))
     row.appendChild(column(user.lastName,3))
     row.appendChild(column(user.email,4))
     row.appendChild(column(user.phone,5))
     row.addEventListener('click',() =>{
        details(user)
     })
     tablebody.appendChild(row)

    
   });

}
function details(user){
    const select=document.getElementById(user.id);
    const preselect=document.getElementsByClassName('active')[0]
    if (preselect !==undefined){
        preselect.classList.remove('active')
    }
    select.classList.add('active');

    content.innerHTML=`
    <div><b>User selected:</b> ${user.firstName} ${user.lastName}</div>
                <div>
                    <b>Description: </b>
                    <textarea cols="50" rows="5" readonly>
                        ${user.description}
                    </textarea>
                </div>
                <div><b>Address:</b>${user.address.streetAddress}</div>
                <div><b>City:</b>${user.address.city}</div>
                <div><b>State:</b>${user.address.state}</div>
                <div><b>Zip:</b>${user.address.city}</div>
                </div>
                `;

}
function column(data,index){
    const column =document.createElement('td');
    column.classList.add(`column${index}`);
    column.innerText=data;
    return column
}
function search(searchstring,users){
    const filteredusers=users.filter(user=>{
    const firstName =user.firstName.toLowerCase();
    searchstring =searchstring.toLowerCase();
    return firstName.includes(searchstring)
})
    table(filteredusers);

    
    }


function initailization(){
    $.get(url,(response)=>{
        console.log(response);
        table(response);
        searchbox.addEventListener('keyup',()=>{

            search(searchbox.value, response)
        })
    });
}
initailization();
 