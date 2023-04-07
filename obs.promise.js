const { Observable } = requiere('rxjs');

const doSomething = () =>{
    return new Promise((resolve) =>{
        resolve('valor 1');
    })
}

const doSomething$ = () =>{
    return new Observable(observer => {
        observer.next('valor 1 $');
    })
    
}

(async () =>{
    const rta = await doSomething();
    console.log(rta);
})

(()=> {
    const ob$ = doSomething$();
    ob$.subscribe(rta =>{
        console.log(rta);
    })
})