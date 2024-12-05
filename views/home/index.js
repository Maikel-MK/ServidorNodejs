const formC= document.querySelector('#form-create')
const formL= document.querySelector('#form-login')
const createInput = document.querySelector('#create-input')
const notificacion = document.querySelector('.notification')
const loginInput = document.querySelector('#login-input')

formC.addEventListener('submit', async e=>{
    e.preventDefault()
//console.log(createInput.value)
    const respuesta = await fetch('http://localhost:3000/users',{method:'GET'})
    const users = await respuesta.json()
    //console.log(users)

    //validar
    const user = users.find(user => user.username === createInput.value)
    //console.log(user)

//foreach recorre pero no retorna en nada
//find recorre y retorna en un booleano (true, false)


    if(!createInput.value){

        //si el campo esta vacio
        console.log('campo vacio')

        notificacion.innerHTML = "El Campo no Puede Estar Vacio"
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },3000)
    }else if(user){
        //si existe el usuario o ya esta registrado

        notificacion.innerHTML = "El usuario ya existe"
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },3000)
    }else{
        //caso: no existe el usuario vamos a agregarlo
        await fetch('http://localhost:3000/users',{
            method:'POST',
            headers:{'Content-Type':'application/json'//se pueden investigar mas tipos de content-Type
            },
            body:JSON.stringify({username:createInput.value})//recordar---
        })



        notificacion.innerHTML = `El usuario ${createInput.value} ha sido creado`
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },3000)
    
        createInput.value = ""
    }
})

formL.addEventListener('submit', async e=>{  //el async es el que debe estar con await
    e.preventDefault()

    const respuesta = await fetch('http://localhost:3000/users',{
        method:'GET'
    })
    const users = await respuesta.json()
    //console.log(users)

    //validar
    const user = users.find(user => user.username === loginInput.value)

    if(!user){
        notificacion.innerHTML = "El usuario no existe"
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },3000)
    
    }else{
        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = '../tareas/tareas.html'
    }

})